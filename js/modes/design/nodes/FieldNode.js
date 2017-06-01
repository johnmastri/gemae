"use strict";

var $ = require('jquery');
var Backbone = require('backbone');
var NodeBase = require("../NodeBase");
var _ = require("underscore");


var ballsProto = {

    suck : function() {

        console.log("SUCK IT");

    }

};

var testProto = {

    whatever : function() {

        console.log("whatever");

    }

};


var FieldBaseProto = _.assign(

    //before
    NodeBase.proto,
    testProto,
    //overwrite
    {
        initialize : function() {

            console.log("ANYTHING HERE");

            console.log(NodeBase.proto);

            console.log(this.inputs)
        }

    },
);


var FieldBase = Backbone.View.extend( FieldBaseProto );

module.exports = FieldBase;
/*
module.exports = NodeBase.extend({

    initialize: function(obj){


    },

    render: function() {

    }

});
*/