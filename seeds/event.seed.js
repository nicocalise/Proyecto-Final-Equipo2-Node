const mongoose = require('mongoose');
const Event = require('../models/Event');
//require('dotenv').config();

const events = [
  {
    name: 'Cirque du Solei',
    description: ' Un circo para la familia',
    location: ' Madrid',
    date: '18-04-2023',
    eventType: ' Familiar', //not required
    capacity:' 1000', //not required
    duration:'2' //not required
  },
  {
  name: 'Iron Maiden',
  description: ' Conciert de musica Metal',
  location: ' Malaga',
  date: '30-05-2023',
  eventType: ' Heavy Metal', //not required
  capacity:' 500', //not required
  duration:'1:30' //not required
}
];

const eventDocuments = events.map(item => new Event(item));

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/events';

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
  .then(async () => {
    const allEvents = await Event.find();
    if (allEvents.length) {
        await Event.collection.drop();
    }
    })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {
	    await Event.insertMany(eventDocuments);
    })
  .catch((err) => console.log(`Error creating data: ${err}`))
  .finally(() => mongoose.disconnect());