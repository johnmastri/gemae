"use strict";

var $ = require('jquery');
var Backbone = require('backbone');
var Connector = require("./connectors/Connector");
var ConnectorArray = require("./connectors/ConnectorArray");
var Options = require("./Options");
var cryptoRandomString = require('crypto-random-string');

//module.exports = Backbone.View.extend({

var NodeBaseProto = {

    initialize: function (obj) {

        this.data = obj;

        console.log(this.data, " DATA");

        this.width = 200;

        this.local_id = obj.local_id || cryptoRandomString(10);

        this.output_connections = [];
        this.input_connections = [];

        this.obj = {};

        this.group = s.group();

        this.group.addClass("node");

        var fill;
        var accent;

        switch (this.data.data.type) {

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

        this.options = new Options(this.data.data.entry.options);
        if (this.data.data.option_values) {
            if (this.data.data.option_values.isOpen) this.options.open();
        }

        $t.set([this.options.top_rect.node, this.options.rect.node, this.options.mask.node], {
            width: this.width
        });

        this.options.top_rect.attr({
            fill: accent
        });


        this.label_rect = s.rect(0, 0, 17, 17);
        this.label_rect.attr({
            fill: accent
        });
        $t.set(this.label_rect.node, {
            x: 20,
            y: (33 - 17) / 2
        });

        this.label = s.text(0, 0, this.data.data.entry.label);
        this.label.attr({
            fill: "white",
            fontSize: 10
        });
        $t.set(this.label.node, {
            x: 22,
            y: 20
        });

        this.title = s.text(0, 15, this.data.data.entry.name);
        this.title.attr({"contentEditable": "true"});
        $(this.title.node).css(
            {
                "pointer-events": "auto"
            }
        );
        $t.set(this.title.node, {
            x: 20 + 17 + 10,
            y: (33 - 15) / 2 - 2
        });

        this.tf = MASTRI.add("input", {
            position: "absolute",
            backgroundColor: "transparent",
            border: "0px none transparent",
            color: "white",
            outline: "none",
            width: 60,
            autoAlpha: 0
            //letterSpacing: ".08em"
        });

        this.tf.attr({
            value: this.data.data.entry.name
        });

        this.options_btn = s.rect(0, 0, 10, 10);
        this.options_btn.attr({
            fill: "white"
        });
        $t.set(this.options_btn.node, {
            x: this.width - 35,
            y: (33 - 10) / 2,
            pointerEvents: "auto",
            cursor: "pointer"
        });
        $(this.options_btn.node).on("click", $.proxy(this.handleOptions, this));
        $(this.options.top_rect.node).on("dblclick", $.proxy(this.handleOptions, this));

        $b.append(this.tf);

        $t.set(this.group.node, this.data.position);
        $t.set(this.tf, {
            x: this.data.position.css.x + 20 + 17 + 10,
            y: this.data.position.css.y + (33 - 15) / 2 - 2
        });

        this.group.add(this.options.group, this.rect, this.label_rect, this.label, this.title, this.options_btn);

        console.log(this.data.data.type, ' TYOPE")');

        // adds node type to structure manager
        if (this.data.data.type === "structure") {
            CM.sm.add(this);


        }

        $(this.group.node).on("mousedown", $.proxy(this.mouseDown, this));

        Draggable.create(this.group.node, {
            type: "x,y",
            edgeResistance: 0.65,
            trigger: this.options.top_rect.node,
            onDrag: this.handleGroupDrag,
            onDragScope: this,
            onDragStart: this.handleDragStart,
            onDragStartScope: this,
            onDragEnd: this.handleDragComplete,
            onDragEndScope: this
            //bounds:s.node,
            //throwProps:true
        });

        this.createIO();


    },


    createIO: function () {

        console.log("CREATE IO");

        //todo: will be defined by node type
        //this.inputs = [];
        //this.outputs = [];

        //TODO: determine if necessarily to keep connectors in their own class.. probably so... but fuck...

        this.inputs = new ConnectorArray({
            type: "input",
            node: this
        });
        this.group.add(this.inputs.group);

        this.outputs = new ConnectorArray({
            type: "output",
            node: this
        });

        this.group.add(this.outputs.group);


        this.inputs.add();
        this.outputs.add();

        /*this.inputs.push(new Connector({
            type: "input",
            node: this
        }));

        for (var a = 0; a < this.inputs.length; a++) {

            var i = this.inputs[a];
            $t.set(i.group.node, {
                x: 0,
                y: 33 / 2
            });
            this.group.add(i.group);

        }

        $t.set(this.rect.node, {
            height: 22 + (11 * this.inputs.length)
        });

        this.outputs.push(new Connector({
            type: "output",
            node: this
        }));

        for (a = 0; a < this.outputs.length; a++) {

            i = this.outputs[a];
            $t.set(i.group.node, {
                x: this.width,
                y: 33 / 2
            });
            this.group.add(i.group);

        }*/

    },

    //               the output connector  the node  the input connector
    updateStructure: function () {

        var obj = {};
        obj.name = "Structure";
        obj.type = "structure";
        obj.content = {};

        for(var a = 0 ; a < this.inputs.connectors.length ; a++) {

            var c = this.inputs.connectors[a];
            var cc = c.connector || null;
            var cp = (cc) ? cc.parentNode : null;

            if(cp) {

                var name = cp.data.data.entry.name;

                if(this.obj.hasOwnProperty("content")) {
                    var s = this.checkUniqueName(name);
                    //TODO: shouldn't allow you to move forward without a unique name
                    console.log("NEEDS UNIQUE NAME " , s);
                    if(s === false) return;
                }

                obj.content[name + Math.round(Math.random()*10000)] = {
                    name : name,
                    type : cp.data.data.type,
                    value : "value goes here",
                    //TODO: for form builder - will not show in endpoint api
                    options : {
                        required: true
                    }
                }

            }

        }

        console.log("data type ", obj);

        this.obj = obj;

        CM.so.update(obj);
        CM.designer.node_manager.update(this);


    },

    checkUniqueName : function(name) {
      for(var a in this.obj.content) {
        if(a === name) return false;
      }
    },

    removeOutput: function (output_connector) {

        var i = output_connector.connector;

        //remove from dom
        i.group.remove();

        var n = i.data.node;
        var f = n.inputs.findIndex(function (x) {
            return i.cid === x.cid
        });

        n.inputs.splice(f, 1);

        for (var a = f; a < n.inputs.length; a++) {

            var is = n.inputs[a];
            $t.to(is.group.node, .25, {
                y: 33 / 2 + ((a) * 24),//(input.inputs.length < 3) ? 33/2 + (14 * input.inputs.length) : 33/2 + (22 * input.inputs.length)
                ease: Back.easeInOut,
                onUpdate: is.data.node.updateLines,
                onUpdateScope: is.data.node
            });

        }

        $t.to(n.rect.node, .15, {
            height: (n.inputs.length < 3) ? 33 + ((n.inputs.length - 1) * 10) : 18 + ((n.inputs.length - 1) * 24)
        });

        //clear backbone data
        i.remove();

        output_connector.connector = null;
        output_connector.last_n = null;
        output_connector.last_i = null;


    },

    handleOptions: function () {


        if (!this.options.isOpen) {
            this.options.open();
        } else {
            this.options.close();
        }

    },


    handleDragStart: function () {

        event.preventDefault();
        event.stopImmediatePropagation();

        CM.designer.workspace.add(this.group);

        $t.set(this.tf, {
            autoAlpha: 0
        });
    },

    handleDragComplete: function () {

        CM.designer.node_manager.update(this);

        $t.set(this.tf, {
            // autoAlpha:1
        });
    },

    handleGroupDrag: function (event) {

        this.updateLines();

        $t.set(this.tf, {
            x: MASTRI.x($(this.group.node)) + MASTRI.x($(this.title.node)),
            y: MASTRI.y($(this.group.node)) + MASTRI.y($(this.title.node))
        });

    },

    updateLines: function () {

        this.inputs.updateAllConnections();
        this.outputs.updateAllConnections();

        /*for (var a = 0; a < this.inputs.length; a++) {

            this.inputs[a].update();

        }

        for (var a = 0; a < this.outputs.length; a++) {

            this.outputs[a].drawLine();

        }*/



    },

    render: function () {

    }

//});

};

var NodeBase = Backbone.View.extend( NodeBaseProto );
NodeBase.proto = NodeBaseProto;

module.exports = NodeBase;
