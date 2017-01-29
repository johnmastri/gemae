"use strict";

var $ = require('jquery');
var Backbone = require('backbone');
var Connector = require("./Connector");

module.exports = Backbone.View.extend({

    initialize: function(obj){

        this.data = obj;

        this.id = Math.round(Math.random() * 10000);

        this.output_connections = [];
        this.input_connections = [];

        console.log(this.data.type, " TYPE");

        this.group = s.group();

        var fill;

        switch(this.data.type) {

            case "field":
                fill = "#bada55";
                break;

            case "structure":
                fill = "#FF00FF";
                break;

            case "endpoint":
                fill = "#a2a2a2";
                break;
        }

        this.circle = s.circle(0, 0, 10);
        this.circle.attr({
            fill: fill,
            stroke: "#000",
            strokeWidth: 5
        });

        this.group.add(this.circle);

        // adds node type to structure manager
        if(this.data.type === "structure") {
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

        //todo: will be defined by node type
        this.inputs = [];
        this.outputs = [];

        this.inputs.push(new Connector({
            type:"input",
            node: this
        }));

        for(var a = 0 ; a < this.inputs.length ; a++) {

            var i = this.inputs[a];
            $t.set(i.group.node, {
                x: -25
            });
            this.group.add(i.group);

        }

        this.outputs.push(new Connector({
            type:"output",
            node: this
        }));

        for(a = 0 ; a < this.outputs.length ; a++) {

            i = this.outputs[a];
            $t.set(i.group.node, {
                x: 25
            });
            this.group.add(i.group);

        }


            //
/*
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
        this.group.add(this.circle, this.hit_circle, this.mini_circle, this.mini_circle_l, this.line);*/


    },

    /*handleMouseDown : function(event) {

        //$(s.node).on("mousemove", $.proxy(this.handleMouseMove, this));
        //$(s.node).on("mouseup", $.proxy(this.handleMouseUp, this));

        //var x = event.target.parentElement._gsTransform.x + event.target._gsTransform.x;

        var x = event.target._gsTransform.x
        var y = event.target._gsTransform.y;

        this.start_x = event.clientX - x;
        this.start_y = event.clientY - y;
        /!*$t.set(this.line.node, {
            x:
        });*!/


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

       /!* var x = this.last_n.group.node._gsTransform.x - this.group.node._gsTransform.x - 20;
        var y = this.last_n.group.node._gsTransform.y - this.group.node._gsTransform.y + 2.5;


        $t.set(this.hit_circle.node, {
            x: x,
            y: y
        });

        this.line.attr({
            x2: x,
            y2: y
        });*!/

        if(this.last_n) {

            this.drawLine();

            this.connections.push(this.last_n);
            this.last_n.connectors.push(this);

            //this.last_n.last_n = this;
        }

    },*/

    handleGroupDrag: function() {

/*        if(this.connections.length > 0) {

                this.drawLine();

        }

        for(var a = 0 ; a < this.connectors.length ; a++) {

            this.connectors[a].drawLine();

        }*/

        for(var a = 0 ; a < this.inputs.length ; a++) {

            this.inputs[a].update();

        }

        for(a = 0 ; a < this.outputs.length ; a++) {

            this.outputs[a].update();

        }

        /*for(var a = 0 ; a < this.connections.length ; a++) {

            //this.handleDragEnd();

        }*/

    },

   /* drawLine : function() {

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

    },*/

    render: function() {

    }

});