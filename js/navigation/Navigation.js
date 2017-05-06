"use strict";

var $ = require('jquery');
var Backbone = require('backbone');

module.exports = Backbone.View.extend({

    initialize: function() {

        console.log("navigation init");

        this.sections = [
            {
                label: "design",
                mode: CM.design_mode
            },
            {
                label: "populate",
                mode: CM.populate_mode
            },
            {
                label: "generate",
                mode: CM.generate_mode
            }
        ];

        this.group = s.group();

        for(var a = 0 ; a < this.sections.length ; a++) {

            //this.bg = s.rect(0,0,150,20).attr("fill", "#FFFFFF");
            var title = s.text(0,15,this.sections[a].label);
            var $title = $(title.node);
            $title.data({
                num: a
            });
            $t.set($title, {
                x: a * 100,
                pointerEvents: "auto",
                cursor:"pointer"
            });
            $title.on("click", $.proxy(this.handleClick, this));
            this.group.add(title);


            /*$t.set(this.group.node, {
                x: 200
            })*/
            //this.group.add(this.bg, this.title);

        }

    },

    handleClick : function(event) {

        var n = $(event.currentTarget).data().num;
        var mode =  this.sections[n].mode;
        //mode.group.appendTo(CM.mode_group);
        CM.mode_group.append(mode.group);


    },

    render: function() {

    }

});