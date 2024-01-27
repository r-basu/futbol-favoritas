const sequelize = require("../config/connection.js");
const { User, Club } = require("../models");

const seedMe = async () => {
  await sequelize.sync({ force: true });
  const userData = [
    {
      email: "rahul@rahul.com",
      password: "password",
    },
    {
      email: "renato@renato.com",
      password: "password",
    },
    {
      email: "spencer@spencer.com",
      password: "password",
    },
  ];
  const userSeeds = await User.bulkCreate(userData, {
    individualHooks: true,
  });
  console.table(userSeeds.map((usr) => usr.toJSON()));
  console.log("==============================");
  const clubData = [
    {
      apiClubId: 61,
      UserId: 1,
    },
    {
      apiClubId: 563,
      UserId: 1,
    },
    {
      apiClubId: 65,
      UserId: 2,
    },
    {
      apiClubId: 76,
      UserId: 3,
    },
  ];
  const clubSeeds = await Club.bulkCreate(clubData);
  console.table(clubSeeds.map((club) => club.toJSON()));
  process.exit(0);
};

seedMe();
