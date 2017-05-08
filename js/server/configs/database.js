// configs/database.js


'use strict';

// dependencies
const mongoose = require('mongoose');
const generator = require('mongoose-gen');
const schemas = require("./schemas");

generator.setValidator('validateBookYear', function (value) {
    return (value <= 2015);
});

// set the database name
const dbName = 'gemae';

// connect to the database
mongoose.connect(`mongodb://localhost:27017/${dbName}`);


function find (collec, query, callback) {

    console.log(" NOT EVEN CALLED");
    mongoose.connection.db.collection(collec, function (err, collection) {
        //console.log("WHAT", collection);
        collection.find(query).toArray(callback);

    });
}

// get notified if the connection
// was successful or not
const db = mongoose.connection;

//const schemas = schemas;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log(`Connected to the ${dbName} database`);

    find("schemas", {}, function(err, docs) {

        for(let a = 0 ; a < docs.length ; a++) {

            schemas[docs[a].name] = new mongoose.Schema(generator.convert(docs[a].schema), {strict: false});
            //console.log(schemas.casestudies, " CHEMMS")

        }

    } );

});