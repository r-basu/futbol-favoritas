const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Competition extends Model {}

Competition.init(
  {
    apiCompetitionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    apiCompetitionName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);

module.exports = Competition;
