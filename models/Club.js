const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const User = require("./User");
const Competition = require("./Competition");

class Club extends Model {}

Club.init(
  {
    apiClubId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    apiClubName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    apiCompetitionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Competition,
        key: "apiCompetitionId",
      },
    },
  },
  {
    sequelize,
  }
);

module.exports = Club;
