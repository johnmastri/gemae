"use strict";

var $ = require('jquery');
var Backbone = require('backbone');

module.exports = Backbone.View.extend({

    initialize: function(obj) {

        this.data = obj;
        this.isTrue = true;
        this.parent = null;

        this.group = s.group();
        this.group.attr({
            width: 40
        });

        this.rect = s.rect(0,0,40,5);
        this.rect.attr({
            fill:"#BDBDBF"
        });
        $t.set(this.rect.node, {
            cursor:"pointer"
        })

        this.toggle = s.rect(0,0,20,5).attr({
            fill:"#949497"
        });
        $t.set(this.toggle.node, {
           pointerEvents:"none"
        });

        $t.set([this.rect.node, this.toggle.node], {
           y:  (21-5)/2
        });

        this.group.add(this.rect, this.toggle);

        $(this.rect.node).on("click", $.proxy(this.handleToggle, this));


    },

    handleToggle : function() {

        $t.to(this.toggle.node, .25, {
           x: (this.isTrue) ? 20 : 0
        });

        this.isTrue = !this.isTrue;


    },

    render: function() {

    }

});