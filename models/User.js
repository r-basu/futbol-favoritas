const { Schema, model } = require("mongoose");
const playerSchema = require("./Player");
const clubSchema = require("./Club");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      max_length: 50,
    },
    email: {
      type: String,
      required: true,
      max_length: 50,
    },
    password: {
      type: String,
      required: true,
      max_length: 50,
    },
    players: [playerSchema],
    club: [clubSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model("user", userSchema);

module.exports = User;
