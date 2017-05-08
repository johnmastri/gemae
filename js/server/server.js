'use strict';

// dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

// create an instance of express
const app = express();

// configure body-parser to accept
// urlencoded bodies and json data
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
   .use(bodyParser.json());

// connection to the database
require('./configs/database');

// route registration
app.use('/api', require('./routes/task'));


// error handling

// 404 errors
app.use((req, res, next) => {


  next();
});

// 500 errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

// set the port to use
const port = parseInt(process.env.PORT, 10) || 3000;

// start the server
const server = app.listen(port, () => {
  console.log(`App is running at: localhost:${server.address().port}`);
});
