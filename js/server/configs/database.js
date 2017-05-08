// configs/database.js


'use strict';

// dependencies
const mongoose = require('mongoose');
const generator = require('mongoose-gen');
const schemas = require("./schemas");
const endpoints = require("./endpoints");
const design = require("../models/design/design");

generator.setValidator('validateBookYear', function (value) {
    return (value <= 2015);
});

// set the database name
const dbName = 'gemae';

// connect to the database
mongoose.connect(`mongodb://localhost:27017/${dbName}`);


function find (collec, query, callback) {

    mongoose.connection.db.collection(collec, function (err, collection) {
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


    //create schemas for entries already in the db
    find("schemas", {}, function(err, docs) {
        for(let a = 0 ; a < docs.length ; a++) {
            schemas[docs[a].name] = new mongoose.Schema(generator.convert(docs[a].schema), {strict: false});
            schemas.models = mongoose.model(docs[a].name, schemas[docs[a].name]);
            console.log(schemas.models, " CHEMMS")
        }


        //pull active endpoints from design
        mongoose.model("design").find({type:"endpoint", active: true})
            .exec((err, ep) => {
                //if (err)
                  // console.log(err);

                endpoints.active = ep;
                console.log("END POINT : " , endpoints.active)

            });
    } );

});