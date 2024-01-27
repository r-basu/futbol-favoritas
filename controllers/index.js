const express = require('express');
const router = express.Router();

const userRoutes = require("./userRoutes");
router.use("/api/users",userRoutes)

const clubRoutes = require("./clubRoutes");
router.use("/api/clubs",clubRoutes)

router.get('/clubs/:id', async (req, res) => {
    const clubId = req.params.id;
    console.log(clubId)
  
    try {
        const response = await fetch(`https://api.football-data.org/v4/teams/${clubId}`, {
          headers: {
            'X-Auth-Token': process.env.API_KEY, // Replace with your actual Football Data API key
          },
        });
    
        const data = await response.json();
        res.json(data);
      } catch (error) {
        console.log('Error fetching club data:', error);
        res.status(500).send('Error fetching club data');
      }
  });


module.exports = router;