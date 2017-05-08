'use strict';


// dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const mongoose = require('mongoose');
const Endpoint = require('./models/endpoint');

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
app.use('/api/v1/', require('./routes/endpoints'));
app.use('/api/design/', require('./routes/design'));


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

/*
*
* when the server first runs, you need to register all the models with mongoose
*
*
* is it possible to put this inside of a function and have the route call it?  Most likely it is.. =)
*
* */

/*
var f = () => {
  console.log("test");
}
console.log(f());
*/

//register endpoints

mongoose.model("endpoint").find({})
    .exec((err, eps) => {
        if (err){
            console.log("HELLO")
        }
        console.log(eps.length, " <<<<<");

        /*for(let a = 0 ; a < eps.length ; a++) {



        }*/
    });

/*function find (collec, query, callback) {

  console.log(" NOT EVEN CALLED");
    mongoose.connection.db.collection(collec, function (err, collection) {
      //console.log("WHAT", collection);
        collection.find(query).toArray(callback);

    });
}*/


//console.log(mongoose.connection.db.collection("casestudies") , " CONNECT")
/*

find("casestudies", {}, function(err, docs) {
  console.log(err, " ERR");
  console.log(docs, " DOCS")
} );
*/
