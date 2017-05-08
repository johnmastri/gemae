'use strict';

// dependencies
const express = require('express');
const Task = require('../models/task');

const mongoose = require('mongoose');

// instance of express router
const router = express.Router();




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


router.route('/case-study')

    .get((req, res) => {

        mongoose.model("caseStudy").find({})
            .exec((err, task) => {
                if (err){
                    return res.send(err);
                }
                return res.json(task);
            });
    })


    .post((req, res) => {

        console.log(req.url);

        /*
        *
        * what's the difference between var and const in es6
        * */

        let sp = req.url.split('/');
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


    /*Task.find({}).sort({ createdAt: -1 })
            .exec((err, task) => {
                if (err){
                    return res.send(err);
                }
                return res.json(task);
            });*/
    })
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
