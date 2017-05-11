"use strict";

var $ = require('jquery');
var Backbone = require('backbone');
var randomColor = require('randomcolor');

module.exports = Backbone.View.extend({

    initialize: function(obj) {

        this.data = obj;
        this.isOpen = false;
        this.parent = null;
        this.option = null;

        this.group = s.group();

        this.rect = s.rect(0,0,85,20);
        this.rect.attr({
            fill: "#EEEEEE"
        });
        $t.set(this.rect.node, {
            /*x:200-30-5,
             y:-22*/
        });

        this.group.add(this.rect);

        this.values = s.group();
        this.values_s = [];

        for(var a = 0 ; a < this.data.values.length ; a++) {

            var g = s.group();
            var r = s.rect(0,0,85,20).attr({
                fill: "#EEEEEE",//randomColor(),
                "data-num" : a
            });
            $(r.node).on("click", $.proxy(this.handleDDSelect, this));
            $t.set(r.node, {
                pointerEvents:"none",
                cursor:"pointer"
            });
            var t = s.text(5,7,this.data.values[a]).attr({
                "alignment-baseline" : "hanging"
            });
            $t.set( t.node , {
               color:"#727275",
               fontSize: 11
            });
            g.add(r, t);
            $t.set(g.node, {
                y: a * 20
            });
            this.values.add(g);
            this.values_s.push(g);

        }

        this.group.add(this.values);

        this.mask = s.rect(0,0,85,20).attr({fill:"#fff"});

        this.values.attr({
            mask : this.mask
        });

        this.hit = s.rect(0,0,85,20).attr({fill:'rgba(0,0,0,0)'});
        $t.set(this.hit.node, {
            cursor:"pointer"
        });
        this.group.add(this.hit);

        $(this.hit.node).on("click", $.proxy(this.handleDDOpen, this));




    },

    handleDDSelect : function(event) {

        var c = $(event.currentTarget);
        var n = c.data().num;
        var v = this.values_s[n];

        this.values.add(v);
        console.log(c);
        //this.values.add()
        $t.to(v.node, 0, {
            y: 0
        });

        this.handleDDClose();



    },

    handleDDOpen : function() {

        var n = $(this.group.node).closest(".node");
        var pu = $(this.group.node).parentsUntil(".node");

        var x = 0;
        var y = 0;

        for(var a = 0 ; a < pu.length ; a++) {

            var p = pu[a];
            if(p._gsTransform) {
                x += p._gsTransform.x;
                y += p._gsTransform.y;
            }
        }

        y += this.group.node._gsTransform.y;

        n[0].append(this.group.node);

        $t.set(this.group.node, {
            y:y
        });

        for(var a = 0 ; a < this.values_s.length ; a++) {

            var v = this.values_s[a];
            $t.set(v.node, {
                y: a * 20
            })
            var r = v.children()[0];

            $t.set(r.node, {
                pointerEvents:"auto"
            })

        }

        $t.to(this.mask.node, .25, {
            height: this.data.values.length * 20
        });
        $t.set(this.hit.node, {
            pointerEvents: "none"
        });

    },

    handleDDClose : function() {

        this.option.group.add(this.group);

        $t.set(this.group.node, {
            y:-20
        });

        $t.to(this.mask.node, 0, {
            height: 20
        });

        $t.set(this.hit.node, {
            pointerEvents: "inherit"
        });

        for(var a = 0 ; a < this.values_s.length ; a++) {

            var v = this.values_s[a];
            var r = v.children()[0];
            $t.set(r.node, {
                pointerEvents:"none"
            })

        }

    },

    render: function() {

    }

});