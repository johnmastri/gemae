"use strict";

var $ = require('jquery');
var Backbone = require('backbone');
var Designer = require("./Designer");
var StructureManager = require("./StructureManager");


module.exports = Backbone.View.extend({

    initialize: function(){

/*        $t.set(this.$el, {
            width: "100%",
            height: "100%",
            backgroundColor:"blue",
            color:"white"
        });

        this.$el.html("THIS IS THE DESIGN SECTION");*/

        this.group = s.group();

        this.bg = s.rect(0,0,$w.width(),$w.height()).attr("fill", "#999999");
        this.group.add(this.bg);

        CM.sm = new StructureManager();
        CM.designer = new Designer();

    },

    render: function() {


    }

});