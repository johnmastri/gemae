"use strict";

var $ = require('jquery');
var Backbone = require('backbone');

module.exports = Backbone.View.extend({

    initialize: function(obj){

        this.data = obj;

        this.group = s.group();

        this.bg = s.rect(0,0,150,20).attr("fill", "#FFFFFF");

        this.title = s.text(0,15,obj.entry.name);

        this.group.add(this.bg, this.title);

        this.$group = $(this.group.node);
        $t.set(this.bg.node, {
            pointerEvents:"auto",
            cursor:"pointer"
        });
        this.$group.on("click", $.proxy(this.handleClick, this));

    },

    handleClick : function(event) {

        console.log("CLICK");
        CM.designer.addNode(this);

    },

    render: function() {


    }

});