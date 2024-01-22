const { Schema, model } = require('mongoose');

const Club = model('club', clubSchema);

module.exports = Club;