const User = require("./User");
const Club = require("./Club");

User.hasMany(Club, {
  onDelete: "CASCADE",
});
Club.belongsTo(User);

module.exports = { User, Club };
