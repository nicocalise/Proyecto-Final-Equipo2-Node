const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Esquema de tickets
const ticketSchema = new Schema(
  {
    user: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    date: { type: String , required: true},
    //location: { type: String , required: true},
    seat: {type: String, required: true},
    event : [{ type: mongoose.Types.ObjectId, ref: 'Event' }],
  },
  {
    // Esta propiedad servirá para guardar las fechas de creación y actualización de los documentos
    timestamps: true,
  }
);

// Creamos y exportamos el modelo Recipe
const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;