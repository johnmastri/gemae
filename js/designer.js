"use strict";

var $ = require('jquery');
var Backbone = require('backbone');
var NodeBase = require("./NodeBase");

module.exports = Backbone.View.extend({

    initialize: function(){

        this.nodes = [];

        this.types = ["structure", "field"];

        this.field = s.group();

        for(var a = 0 ; a < 10 ; a++) {

                var r = Math.round( (this.types.length-1) * Math.random() );
                console.log(r, " R");

                var node_base = new NodeBase({
                    num: a,
                    type: this.types[r]
                });


                $t.set(node_base.group.node, {
                    x: (a * 100),
                    y: Math.random() * 200
                });

                this.nodes.push(node_base);

                this.field.add(node_base.group);


            }

        $t.set(this.field.node, {
            x: 200
        });

        $w.on("resize", $.proxy(this.render, this));

        this.render();
    },


    render: function() {

        s.attr({
            width: $w.width(),
            height: $w.height()
        });
    }

});