const { Schema, model } = require('mongoose');

const Player = model('player', playerSchema);

module.exports = Player;