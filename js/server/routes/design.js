'use strict';

// dependencies
const express = require('express');
const mongoose = require('mongoose');

// instance of express router
const router = express.Router();
const schemas = require("../configs/schemas");
const design = require("../models/design/design");
const Endpoint = require('../models/endpoint');

const ObjectId = mongoose.Types.ObjectId;

// routes ending with /todos
/*router.route('/todos')
  .get((req, res) => {
    Task.find({}).sort({ createdAt: -1 })
        .exec((err, task) => {
          if (err){
            return res.send(err);
          }
          return res.json(task);
        });
  })
  .post((req, res) => {

    const task = new Task({
      name: req.body.name,
      note: req.body.note
    });

    task.save((err) => {
      if (err){
        return res.send(err);
      }

      return res.json({ message: 'New task created!' });
    });

  });*/

/**/

/*
router.route('/endpoints')

    .get((req, res) => {

        mongoose.model("endpoint").find({})
            .exec((err, task) => {
                if (err){
                    return res.send(err);
                }
                return res.json(task);
            });
    })

    .post((req, res) => {

        const endpoint = new Endpoint({
            name: req.body.name,
            slug: req.body.slug
        });

        endpoint.save((err) => {
            if (err){
                return res.send(err);
            }
            return res.json({ message: 'endpoint saved' });
        });

    });
*/

/*

require types?

/design API
*
* GET : will pull designer layout and all data
* POST : will update
*
*
*
*
*
*
* */

router.route('/*')

    .get((req, res) => {

        let e = req.url.substr(1, req.url.length);
        console.log(e);

        mongoose.model("design").find({})
                .exec((err, node) => {
                    if (err) {
                        return res.send(err);
                    }
                    return res.json(node);
                });

        //}
    })

    .put((req, res) => {

        let query = { local_id : req.body.local_id };
        console.log(query, " QUERTY");
        mongoose.model("design").findOneAndUpdate(query, req.body, {
            new: true,
            upsert: true
        }, (err, doc) => {

            console.log(err, " ERROR");

           console.log(doc, " DOC");
           return res.json(doc);

        });

        //MyModel.collection.drop();

        console.log(req.url, " URL");
        /*let e = req.url.substr(1, req.url.length);
        let o = {
            name: "something new from node",
            type: "textfield",
            position: {
                x: 300,
                y: 400
            }
        };
        let n = new design(o);
        n.save((err) => {
            if (err) {
                return res.send(err);
            }
            return res.json({message: 'new design saved'});
        });*/



        //endpoint
        //pull available endpoints from designs? if active


       /* let p, d, o;
        switch(e) {

            default:

                break;

            case "endpoint":*/

       /*
              p = req.body;
                console.log("BODY PARAMS : ", p);

                d = {};
                o = {};

                for (let a in p) {
                    console.log(a, " <AAAA ");
                    /!* if(a == "type") {
                     d[a] = (a == "type") ? p[a]*!/
                }
        */
               /* const endpoint = new Endpoint({
                    name: req.body.name,
                    slug: req.body.slug
                });

                endpoint.save((err) => {
                    if (err){
                        return res.send(err);
                    }
                    return res.json({ message: 'endpoint saved' });
                });*/

                /*let s = new mongoose.Schema(o, {strict: false});
                let n = new s(o);
                n.save((err) => {
                    if (err) {
                        return res.send(err);
                    }
                    return res.json({message: 'new endpoint saved'});
                });*/
            //}

        })

    .delete((req, res) => {

        design.remove({}, (err, doc) => {

            console.log(doc, " RES");

            return res.send(doc);

        })

    });

 /*   .put((req, res) => {

    console.log("PUT!!!");
    design.findOneAndUpdate({ _id: new ObjectId('5910e13f15de2ce81fb827d8') }, { name: 'jason bordsfsdne' }, {new : true}, (err, updated) => {
            console.log(updated);
            return res.json({message: ' design updated'});
        })

    });*/



        /*
        const endpoint = new Endpoint({
            name: req.body.name,
            slug: req.body.slug
        });

        endpoint.save((err) => {
            if (err){
                return res.send(err);
            }
            return res.json({ message: 'endpoint saved' });
        });
        */



/*function naturalType(type) {
    switch (type) {
        case 'String':
            return String;
        case 'Date':
            return Date;
        case 'Number':
            return Number;
        case 'Boolean':
            return Boolean;
        case 'ObjectId':
            return mongoose.Schema.Types.ObjectId;
        case 'Array':
            return Array;
        default:
        {
            return mongoose.Schema.Types[type];
        }
    }
}*/

    /*
    .post((req, res) => {

        console.log(req.url);


        //what's the difference between var and const in es6


        var sp = req.url.split('/');
        sp.shift();
        console.log(sp, ' < SPLIT');

        const schema = new mongoose.Schema({
            user_id : {type: String},
            fuck : {type: String}
        },{
          strict : false
        });

        //const m = mongoose.model(sp[0], schema);
        const m = mongoose.model("caseStudy", schema);

        const t = new m({
            name : req.body.name,
            fuck : sp[2]
        });
        t.save((err) => {
            if (err){
                return res.send(err);
            }

            return res.json({ message: 'New task created!' });
        });

        //console.log(m);

        //return res.json({ message: 'New case created!' });

        */


    /*Task.find({}).sort({ createdAt: -1 })
            .exec((err, task) => {
                if (err){
                    return res.send(err);
                }
                return res.json(task);
            });*/
   // })
 /*   .post((req, res) => {

        const task = new Task({
            name: req.body.name,
            note: req.body.note
        });

        task.save((err) => {
            if (err){
                return res.send(err);
            }

            return res.json({ message: 'New task created!' });
        });

    });*/


/**/




// routes starting with /todos/:id
/*router.route('/todos/:id')
  .get((req, res) => {
    Task.findById(req.params.id, (err, task) => {
      if (err){
        return res.send(err);
      }
      return res.json(task);
    });
  })
  .put((req, res) => {
    Task.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      note: req.body.note,
      completed: req.body.completed
    }, (err) => {
      if (err){
        return res.send(err);
      }
      return res.json({ message: 'Task updated successfully' });
    });
  })
  .delete((req, res) => {
    Task.remove({ _id: req.params.id }, (err) => {
      if (err){
        return res.send(err);
      }
      return res.json({ message: 'Task has been removed!' });
    });
  });*/

module.exports = router;
