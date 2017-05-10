"use strict";

var $ = require('jquery');
var Backbone = require('backbone');

module.exports = Backbone.View.extend({

    initialize: function(obj) {

        this.data = obj;
        this.isOpen = false;

        this.group = s.group();
        this.group.attr({
            width: 200
        });

        this.rect = s.rect(0,0,30,22);
        this.rect.attr({
            fill: "#fff"
        });
        $t.set(this.rect.node, {
            /*x:200-30-5,
            y:-22*/
        });

        this.text = s.text(15,15,"0");
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