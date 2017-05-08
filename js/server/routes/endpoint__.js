'use strict';

// dependencies
const express = require('express');
const Endpoint = require('../models/endpoint');
const mongoose = require('mongoose');

// instance of express router
const router = express.Router();
const schemas = require("../configs/schemas");

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

        mongoose.model(e).find({})
                .exec((err, task) => {
                    if (err) {
                        return res.send(err);
                    }
                    return res.json(task);
                });

        //}
    })

    .post((req, res) => {

        console.log(req.url, " URL");
        let e = req.url.substr(1, req.url.length);
        let p, d, o;
        switch(e) {

            default:

               /*
               p = req.body;
                console.log("BODY PARAMS : ", p);

                d = {};
                o = {};

                p.title = JSON.parse(p.title);
                p.title.type = naturalType(p.title.type);
                console.log(p, " < P ");
                console.log(p.title.type, " TYPE");
                console.log(p.title.type, " TYPE");
                */


               /* console.log(schemas[e]);

                if(schemas[e] != undefined) {
                    //add new schema

                } else {

                    //update schema?

                }*/

                /*
                let s = new mongoose.Schema(p, {strict: false});
                let n = new s({});



                n.save((err) => {
                    if (err) {
                        return res.send(err);
                    }
                    return res.json({message: 'new endpoint saved'});
                });
*/
                break;

            case "endpoint":

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

                /*let s = new mongoose.Schema(o, {strict: false});
                let n = new s(o);
                n.save((err) => {
                    if (err) {
                        return res.send(err);
                    }
                    return res.json({message: 'new endpoint saved'});
                });*/
            }

        });


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



function naturalType(type) {
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
}

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
