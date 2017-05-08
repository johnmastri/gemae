'use strict';

// dependencies
const express = require('express');
const Endpoint = require('../models/endpoint');
const mongoose = require('mongoose');
const endpoints = require("../configs/endpoints");

// instance of express router
const router = express.Router();
const schemas = require("../configs/schemas");

router.route('/*')

    .get((req, res) => {

        let e = req.url.substr(1, req.url.length);
        console.log(e, " < IS THIS AN ACTIVE ENDPOINT");
        console.log(endpoints.active[0].options.slug, ' ACTIVE');

        let found = false;
        let en;

        for(let i = 0; i < endpoints.active.length; i++) {

            en = endpoints.active[i];
            if(en.options.slug === e) {
                found = true;
                break;
                //return i;
            }
        }

        if(found) {
            console.log("this is active let's pull some data");

            mongoose.model(en.name).find({})
                .exec((err, ep) => {
                    if (err) {
                        return res.send(err);
                    }

                    return res.json(ep);
                });


        } else {

            res.json({message: " no endpoint found" });

        }

    })

    .post((req, res) => {

        let e = req.url.substr(1, req.url.length);
        console.log(e, "CLIENT SIDE API ENDPOINT");

        mongoose.model(e).find({type:"endpoint", active: true})
            .exec((err, task) => {
                if (err) {
                    return res.send(err);
                }
                return res.json(task);
            });
       /* console.log(req.url, " URL");
        let e = req.url.substr(1, req.url.length);

                const endpoint = new Endpoint({
                    name: req.body.name,
                    slug: req.body.slug
                });

                endpoint.save((err) => {
                    if (err){
                        return res.send(err);
                    }
                    return res.json({ message: 'endpoint saved' });
                });*/



        });



module.exports = router;
