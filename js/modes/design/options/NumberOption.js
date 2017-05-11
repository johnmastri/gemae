"use strict";

var $ = require('jquery');
var Backbone = require('backbone');

module.exports = Backbone.View.extend({

    initialize: function(obj) {

        this.data = obj;
        this.isOpen = false;
        this.parent = null;

        this.group = s.group();
        this.group.attr({
            width: 200
        });

        this.rect = s.rect(0,0,60,20);
        this.rect.attr({
            fill: "#EEEEEE"
        });
        $t.set(this.rect.node, {
            /*x:200-30-5,
            y:-22*/
        });

        this.text = s.text($(this.rect.node).width()/2,15,"0");
        this.text.attr({
            "text-anchor":"middle",
            //"alignment-baseline" : "central"
        });
        $t.set(this.text.node, {
            fontSize: 11,
            color:"#727275"
        });

        this.group.add(this.rect, this.text);


    },

    render: function() {

    }

});