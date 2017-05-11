"use strict";

var $ = require('jquery');
var Backbone = require('backbone');
var randomColor = require('randomcolor');

var NumberOption = require("./NumberOption");
var BooleanOption = require("./BooleanOption");
var DropdownOption = require("./DropdownOption");


module.exports = Backbone.View.extend({

    initialize: function(obj) {


        this.data = obj.data;
        this.parent = obj.parent;
        this.isOpen = false;

        this.group = s.group();


        var fill = "#C9C9CA";
        var accent = "#C9C9CA";

        this.rect = s.rect(0, -21, 5, 22);
        this.rect.attr({
            fill: fill//randomColor()
        });

        this.group.add(this.rect);

        this.label  = s.text(10,-6, this.data.label);
        $t.set(this.label.node, {
            fontSize : 11,
            color:"#727275"
        });
        this.group.add(this.label);

        this.init();

    },

    init : function() {

        switch(this.data.type) {

            case "Number":
                this.ot = new NumberOption(this.data);
                break;

            case "Boolean":
                this.ot = new BooleanOption(this.data);
                break;

            case "Dropdown":
                this.ot = new DropdownOption(this.data);
                break;

        }

        this.ot.parent = this.parent;
        this.ot.option = this;

        this.group.add(this.ot.group);

        $t.set(this.ot.group.node, {
            x:200 - $(this.ot.group.node).width() - 5,
            y:-20
        });

    },

    open : function() {


    },

    close : function() {


    },

    render: function() {

    }

});