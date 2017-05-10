"use strict";

var $ = require('jquery');
var Backbone = require('backbone');
var randomColor = require('randomcolor');

var NumberOption = require("./NumberOption");
var BooleanOption = require("./BooleanOption");
var DropdownOption = require("./DropdownOption");


module.exports = Backbone.View.extend({

    initialize: function(obj) {

        this.data = obj;
        this.isOpen = false;

        this.group = s.group();


        var fill = "#C9C9CA";
        var accent = "#C9C9CA";

        this.rect = s.rect(0, -22, 200, 22);
        this.rect.attr({
            fill: fill//randomColor()
        });

        this.group.add(this.rect);

        this.label  = s.text(5,-6, this.data.label);
        $t.set(this.label.node, {
            fontSize : 11,
            color:"#727275"
        });
        this.group.add(this.label);

        console.log(this.data, " OPTION data type");

        this.init();

    },

    init : function() {

        switch(this.data.type) {

            case "Number":
                this.ot = new NumberOption();
                break;

            case "Boolean":
                this.ot = new BooleanOption();
                break;

            case "Dropdown":
                this.ot = new DropdownOption();
                break;

        }

        this.group.add(this.ot.group);

        $t.set(this.ot.group.node, {
            x:200-30-5,
            y:-22
        });

    },

    open : function() {


    },

    close : function() {


    },

    render: function() {

    }

});