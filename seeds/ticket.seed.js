const mongoose = require('mongoose');
const Ticket = require('../models/Ticket');
//require('dotenv').config();

const tickets = [
  {
    user: '641b5cb1dddce374e65beedc',
    date: ' 22-03-2023',
    seat : 'A5',
    event: '641b48bcea6aca1a4caebf56',
  }
];

const ticketDocuments = tickets.map(item => new Ticket(item));

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/events';

mongoose
  .connect(MONGODB_URI, {
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