"use strict";

var $ = require('jquery');
var Backbone = require('backbone');
var MenuList = require("./MenuList");

module.exports = Backbone.View.extend({

    initialize: function(){

        this.menu = [
            {
              name : "Fields",
              type: "field",
              entries: [
                  {name: "Text"},
                  {name: "Number"},
                  {name: "Color"},
                  {name: "Image"}
                ]
            },{
                name : "Structures",
                type: "structure",
                entries : [
                    {name : "Structure"},
                    {name : "Group"},
                    {name : "Populate Group"}
                ]
            },{
                name : "Endpoints",
                type: "endpoint",
                entries: [
                    {name : "Endpoint"},
                    {name : "Filter"}
                ]
            }

        ];

        this.menu_lists = [];

        this.group = s.group();

        for(var a = 0 ; a < this.menu.length ; a++) {

            var ml = new MenuList(this.menu[a]);
            $t.set(ml.group.node, {
                x: a * 202
            });

            this.group.add(ml.group);

            this.menu_lists.push(ml);

        }

        console.log($b.height());

        //this.render();

        this.close_btn = s.rect(0,0,30,30);
        $t.set(this.close_btn.node, {
           x: $(this.group.node).width() - $(this.close_btn.node).width() - 1,
            y: -34,
            pointerEvents:"auto",
            cursor:"pointer"
        });
        $(this.close_btn.node).on("click", $.proxy(this.handleClose, this));
        this.group.add(this.close_btn);

    },

    handleClose : function() {

       this.close();

    },

    close : function() {

        $t.to(this.group.node, .2, {
            autoAlpha: 0
        })

    },

    render: function() {


        MASTRI.centerXY($(this.group.node), $b);

    }

});