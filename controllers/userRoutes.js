const express = require("express");
const router = express.Router();
const { User, Club } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

module.exports = router;
