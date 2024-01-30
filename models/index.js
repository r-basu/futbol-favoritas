const User = require("./User");
const Club = require("./Club");
const Competition = require("./Competition");

User.hasMany(Club, {
  onDelete: "CASCADE",
});
Club.belongsTo(User);

module.exports = { User, Club, Competition };
