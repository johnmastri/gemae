"use strict";

var $ = require('jquery');
var Backbone = require('backbone');

module.exports = Backbone.View.extend({

    initialize: function(obj){

            this.data = obj;

        console.log(this.data.type, " TYPE");

            this.group = s.group();
            /*$t.set(this.group.node, {
                x: (this.data.num * 100),
                y: Math.random() * 200
            });*/


            this.circle = s.circle(0, 0, 10);
            this.circle.attr({
                fill: (this.data.type == "structure") ? "#bada55" : "#FF00FF",
                stroke: "#000",
                strokeWidth: 5
            });

        if(this.data.type == "structure") {
            CM.sm.add(this);
        }


            Draggable.create(this.group.node, {
                type:"x,y",
                edgeResistance:0.65,
                trigger:this.circle.node,
                onDrag : this.handleGroupDrag,
                onDragScope: this
                //bounds:s.node,
                //throwProps:true
            });

            //

            this.hit_circle = s.circle(0,0,10).attr("fill", "#ff0000");

            $t.set(this.hit_circle.node, {
                x: 20,
                y: 2.5,
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

            this.mini_circle = s.circle(0,0,5).attr("data-num", this.data.num);

            $t.set(this.mini_circle.node, {
                x: 20,
                y: 2.5,
                //cursor:"pointer",
                pointerEvents:"none",
                //autoAlpha:0
            });

        this.mini_circle_l = s.circle(0,0,5).attr({
            "data-num": this.data.num,
            fill:"#333"
        });

        $t.set(this.mini_circle_l.node, {
            x: -20,
            y: 2.5,
            cursor:"pointer",
            pointerEvents:"none"
        });


        this.line = s.line(20,2.5,20,2.5).attr({strokeWidth:5,stroke:"black",strokeLinecap:"round", pointerEvents:"none"});
        //this.mini_circle.mousedown($.proxy(this.handleMouseDown, this));
        //$(this.mini_circle).on("mousedown", $.proxy(this.handleMouseDown, this));
        this.group.add(this.circle, this.hit_circle, this.mini_circle, this.mini_circle_l, this.line);

        this.connections = [];
        this.connectors = [];

    },

    handleMouseDown : function(event) {

        //$(s.node).on("mousemove", $.proxy(this.handleMouseMove, this));
        //$(s.node).on("mouseup", $.proxy(this.handleMouseUp, this));

        //var x = event.target.parentElement._gsTransform.x + event.target._gsTransform.x;

        var x = event.target._gsTransform.x
        var y = event.target._gsTransform.y;

        this.start_x = event.clientX - x;
        this.start_y = event.clientY - y;
        /*$t.set(this.line.node, {
            x:
        });*/


    },

    handleMouseMove : function(event) {

        var x2 = event.clientX - this.start_x || 0;
        var y2 = event.clientY - this.start_y || 0;

        this.line.attr({
            x2: x2,
            y2: y2
        })

    },

    handleMouseUp : function(event) {

        $(s.node).off("mousemove", $.proxy(this.handleMouseMove, this));

    },

    handleDragStart : function(event) {

        event.stopImmediatePropagation();
        this.handleMouseDown(event);

    },

    handleDrag : function(event) {

        event.stopImmediatePropagation();
        this.handleMouseMove(event);

        for(var a = 0 ; a < CM.designer.nodes.length ; a++) {

            var n = CM.designer.nodes[a];
            if( Draggable.hitTest(this.hit_circle.node, n.mini_circle_l.node) && n != this ) {
                this.last_n = n;//.mini_circle_l.node;
                return;
            } else {
                this.last_n = null;
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

            this.connections.push(this.last_n);
            this.last_n.connectors.push(this);

            //this.last_n.last_n = this;
        }

    },

    handleGroupDrag: function() {

        if(this.connections.length > 0) {

                this.drawLine();

        }

        for(var a = 0 ; a < this.connectors.length ; a++) {

            this.connectors[a].drawLine();

        }

        /*for(var a = 0 ; a < this.connections.length ; a++) {

            //this.handleDragEnd();

        }*/

    },

    drawLine : function() {

        var x = this.last_n.group.node._gsTransform.x - this.group.node._gsTransform.x - 20;
        var y = this.last_n.group.node._gsTransform.y - this.group.node._gsTransform.y + 2.5;


        $t.set(this.hit_circle.node, {
            x: x,
            y: y
        });

        this.line.attr({
            x2: x,
            y2: y
        });

    },

    render: function() {

    }

});