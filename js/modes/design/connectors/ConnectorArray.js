"use strict";

var $ = require('jquery');
var Backbone = require('backbone');
var Connector = require("./Connector");
var _ = require("underscore");


module.exports = Backbone.View.extend({

    initialize: function(obj){

        this.data = obj || null;
        this.type = obj.type || null; //input or output
        this.node = obj.node || null;
        this.connectors = [];
        this.length = this.connectors.length;

        this.group = s.group();

        if(this.type === "output") {
            $t.set(this.group.node, {
                x: this.node.width
            })
        }

        _.extend(this, Backbone.Events);

    },

    add : function() {

        var nc = new Connector({
            type: this.type,
            parentNode: this.node,
            node: this
        });

        nc.on("whatever", $.proxy(this.update, this));

        this.connectors.push(nc);

        $t.set(nc.group.node, {
            x:0,
            y: 33 / 2 + ((this.connectors.length - 1) * 24)//(input.inputs.length < 3) ? 33/2 + (14 * input.inputs.length) : 33/2 + (22 * input.inputs.length)
        });

        $t.to(this.node.rect.node, .15, {
            height: (this.connectors.length < 3) ? 33 + ((this.connectors.length - 1) * 10) : 18 + ((this.connectors.length - 1) * 24)
        });

        this.group.add(nc.group);

        console.log("CALLED 3x");

        this.node.updateStructure();

        return nc;

    },

    update : function(output_connector, input, input_connector) {

        //create one-to-one relationship of connectors;
        output_connector.connector = input_connector;
        input_connector.connector = output_connector;

        //creates a new input
        input.inputs.add();

    },

    updateAllConnections : function() {

        for (var a = 0; a < this.connectors.length; a++) {

            this.connectors[a].updateAllConnections();

        }
    },


    remove : function() {


    },

    render: function() {

    }

});