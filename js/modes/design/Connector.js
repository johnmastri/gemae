"use strict";

var $ = require('jquery');
var Backbone = require('backbone');

module.exports = Backbone.View.extend({

    initialize: function(obj){

        this.data = obj || null;

        this.group = s.group();

        // adds node type to structure manager
       /* if(this.data.type == "structure") {
            CM.sm.add(this);
        }*/

        this.hit_circle = s.circle(0,0,(this.data.type == "output") ? 10 : 0).attr("fill", "#ff0000");


        $t.set(this.hit_circle.node, {
            //x: 20,
            y: 0,
            cursor:"pointer"
        });

        this.hit = Draggable.create(this.hit_circle.node, {
            type:"x,y",
            edgeResistance:0.65,
            //bounds:s.node,
            //throwProps:true,
            onDragStart: this.handleDragStart,
            onDragStartScope: this,
            onDrag: this.handleDrag,
            onDragScope: this,
            onDragEnd : this.handleDragEnd,
            onDragEndScope : this
        });

        this.connector_point = s.circle(0,0,5);//.attr("data-num", this.data.num);

        $t.set(this.connector_point.node, {
            pointerEvents:"none"
        });

        this.line = s.line(0,0,0,0).attr({strokeWidth:1,stroke:"black",strokeLinecap:"round", pointerEvents:"none"});
        this.group.add(this.hit_circle, this.connector_point, this.line);

        this.connections = [];
        this.connectors = [];

        this.last_n = null;
        this.last_i = null;

    },

    handleMouseUp : function(event) {

        $(s.node).off("mousemove", $.proxy(this.handleMouseMove, this));

    },

    handleDragStart : function(event) {

        event.stopImmediatePropagation();

        var x = event.target._gsTransform.x;
        var y = event.target._gsTransform.y;

        this.start_x = event.clientX - x;
        this.start_y = event.clientY - y;

    },

    handleDrag : function(event) {

        event.stopImmediatePropagation();

        var x2 = event.clientX - this.start_x || 0;
        var y2 = event.clientY - this.start_y || 0;

        this.line.attr({
            x2: x2,
            y2: y2
        });

        for(var a = 0 ; a < CM.designer.nodes.length ; a++) {

            var n = CM.designer.nodes[a];

            for(var b = 0 ; b < n.inputs.length ; b++) {
                
                var i = n.inputs[b];

                if (Draggable.hitTest(this.hit_circle.node, i.connector_point.node) && n != this) {
                    console.log("HIT");
                    this.last_n = n;
                    this.last_i = i;//.mini_circle_l.node;
                    return;
                } else {
                    this.last_n = null;
                    this.last_i = null;
                }

            }

        }

    },

    handleDragEnd : function(event) {

       /* var x = this.last_n.group.node._gsTransform.x - this.group.node._gsTransform.x - 20;
        var y = this.last_n.group.node._gsTransform.y - this.group.node._gsTransform.y + 2.5;


        $t.set(this.hit_circle.node, {
            x: x,
            y: y
        });

        this.line.attr({
            x2: x,
            y2: y
        });*/

        if(this.last_n) {

            this.drawLine();

            this.data.node.input_connections.push(this.last_n);
            this.last_n.output_connections.push(this.data.node);

            //this.last_n.last_n = this;
        } else {

            $t.to(this.hit_circle.node, .2, {
                x: 0,
                y: 0,
                onUpdate : this.updateLine,
                onUpdateScope : this,
                ease: Circ.easeInOut
            })

        }

    },

    updateLine : function() {

        this.line.attr({
            x2: this.hit_circle.node._gsTransform.x,
            y2: this.hit_circle.node._gsTransform.y
        });

    },


    drawLine : function() {

        if(this.last_n) {

            var x = this.last_n.group.node._gsTransform.x - this.data.node.group.node._gsTransform.x - this.group.node._gsTransform.x + this.last_n.inputs[0].group.node._gsTransform.x;
            var y = this.last_n.group.node._gsTransform.y - this.data.node.group.node._gsTransform.y - this.group.node._gsTransform.y;


            $t.set(this.hit_circle.node, {
                x: x,
                y: y + 33/2
            });

            this.line.attr({
                x2: x,
                y2: y + 33/2
            });

        }

    },

    update : function() {

        this.drawLine();

        for(var a = 0 ; a < this.data.node.output_connections.length ; a++) {

            var c = this.data.node.output_connections[a];
            for(var b in c.outputs) c.outputs[b].drawLine();

        }

    },

    render: function() {

    }

});