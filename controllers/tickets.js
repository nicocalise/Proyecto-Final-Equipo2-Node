const Ticket = require('../models/ticket');

const comprarTickets = async (req, res) => {
  const { nombreEvento, cantidadTickets } = req.body;

  // Buscar el registro correspondiente del evento
  const ticket = await Ticket.findOne({ nombreEvento });

  if (!ticket) {
    return res.status(404).json({ mensaje: `No se encontró un evento con nombre '${nombreEvento}'` });
  }

  if (cantidadTickets > ticket.ticketsDisponibles) {
    return res.status(400).json({ mensaje: 'No hay suficientes tickets disponibles para este evento' });
  }

  // Actualizar el número de tickets disponibles en el registro del evento
  ticket.ticketsDisponibles -= cantidadTickets;
  await ticket.save();

  // Enviar una respuesta indicando que la compra se ha realizado correctamente
  res.json({ mensaje: `Se han comprado ${cantidadTickets} tickets para el evento ${nombreEvento}` });
};

module.exports = { comprarTickets };
