const mongoose = require('mongoose');
const Ticket = require('../models/Ticket');

const tickets = [
  {
    idUser: '641b5cb1dddce374e65beedc',
    idEvent: '6425711afc0043e6a61613cb',
    quantity: 10
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