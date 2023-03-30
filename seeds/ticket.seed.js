const mongoose = require('mongoose');
const Ticket = require('../models/Ticket');
//require('dotenv').config();

const tickets = [
  {
    id_event: '641b48bcea6aca1a4caebf56',
    cantidad_disponible: 100,
    fecha : '21-10-2023',
  }
];

const ticketDocuments = tickets.map(item => new Ticket(item));

const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/events';

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
  .then(async () => {
    const allTickets = await Ticket.find();
    if (allTickets.length) {
        await Ticket.collection.drop();
    }
    })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {
	    await Ticket.insertMany(ticketDocuments);
    })
  .catch((err) => console.log(`Error creating data: ${err}`))
  .finally(() => mongoose.disconnect());