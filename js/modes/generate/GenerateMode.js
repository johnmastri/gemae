"use strict";

var $ = require('jquery');
var Backbone = require('backbone');

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

        this.bg = s.rect(0,0,$w.width(),$w.height()).attr("fill", "#8a600a");
        this.title = s.text(0,30,"GENERATE MODE");
        this.group.add(this.bg, this.title);

    },

    render: function() {


    }

});