const mongoose = require('mongoose');
mongoose.set('strictQuery', false);


const DB_URL = 'mongodb://127.0.0.1:27017/Proyecto_final';

const connect = () => mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connect;