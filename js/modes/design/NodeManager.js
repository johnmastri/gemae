"use strict";

var $ = require('jquery');
var Backbone = require('backbone');

module.exports = Backbone.View.extend({

    initialize: function(ref){

        this.nodes = [];

       // this.load();

    },

    update : function(node) {

        console.log(node.local_id, " LOCAL ID");

        var r = this.find(node);
        if(r < 0) {
            this.nodes.push(node);
        }
        this.save(node);

        console.log(this.nodes);
    },


    find : function(node) {

        var node_num = this.nodes.findIndex(function(x) { return x.local_id === node.local_id});

        return node_num;

    },


    save : function(node) {

        var o = {};

        //TODO: create function within nodebase and options to pull updated info
        o.position = {
            x: node.group.node._gsTransform.x,
            y: node.group.node._gsTransform.y
        };
        o.type = node.data.data.type;
        o.name = node.data.data.entry.name;
        o.local_id = node.local_id;

        $.ajax({
            url : "http://localhost:3000/api/design/",
            type: "PUT",
            data : o,
            success: function(data, textStatus, jqXHR)
            {
                console.log("node saved");
                console.log(data, " < data");
            },
            //data - response from server

            error: function (jqXHR, textStatus, errorThrown)
            {
            }

        })

    },

    load : function() {

        $.ajax({
            url : "http://localhost:3000/api/design/",
            type: "GET",
            context: this,
            success: function(data, textStatus, jqXHR)
            {
                this.handleLoad(data);

            },
            //data - response from server
            error: function (jqXHR, textStatus, errorThrown)
            {
            }

        })

    },

    handleLoad : function(data) {

        console.log(data.length, " < DDDAAAATTTTAAAAAAA length");
        for(var a = 0 ; a < data.length ; a++) {
            var node = data[a];
            var type = node.type;
            var node_type = CM.node_types.findIndex(function(x) { return x.type === node.type});
            var n = CM.node_types[node_type];
            var node_entry = n.entries.findIndex(function(x) { return x.name === node.name});
            var ne = n.entries[node_entry];

            var nb = CM.designer.addNode({
                type : node.type,
                entry : ne,
                position: node.position,
                local_id : node.local_id
            }, false);

            this.nodes.push(nb);
        }

    },

/*    handleFind : function(node) {

        console.log(node, " <<<");
        return node.rand;

    },*/

    render: function() {

    }

});