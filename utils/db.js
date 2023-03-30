const mongoose = require('mongoose');
mongoose.set('strictQuery', false);


//const DB_URL = 'mongodb://127.0.0.1:27017/events';
//const DB_URL = 'mongodb+srv://equipo2:upgradehub@proyectofinal.lgsacwc.mongodb.net/?retryWrites=true&w=majority';
const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/events';


const connect = () => mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connect;