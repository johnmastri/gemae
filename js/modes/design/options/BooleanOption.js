"use strict";

var $ = require('jquery');
var Backbone = require('backbone');

module.exports = Backbone.View.extend({

    initialize: function(obj) {

        this.data = obj;
        this.isOpen = false;

        this.group = s.group();


    },

    render: function() {

    }

});