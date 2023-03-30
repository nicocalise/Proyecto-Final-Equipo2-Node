const mongoose = require('mongoose');
const User = require('../models/User');
//require('dotenv').config();

const users = [
  {
    name: 'Pepe Goya',
    email: ' pepe.goya@pepito.com',
    password: 'Cargadeprueba',
    birthdate: '10-07-1967', //not required
    location: ' Madrid', //not required

  }
];

const userDocuments = users.map(item => new User(item));

const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/events';

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
  .then(async () => {
    const allUsers = await User.find();
    if (allUsers.length) {
        await User.collection.drop();
    }
    })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {
	    await User.insertMany(userDocuments);
    })
  .catch((err) => console.log(`Error creating data: ${err}`))
  .finally(() => mongoose.disconnect());