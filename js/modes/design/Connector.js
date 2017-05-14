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
            onDragStart: this.handleDragStart,
            onDragStartScope: this,
            onDrag: this.handleDrag,
            onDragScope: this,
            onDragEnd : this.handleDragEnd,
            onDragEndScope : this
        });

        this.connector_point = s.circle(0,0,10).attr("fill", "#00ff00");


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

                console.log(i,  " LAST N");

                if (Draggable.hitTest(this.hit_circle.node, i.connector_point.node) && i != this.last_i)  {//} && n != this.node) {

                    this.last_n = n;
                    this.last_i = i;
                    return;

                } else {

                    this.last_n = null;
                    this.last_i = null;

                }

            }

        }

    },

    handleDragEnd : function(event) {

        if(this.last_n) {

            this.data.node.updateOutput(this, this.last_n, this.last_i);
            this.drawLine();

            //this.data.node.output_connections.push(this.last_n);


            //CM.sm.updateInputConnection(this.last_n);

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

            //TODO: update with .parentUntil
            var x = this.last_n.group.node._gsTransform.x - this.data.node.group.node._gsTransform.x - this.group.node._gsTransform.x + this.last_i.group.node._gsTransform.x;
            var y = this.last_n.group.node._gsTransform.y - this.data.node.group.node._gsTransform.y - this.group.node._gsTransform.y + this.last_i.group.node._gsTransform.y;

            //var x = this.last_n.group.node._gsTransform.x
            //var y = this.last_n.group.node._gsTransform.y
            //y += MASTRI.y($(this.last_i.group.node))
            //y += (14 * this.last_n.inputs.length)

            $t.set(this.hit_circle.node, {
                x: x,
                y: y
            });

            this.line.attr({
                x2: x,
                y2: y
            });

        }

    },

    update : function() {

        this.drawLine();

        for(var a = 0 ; a < this.data.node.input_connections.length ; a++) {

            var c = this.data.node.input_connections[a];
            for(var b in c.outputs) c.outputs[b].drawLine();

        }

        //if(this.last_n) {

           /* for (var a = 0; a < this.last_n.input_connections.length; a++) {

                var c = this.data.node.input_connections[a];
                for (var b in c.inputs) c.inputs[b].drawLine();

            }*/

        //}

    },

    render: function() {

    }

});