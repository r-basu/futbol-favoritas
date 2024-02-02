const User = require("./User");
const Competition = require("./Competition");
const Club = require("./Club");


User.hasMany(Club, {
  onDelete: "CASCADE",
});
Club.belongsTo(User);
Club.hasOne(Competition);
Competition.belongsTo(Club);

module.exports = { User, Competition, Club  };
