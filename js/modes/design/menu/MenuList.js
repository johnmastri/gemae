"use strict";

var $ = require('jquery');
var Backbone = require('backbone');
var MenuListItem = require("./MenuListItem");

module.exports = Backbone.View.extend({

    initialize: function(obj){

       this.data = obj;

       this.group = s.group();

       this.bg = s.rect(0,0,200,100).attr("fill", "#666666");

       this.group.add(this.bg);

        for(var a = 0 ; a < this.data.entries.length ; a++) {
            var mli = new MenuListItem(
                {
                    type: this.data.type,
                    entry:this.data.entries[a]
                });
            $t.set(mli.group.node, {
                y: a * 25
            });
            this.group.add(mli.group);
        }

    },

    render: function() {


    }

});