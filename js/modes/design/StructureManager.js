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

        var o = {};
        o.node = n;
        o.group = this.create();
        this.structures.push(o);
    },

    create : function() {

        var g = s.group();


        var c = s.circle(0,0,10).attr({
            fill:"#000"
        });

        g.add(c);

        $t.set(g.node, {
            y: (this.structures.length * 20) + 30
        });

        return g;

    },

/*    updateInputConnections : function() {

     console.log(this.structures.length, " STRUCKS");

     for(var a = 0 ; a < this.structures.length ; a++) {

     console.log(this.structures[a].node.input_connections.length, " LENGHT");

     for (var b = 0; b < this.structures[a].node.input_connections.length; b++) {

     console.log("ANIMTION");

     var c = s.circle(0, 0, 10).attr({
     fill: "#FFF"
     });

     $t.set(c.node, {
     x: 20 * b
     });

     console.log(this.structures[a].group, " GROU");

     this.structures[a].group.add(c);
     }
     }

     },*/

    updateInputConnection : function(node) {

        function isNode(element) {

            return element.node.id == node.id;
        }

        var str = this.structures.find(isNode); // 130
        console.log(str, " SR");

        //for(var a = 0 ; a < str.node.input_connections.length ; a++) {

            console.log("FOR FUCKS SAKE");

            var c = s.circle(0, 0, 10).attr({
                fill: "#FFF"
            });

            $t.set(c.node, {
                x: 20 * str.group.children().length
            });

            str.group.add(c);


       // }

    },



    render: function() {

    }

});