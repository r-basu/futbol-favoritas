const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Club extends Model {}

Club.init(
  {
    apiClubId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);

module.exports = Club;
