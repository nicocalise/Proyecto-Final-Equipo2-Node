const express = require('express');
var cors = require('cors')
const path = require('path');
require('dotenv').config();
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc  = require('swagger-jsdoc');
// Auth
require("jsonwebtoken");

// Utils
const connect = require('./utils/db');
const logError = require('./utils/log');

// Routes

const userRoutes = require('./routes/user.routes');
const eventRoutes = require('./routes/event.routes');
const ticketRoutes = require('./routes/ticket.routes');


// Server config
connect();
const PORT = 3000;
const app = express();

// Middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.set("secretKey", "nodeRestApi");
// server.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/users', userRoutes);
app.use('/events', eventRoutes);
app.use('/tickets', ticketRoutes);

// Error control
app.use('*', (req, res, next) => {
  const msg = 'Route not found';
  const error = new Error('Route not found');
  error.status = 404;
  next(error);
  const log = `${msg}
  ${req.path}
  ${new Date().toISOString()}\n`;
  logError(log);
});
app.use((error, req, res, next) => {
  return res.status(error.status || 500).json(error.message || 'Unexpected error');
});

// Server
app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});