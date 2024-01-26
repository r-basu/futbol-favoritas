const express = require("express");
const router = express.Router();
const { Club, User } = require("../models");
const withTokenAuth = require("../middleware/withTokenAuth");

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
    };
    fetch(url, fetchOptions)
      .then((response) => response.json())
      .then((apiCompetition) => {
        const { teams } = apiCompetition;
        // const { id: squadId, name: squadName } = teams

        // const names = teams.map((obj) => obj.name);

        const teamData = teams.map((team) => {
          squadData = team.squad.map((player) => {
            return {
              id: player.id,
              name: player.name,
            };
          });
          return {
            id: team.id,
            name: team.name,
            squadData,
          };
        });
        res.json(teamData);
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "an error occurred", err });
  }
});

// CREATE a pinned club
router.post("/", async (req, res) => {
  try {
    const { selectedClub } = req.body;

    const newClub = await Club.create({
      apiClubId: selectedClub,
      //TODO ADD USERID
    });
    res.status(201).json(newClub);
  } catch (error) {
    console.log("Error adding club:", error);
    res.status(500).json({ error: "Failed to create club" });
  }
});

// Fetch all saved apiClubId's matching userId in database
router.get("/pins", withTokenAuth, async (req, res) => {
  try {
    const userId = req.tokenData.id;

    const clubsData = await Club.findAll({
      where: { UserId: userId },
      attributes: ["apiClubId"],
    });

    const apiClubIds = clubsData.map((club) => club.apiClubId)

    const clubsInfo = await Promise.all(
      apiClubIds.map(async (apiClubId) => {
        try {
          const response = await fetch(
            `https://api.football-data.org/v4/teams/${apiClubId}`,
            {
              headers: {
                "X-Auth-Token": process.env.API_KEY,
              },
            }
          );
          const data = await response.json();
          return data;
        } catch (error) {
          console.log(`Error fetching data for club ID ${apiClubId}`, error);
          return null;
        }
      })
    );

    res.status(201).json(clubsInfo);
  } catch (error) {
    console.log("Error retrieving club ids", error);
    res.status(500).json({ error: "Error retrieving club ids" });
  }
});

module.exports = router;
