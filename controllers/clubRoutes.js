const express = require("express");
const router = express.Router();
const { Club, User } = require("../models");

// router.get("/",(req,res)=>{
//     Club.findAll().then(clubs=>{
//         res.json(clubs)
//     }).catch(err=>{
//         console.log(err);;
//         res.status(500).json({msg:"an error occurred",err});
//     })
// })

//FETCH All Teams and Players in Premier League Competition
router.get("/", (req, res) => {
    try {
        const url = "https://api.football-data.org/v4/competitions/PL/teams";
        const fetchOptions = {
            method: "GET",
            headers: {
              "X-Auth-Token": process.env.API_KEY,
            },
        }
        fetch(url, fetchOptions)
        .then(response => response.json())
        .then(apiCompetition => {
            const { teams } = apiCompetition
            const names = teams.map((obj) => obj.name);
            const squad = teams.map((obj) => obj.squad)

            res.json(names);
        })
      } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "an error occurred", err });
      }
});

// // CREATE a club
// router.post("/", async (req, res) => {
//     try {
//       fetch("https://api.football-data.org/v4/persons/16275", {
//         headers: {
//           Authorization: `Bearer ${process.env.API_KEY}`,
//         },
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           const { id } = data;

//           const modelInstance = new Player();
//           modelInstance.playerID = id;

//           return modelInstance.save();
//         })
//         .then((savedInstance) => {
//           console.log("Model instance saved:", savedInstance);
//         });
//     } catch (err) {
//       res.status(400).json(err);
//     }
//   });

module.exports = router;
