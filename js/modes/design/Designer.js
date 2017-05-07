"use strict";

var $ = require('jquery');
var Backbone = require('backbone');
var NodeBase = require("./NodeBase");
var NodeMenu = require("./menu/NodeMenu");

module.exports = Backbone.View.extend({

    initialize: function(ref){

        this.nodes = [];

        this.types = ["structure", "field"];

        this.node_count = 0;

        this.field = s.group();
        this.field.appendTo(ref.group);

        for(var a = 0 ; a < 10 ; a++) {

                /*var r = Math.round( (this.types.length-1) * Math.random() );
                console.log(r, " R");

                var node_base = new NodeBase({
                    num: this.node_count,
                    type: this.types[r]
                });


                $t.set(node_base.group.node, {
                    x: (this.node_count * 100),
                    y: Math.random() * 200
                });

                this.nodes.push(node_base);
                this.field.add(node_base.group);

                this.node_count++;*/

            }

        $t.set(this.field.node, {
            //x: 200
        });

        this.node_menu = new NodeMenu();
       //console.log(this.node_menu.group, " NODE MENU GROUP");
        this.field.add(this.node_menu.group);

        $w.on("resize", $.proxy(this.render, this));

        this.render();
    },

    addNode : function(node) {

        console.log(node.data, " DATA");

        var node_base = new NodeBase({
            num: this.node_count,
            type: node.data.type,
            position: {
                x: Math.random() * $w.width(),
                y: Math.random() * 200
            }
        });

/*        $t.set(node_base.group.node, {

        });*/

        this.nodes.push(node_base);
        this.field.add(node_base.group);

        this.node_count++;

        //this.node_menu.close();

    },

    render: function() {

        s.attr({
            width: $w.width(),
            height: $w.height()
        });

        this.node_menu.render();
    }

});