"use strict";

var $ = require('jquery');
var Backbone = require('backbone');
var Connector = require("./Connector");
var Options = require("./Options");
var cryptoRandomString = require('crypto-random-string');

module.exports = Backbone.View.extend({

    initialize: function(obj){

        this.data = obj;

        this.width = 200;

        this.local_id = obj.local_id || cryptoRandomString(10);
        console.log(this.local_id, " ID!");

        this.output_connections = [];
        this.input_connections = [];

        this.group = s.group();

        this.group.addClass("node");

        var fill;
        var accent;

        switch(this.data.data.type) {

            case "field":
                fill = "#F25F5C";
                accent = "#DE3E1C";
                break;

            case "structure":
                fill = "#46494C";
                accent = "#35383B";
                break;

            case "endpoint":
                fill = "#8B9DB1";
                accent = "#6D849D";
                break;
        }


        this.rect = s.rect(0, 0, this.width, 33);
        this.rect.attr({
            fill: fill
        });

/*        this.top_rect = s.rect(0,0,150, 5);
        this.top_rect.attr({
            fill: accent
        });
        $t.set(this.top_rect.node, {
            y: -6
        });*/

        this.options = new Options(this.data.data.entry.options);

        $t.set([this.options.top_rect.node, this.options.rect.node, this.options.mask.node], {
            width: this.width
        });

        this.options.top_rect.attr({
            fill: accent
        });

        this.label_rect = s.rect(0,0,17,17);
        this.label_rect.attr({
            fill: accent
        });
        $t.set(this.label_rect.node, {
           x: 20,
           y: (33-17)/2
        });

        this.label = s.text(0,0,this.data.data.entry.label);
        this.label.attr({
            fill: "white",
            fontSize: 10
        });
        $t.set(this.label.node, {
            x: 22,
            y: 20
        });

        this.title = s.text(0,15,this.data.data.entry.name);
        this.title.attr({"contentEditable" : "true"});
        $(this.title.node).css(
            {
                "pointer-events" : "auto"
            }
        );
        $t.set(this.title.node, {
            x: 20+17+10,
            y: (33-15)/2 - 2
        });

        this.tf = MASTRI.add("input", {
            position:"absolute",
            backgroundColor:"transparent",
            border:"0px none transparent",
            color:"white",
            outline:"none",
            width: 60,
            autoAlpha:0
            //letterSpacing: ".08em"
        });

        this.tf.attr({
            value:this.data.data.entry.name
        });

        this.options_btn = s.rect(0,0,10,10);
        this.options_btn.attr({
            fill:"white"
        });
        $t.set(this.options_btn.node, {
            x: this.width - 35,
            y: (33-10)/2,
            pointerEvents:"auto",
            cursor:"pointer"
        });
        $(this.options_btn.node).on("click", $.proxy(this.handleOptions, this));
        $(this.options.top_rect.node).on("dblclick", $.proxy(this.handleOptions, this));

        $b.append(this.tf);

        $t.set(this.group.node, this.data.position);
        $t.set(this.tf, {
            x: this.data.position.css.x + 20+17+10,
            y: this.data.position.css.y + (33-15)/2 - 2
        });

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

        this.group.add(this.options.group, this.rect, this.label_rect, this.label, this.title, this.options_btn);

        // adds node type to structure manager
        if(this.data.type === "structure") {
            CM.sm.add(this);
        }

        $(this.group.node).on("mousedown", $.proxy(this.mouseDown, this));

       Draggable.create(this.group.node, {
            type:"x,y",
            edgeResistance:0.65,
            trigger:this.options.top_rect.node,
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
                x: 0,
                y:33/2
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
                x: this.width,
                y:33/2
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

    handleOptions : function() {


        if(!this.options.isOpen) {
            this.options.open();
        } else {
            this.options.close();
        }

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

       //this.options.open();


        event.preventDefault();
        event.stopImmediatePropagation();

       CM.designer.workspace.add(this.group);

        $t.set(this.tf, {
            autoAlpha:0
        });
    },

    handleDragComplete : function() {

        console.log("MOUSE DOWN");

        CM.designer.node_manager.update(this);

        /* $t.set(this.title.node, {
         autoAlpha:1
         });*/

        $t.set(this.tf, {
           // autoAlpha:1
        });
    },

    handleGroupDrag: function(event) {

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
            x: MASTRI.x($(this.group.node)) + MASTRI.x($(this.title.node)),
            y: MASTRI.y($(this.group.node)) + MASTRI.y($(this.title.node))
        });
     /*   $t.set(this.tf, {
            x: this.data.position.x + MASTRI.x(this.title.node),
            y: this.data.position.y + MASTRI.y(this.title.node)
        });*/

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