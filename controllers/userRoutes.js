const express = require("express");
const router = express.Router();
const { User, Club } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const withTokenAuth = require("../middleware/withTokenAuth");

//Create User
router.post("/", (req, res) => {
  User.create({
    email: req.body.email,
    password: req.body.password,
  })
    .then((newUser) => {
      const token = jwt.sign(
        {
          email: newUser.email,
          id: newUser.id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "2h",
        }
      );
      res.json({
        token,
        user: newUser,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "oh noes!", err });
    });
});

//Login User
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((foundUser) => {
      if (
        !foundUser ||
        !bcrypt.compareSync(req.body.password, foundUser.password)
      ) {
        return res.status(401).json({ msg: "invalid login credentials" });
      }
      const token = jwt.sign(
        {
          email: foundUser.email,
          id: foundUser.id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "2h",
        }
      );
      res.json({
        token,
        user: foundUser,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "oh noes!", err });
    });
});

//Signout User
router.post("/logout", withTokenAuth, (req, res) => {
  const userId = req.tokenData.id;

  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      //Clear users token
      user.token = "";
      user.save();

      res.json({ msg: "User signed out successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "Internal server error" });
    });
});

//Verify User Token
router.post("/verify-token", (req, res) => {
  const { token } = req.body;

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ msg: "Token is valid" });
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
});

module.exports = router;
