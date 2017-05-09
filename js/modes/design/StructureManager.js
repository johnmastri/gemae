"use strict";

var $ = require('jquery');
var Backbone = require('backbone');

module.exports = Backbone.View.extend({

    initialize: function(ref){

        this.structures = [];

        this.group = s.group();

        this.m = s.rect("0%", 0, "20%", 200).attr({
            fill:"#888888"
        });

        this.group.add(this.m);
        this.group.appendTo(ref.group);

        $t.set(this.group.node, {
            autoAlpha:0
        })

        //console.log("SO FUCK");
        
    },

    add : function(n) {

        this.structures.push(n);
        this.update();
    },

    update : function() {

        for(var a = 0 ; a < this.structures.length ; a++) {

            var c = s.circle(10,a*20,10).attr({
                fill:"#000"
            })
            this.group.add(c);

        }

    },

    render: function() {

    }

});