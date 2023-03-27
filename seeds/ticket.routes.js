const express = require('express');
const Ticket = require('../models/Ticket');
const Event = require('../models/Ticket');
const router = express.Router();

// viewAll=true
router.get('/', async (req, res, next) => {
  const { viewAll } = req.query;
  try {
    let tickets = [];
    if (viewAll === 'true') {
      tickets = await Event.find().populate('tickets');
    } else {
      tickets = await Event.find();
    }
    return res.status(200).json(tickets);
  } catch (error) {
    return next(error);
  }
});

router.post('/tickets', async (req, res) => {
    const { eventName, availableSeats } = req.body;
  
    const newTicket = new Ticket({
      eventName,
      availableSeats,
      seats: []
    });
  
    await newTicket.save();
  
    res.status(201).json(newTicket);
  });


  router.post('/buy', async (req, res) => {
    const numSeats = req.body.numSeats;
  
    // Busca el primer ticket disponible con suficientes asientos
    const ticket = await Ticket.findOne({ availableSeats: { $gte: numSeats } });
  
    if (!ticket) {
      return res.status(400).json({ success: false, message: 'No hay suficientes asientos disponibles' });
    }
  
    // Asigna asientos correlativos
    const startSeat = ticket.seats.length + 1;
    const assignedSeats = [];
    for (let i = startSeat; i < startSeat + numSeats; i++) {
      assignedSeats.push(i);
    }
  
    // Actualiza la base de datos
    ticket.availableSeats -= numSeats;
    ticket.seats = ticket.seats.concat(assignedSeats);
    await ticket.save();
  
    // Envia la respuesta al cliente
    res.status(200).json({ success: true, seats: assignedSeats });
  });

module.exports = router;