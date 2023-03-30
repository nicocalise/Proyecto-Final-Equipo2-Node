const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  //nombre: { type: String, required: true },
  id_event: { type: String, required: true },
  cantidad_disponible: { type: Number, required: true },
  fecha: {type: String, required: true},
});

module.exports = mongoose.model('Ticket', ticketSchema);
