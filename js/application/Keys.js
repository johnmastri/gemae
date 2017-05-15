"use strict";

var $ = require('jquery');
var Backbone = require('backbone');

module.exports = Backbone.View.extend({

    initialize: function(obj){

        this.data = obj || null;

        this.keys = [];

        this.keys.push({
            key: "x",
            func: function() { console.log("FUCK YOU BITCH"); }
        });

        $b.on("keypress", $.proxy(this.handleKeypress, this));

    },

   register : function(key, func) {

        this.keys.push({
            key: key,
            func: func
        });

   },

    unregister : function(key) {

        //findIndex()

    },

   handleKeypress : function(event) {

       console.log(event.key);

       var k = this.keys.find(function(x) { return x.key === event.key });
       k.func();

   }

});