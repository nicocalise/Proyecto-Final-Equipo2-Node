const mongoose = require('mongoose');

//const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/events';

const DB_URL = 'mongodb://localhost:27017/events';

const connect = () => mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connect;