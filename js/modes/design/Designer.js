"use strict";

var $ = require('jquery');
var Backbone = require('backbone');
var NodeBase = require("./NodeBase");
var NodeMenu = require("./menu/NodeMenu");
var NodeManager = require("./NodeManager");

module.exports = Backbone.View.extend({

    initialize: function(ref){

        this.nodes = [];

        //this.types = ["structure", "field"];

        this.node_count = 0;

        this.workspace = s.group();

        this.workspace.appendTo(ref.designer_holder);

        for(var a = 0 ; a < 10 ; a++) {

                /*var r = Math.round( (this.types.length-1) * Math.random() );
                console.log(r, " R");

                var node_base = new NodeBase({
                    num: this.node_count,
                    type: this.types[r]
                });


                $t.set(node_base.group.node, {
                    x: (this.node_count * 100),
                    y: Math.random() * 200
                });

                this.nodes.push(node_base);
                this.workspace.add(node_base.group);

                this.node_count++;*/

            }

        this.rect = s.rect(0,0,$w.width(),$w.height()).attr({fill:"rgba(0,0,0,0)"});
        this.workspace.add(this.rect);

/*        $t.set(this.workspace.node, {
            //x: 200
            width:"100%",
            height:"100%",
            backgroundColor:"red"
        });*/

        $t.set(this.workspace.node, {
            //x: 200
        });

        this.node_menu = new NodeMenu();
        this.node_manager = new NodeManager();
       //console.log(this.node_menu.group, " NODE MENU GROUP");
        ref.group.add(this.node_menu.group);

        $w.on("resize", $.proxy(this.render, this));

        this.render();
    },

    addNode : function(data, noUpdate) {

        if(noUpdate === undefined) noUpdate = true;

        console.log(data, " DATA");
        console.log(data.position, " POSITION");

        var node_base = new NodeBase({
            num: this.node_count,
            data: data,
            local_id : (data.local_id) ? data.local_id : null,
            position: {
                x: (data.position) ? data.position.x : $w.width()/2 - (150/2),//Math.random() * $w.width(),
                y: (data.position) ? data.position.y : $w.height()/3 - (33/2)//Math.random() * 200
            }
        });

/*        $t.set(node_base.group.node, {

        });*/

        this.nodes.push(node_base);
        this.workspace.add(node_base.group);

        if(noUpdate) this.node_manager.update(node_base);

        this.node_count++;

        return node_base;

        //this.node_menu.close();

    },

    render: function() {

        s.attr({
            width: $w.width(),
            height: $w.height()
        });

        this.node_menu.render();
    }

});