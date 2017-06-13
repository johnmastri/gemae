"use strict";

var $ = require('jquery');
var Backbone = require('backbone');
var _ = require("underscore");

module.exports = Backbone.View.extend({

    initialize: function(obj){

        this.data = obj || null;
        this.node = this.data.node;
        this.parentNode = this.data.parentNode;

        _.extend(this, Backbone.Events);

        this.group = s.group();

        $(this.group.node).on("mouseenter", $.proxy(this.over, this));

        this.input = null;
        this.output = null;
        //this.input_connectors = [];
        this.connector = null;

        this.hit_circle = s.circle(0,0,(this.data.type === "output") ? 5 : 0).attr("fill", "#ff0000");

        $t.set(this.hit_circle.node, {
            x: 0,
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
        this.group.add(this.connector_point, this.line, this.hit_circle);

        this.last_n = null;
        this.last_i = null;

    },

    over : function() {

        //console.log(this, " S");

    },

    handleMouseUp : function(event) {

        $(s.node).off("mousemove", $.proxy(this.handleMouseMove, this));

    },

    handleDragStart : function(event) {

        event.stopImmediatePropagation();

        var x = this.hit_circle.node._gsTransform.x || 0;
        var y = this.hit_circle.node._gsTransform.y || 0;

        this.start_x = event.clientX - x;
        this.start_y = event.clientY - y;

        this.disabled_connectors = [];

    },

    handleDrag : function(event) {

        event.stopImmediatePropagation();

        var x2 = event.clientX - this.start_x || 0;
        var y2 = event.clientY - this.start_y || 0;

        this.line.attr({
            x2: x2,
            y2: y2
        });


        //TODO: only loop through nodes with correlating inputs
        for(var a = 0 ; a < CM.designer.nodes.length ; a++) {

            var n = CM.designer.nodes[a];

            var l = (this.connector != null) ? n.inputs.connectors.length - 1 : n.inputs.connectors.length;

            if(this.connector && n === this.connector.data.node && this.disabled_connectors.length === 0) {

                //if( this.disabled_connectors.findIndex(function(x) {  }) == -1
                //if(this.disabled_connectors.length === 0) {
                    var hi = n.inputs.connectors[n.inputs.connectors.length - 1];
                    this.disableConnectors(hi);
                    this.disabled_connectors.push(hi)
               //}

            }

            for(var b = 0 ; b < l ; b++) {
                
                var i = n.inputs.connectors[b];

                if (Draggable.hitTest(this.hit_circle.node, i.connector_point.node))  {//} && n != this.node) {

                    this.last_n = n;
                    this.last_i = i;

                    /*if(this.connector != null && b === n.inputs.length - 1) {
                        console.log("CAN'T DROP ME INTO THE LAST")
                    }*/

                    return;

                } else {

                    this.last_n = null;
                    this.last_i = null;

                }

            }

        }

    },

    handleDragEnd : function(event) {

        //this.trigger("whatever", this, this.last_n, this.last_i)

      if(this.last_n) {

          //dragged a connector but decided to put it back where it started from
          if(this.last_i.connector == this) {

              this.enableConnectors();
              this.drawLine();
              return;

          }

          //TODO: add mini menu for replace, insert
          //trying to drag over a node that is already taken

          if(this.last_i.connector) {

              $t.to(this.hit_circle.node, .2, {
                  x: 0,
                  y: 0,
                  onUpdate : this.updateLine,
                  onUpdateScope : this,
                  ease: Circ.easeInOut
              });

              if(this.connector) this.data.node.removeOutput(this);

              this.enableConnectors();

              return;
          }

          if(this.cid !== this.last_i.cid) {

              this.trigger("update", this, this.last_n, this.last_i)
              //this.data.node.updateOutput(this, this.last_n, this.last_i);

          }

          this.drawLine();

        } else {

            $t.to(this.hit_circle.node, .2, {
                x: 0,
                y: 0,
                onUpdate : this.updateLine,
                onUpdateScope : this,
                ease: Circ.easeInOut
            });

            //TODO: remove Output?
            if(this.connector) this.data.node.removeOutput(this);

          this.enableConnectors();

        }

    },

    updateLine : function() {

        this.line.attr({
            x2: this.hit_circle.node._gsTransform.x,
            y2: this.hit_circle.node._gsTransform.y
        });

    },


    drawLine : function(force_input) {

        if(force_input !== undefined) {
            this.last_n = true;
            this.last_i = force_input;
        }

        if(this.last_n) {

            var n = $(this.last_i.group.node).closest(".node");
            var tn = $(this.group.node).closest(".node");
            var pu = $(this.group.node).parentsUntil(".node");

            var x = 0;
            var y = 0;

            var tx = 0;
            var ty = 0;

             for(var a = 0 ; a < pu.length ; a++) {

                 var p = pu[a];
                 if(p._gsTransform) {
                    tx += p._gsTransform.x;
                    ty += p._gsTransform.y;
                 }

                 //console.log(tx, "X");
                 //console.log(ty, "Y");

             }


            //console.log("y after : " , y);

             x = n[0]._gsTransform.x - tn[0]._gsTransform.x - tx;
             y = n[0]._gsTransform.y - tn[0]._gsTransform.y + this.last_i.group.node._gsTransform.y - 16;



            //TODO: update with .parentsUntil
           /* var x = this.last_n.group.node._gsTransform.x - this.data.node.group.node._gsTransform.x - this.group.node._gsTransform.x + this.last_i.group.node._gsTransform.x;
            var y = this.last_n.group.node._gsTransform.y - this.data.node.group.node._gsTransform.y - this.group.node._gsTransform.y + this.last_i.group.node._gsTransform.y;*/

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

    disableConnectors : function(hi) {

        hi.connector_point.attr({
            fill:"#333333"
        });


    },

    enableConnectors : function() {

        for(var a in this.disabled_connectors) {
            var hi = this.disabled_connectors[a];
            hi.connector_point.attr({
                fill: "#00ff00"
            })
        }

    },

    updateAllConnections : function() {

        this.drawLine();

        if(this.connector) this.connector.drawLine();

        //var i = this.data.node.inputs.connectors;
        //console.log(i);
        /*for(var a = 0 ; a < i.length ; a++) {

            var c = this.data.node.inputs.connectors[a];

            if(c.connector) {
                c.connector.drawLine();
            }

        }*/

    },

    render: function() {

    }

});