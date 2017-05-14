"use strict";

var $ = require('jquery');
var Backbone = require('backbone');
var Connector = require("./Connector");
var Options = require("./Options");
var cryptoRandomString = require('crypto-random-string');

module.exports = Backbone.View.extend({

    initialize: function(obj) {

        this.data = obj;

        console.log(this.data, " DATA");

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

        this.rect = s.rect(0, 0, this.width, 23);
        this.rect.attr({
            fill: fill
        });

        console.log(this.data.data.option_values, " IS OPEN");

        this.options = new Options(this.data.data.entry.options);
        if(this.data.data.option_values) {
            if(this.data.data.option_values.isOpen) this.options.open();
        }

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

       this.createIO();


    },


    createIO : function() {

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

        $t.set(this.rect.node, {
           height: 22 + (11 * this.inputs.length)
        });

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

    },

    updateOutput : function(output, input, connector) {

        var nc = new Connector({
            type:"input",
            node: this
        });

        //nc.outputs.push(connector);
        input.inputs.push(nc);

        $t.set(nc.group.node, {
            y:  33/2 + ((input.inputs.length-1) * 26)//(input.inputs.length < 3) ? 33/2 + (14 * input.inputs.length) : 33/2 + (22 * input.inputs.length)
        });

        $t.to(input.rect.node, .15, {
            height: (input.inputs.length < 3) ? 33 + ((input.inputs.length-1) * 10) : 18 + ((input.inputs.length-1) * 26)
        });



        input.group.add(nc.group);
        //this.last_n.input_connections.push(this.data.node);
        //console.log(this.last_n, " LENGHT OF IMNPUT CONECT")
        //this.data.node.



    },


    handleOptions : function() {


        if(!this.options.isOpen) {
            this.options.open();
        } else {
            this.options.close();
        }

    },


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

        CM.designer.node_manager.update(this);

        $t.set(this.tf, {
           // autoAlpha:1
        });
    },

    handleGroupDrag: function(event) {

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

    },


    render: function() {

    }

});