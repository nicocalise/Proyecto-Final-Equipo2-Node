const express = require('express');
var cors = require('cors')
const path = require('path');
require('dotenv').config();

// Auth
require("jsonwebtoken");

// Utils
const connect = require('./utils/db');
const logError = require('./utils/log');

// Routes

const userRoutes = require('./routes/user.routes');
const eventRoutes = require('./routes/event.routes');


// Server config
connect();
const PORT = 5000;
const server = express();

// Middlewares
server.use(cors())
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
server.set("secretKey", "nodeRestApi");
// server.use(express.static(path.join(__dirname, 'public')));

// Routes
server.use('/users', userRoutes);
server.use('/events', eventRoutes);

// Error control
server.use('*', (req, res, next) => {
  const msg = 'Route not found';
  const error = new Error('Route not found');
  error.status = 404;
  next(error);
  const log = `${msg}
  ${req.path}
  ${new Date().toISOString()}\n`;
  logError(log);
});
server.use((error, req, res, next) => {
  return res.status(error.status || 500).json(error.message || 'Unexpected error');
});

// Server
server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});