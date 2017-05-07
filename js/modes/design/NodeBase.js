"use strict";

var $ = require('jquery');
var Backbone = require('backbone');
var Connector = require("./Connector");

module.exports = Backbone.View.extend({

    initialize: function(obj){

            this.data = obj;

        console.log(this.data.type, " TYPE");

        this.group = s.group();

      /* $(this.group.node).attr({
         "contentEditable":"true"
         });*/


        /*$t.set(this.group.node, {
            x: (this.data.num * 100),
            y: Math.random() * 200
        });*/

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

       /* this.circle = s.circle(0, 0, 10);
        this.circle.attr({
            fill: fill,
            stroke: "#000",
            strokeWidth: 5
        });*/

        this.rect = s.rect(0, 0, 100, 33);
        this.rect.attr({
            fill: fill,
            stroke: "#000",
            strokeWidth: 0
        });

        this.title = s.text(0,15,"TEST");
        this.title.attr({"contentEditable" : "true"});
        $(this.title.node).css(
            {
                "pointer-events" : "auto"
            }
        );

        //$($b).on("keyup", function() { console.log("HELLLLLO") });

        this.tf = MASTRI.add("input", {
            position:"absolute",
            backgroundColor:"transparent",
            border:"0px none transparent",
            color:"white",
            outline:"none",
            width:100
            //letterSpacing: ".08em"
        });

        this.tf.attr({
            value:"TEST"
        });

        $b.append(this.tf);

        //window.tf = this.tf;

        console.log(this.data.position);

        $t.set(this.group.node, this.data.position);
        $t.set(this.tf, this.data.position);

       /*
       *
        There is an interesting SVG node called foreignObject, which allows you to place HTML, flash, etc within your SVG code. Try the following:

        <svg width="100%" height="500">
        <foreignObject x="10" y="10" width="100" height="150">
        <div xmlns="http://www.w3.org/1999/xhtml">
        <input></input>
        </div>
        </foreignObject>
        </svg>
       * */

       //this.fo = $(document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject'));

           /*MASTRI.add("foreignObject", {
           position:"relative",
           backgroundColor:"blue"
       });

*/

           /*

      $t.set(this.fo, {
          pointerEvents:"auto",
      });

       this.fo.attr({
           width:"100",
           height:"100"
       });

       this.fo_div = MASTRI.add("div", {
       });
       this.fo_div.attr({"xmlns":"http://www.w3.org/1999/xhtml"});
       this.input = MASTRI.add("input", {
       });

       this.input.attr({
           value: "FUCK"
       });

       this.fo.append(this.fo_div);
       this.fo_div.append(this.input);

        var tc = '<foreignObject x="10" y="10" width="100" height="150"><div xmlns="http://www.w3.org/1999/xhtml"><input></input></div></foreignObject>';
        console.log(tc);

        this.group.add(this.rect);//, title);

        $(this.group.node).append(this.fo);

        */


        this.group.add(this.rect, this.title);

        // adds node type to structure manager
        if(this.data.type == "structure") {
            CM.sm.add(this);
        }

        $(this.group.node).on("mousedown", $.proxy(this.mouseDown, this));

       Draggable.create(this.group.node, {
            type:"x,y",
            edgeResistance:0.65,
            trigger:this.rect.node,
            onDrag : this.handleGroupDrag,
            onDragScope: this,
            onDragStart: this.handleDragStart,
            onDragStartScope : this,
            onDragEnd: this.handleDragComplete,
            onDragEndScope : this
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
                x: 0
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
                x: 100 + 25
            });
            this.group.add(i.group);

        }

        this.output_connections = [];
        this.input_connections = [];

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

    handleDragStart : function() {

        console.log("MOUSE DOWN");

       /* $t.set(this.title.node, {
            autoAlpha:1
        });*/

       CM.design_mode.group.add(this.group);

        $t.set(this.tf, {
            autoAlpha:0
        });
    },

    handleDragComplete : function() {

        console.log("MOUSE DOWN");

        /* $t.set(this.title.node, {
         autoAlpha:1
         });*/

        $t.set(this.tf, {
            autoAlpha:1
        });
    },

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

        $t.set(this.tf, {
            x: MASTRI.x($(this.group.node)) + 0 + 0,
            y: MASTRI.y($(this.group.node)) + 0
        });


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