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
    capacity: 1000, //not required
    duration:'2',
    foto: "https://res.cloudinary.com/dgan7qtmg/image/upload/v1680555351/multer/circu.jpg" //not required
  },
  {
    name: 'Rammstein',
    description: 'Loocooo',
    location: ' Galicia',
    date: '12-06-2023',
    eventType: ' Heavy', //not required
    capacity: 1000, //not required
    duration:'2', //not required
    foto: "https://res.cloudinary.com/dgan7qtmg/image/upload/v1680555442/multer/rammstein.jpg"
  },
  {
    name: 'Antonio Orozco',
    description: 'Mi heroe',
    location: ' Barcelona',
    date: '21-06-2023',
    eventType: ' Familiar', //not required
    capacity: 1000, //not required
    duration:'2',
    foto: "https://res.cloudinary.com/dgan7qtmg/image/upload/v1680363023/qjjav27vudgjy86xgkge.jpg" //not required
  },
  {
    name: 'Laura Paussini',
    description: 'Ella',
    location: ' Valencia',
    date: '23-11-2023',
    eventType: ' Familiar', //not required
    capacity: 1000, //not required
    duration:'2', //not required
    foto: "https://res.cloudinary.com/dgan7qtmg/image/upload/v1680555600/multer/Laura.jpg"
  },
  {
    name: 'Fito',
    description: ' Y los fitipaldis',
    location: ' Murcia',
    date: '08-12-2023',
    eventType: ' Familiar', //not required
    capacity: 1000, //not required
    duration:'2',
    foto: "https://res.cloudinary.com/dgan7qtmg/image/upload/v1680555722/multer/Fito.jpg" //not required
  },
  {
  name: 'Iron Maiden',
  description: ' Conciert de musica Metal',
  location: ' Malaga',
  date: '30-05-2023',
  eventType: ' Heavy Metal', //not required
  capacity: 500 , //not required
  duration:'1:30', //not required
  foto: "https://res.cloudinary.com/dgan7qtmg/image/upload/v1680555772/multer/Iron.jpg"
}
];

const eventDocuments = events.map(item => new Event(item));

const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/events';

mongoose
  .connect(DB_URL, {
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