const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  idUser: { type: mongoose.Types.ObjectId, ref: 'User' },
  idEvent: { type: mongoose.Types.ObjectId, ref: 'Event' },
  quantity: {type: Number}
});

module.exports = mongoose.model('Ticket', ticketSchema);
