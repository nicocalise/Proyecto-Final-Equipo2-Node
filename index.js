const express = require('express');

//utils
const connect = require('./utils/db.js');

//Server
connect();
const PORT = process.env.PORT || 3000;
const server = express();

server.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
  });