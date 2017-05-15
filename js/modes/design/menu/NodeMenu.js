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
                  {
                   name: "Text",
                   label:"TX",
                   options: [
                       {
                           label: "Min Characters",
                           type: "Number",
                           defaultValue: 0
                       },
                       {
                           label: "Max Characters",
                           type: "Number",
                           defaultValue: 1000
                       },
                       {
                           label: "HTML?",
                           type: "Boolean",
                           defaultValue: "false"
                       }
                       ,
                       //may move to number - but leaving for testing
                       {
                           label:"Format",
                           type: "Dropdown",
                           values: ["None","Phone","Currency","Other"],
                           defaultValue: 0
                       }

                   ]},
                  {
                      name: "Number",
                      label:"NU",
                      options: [
                          {
                              label:"Type",
                              type:"Dropdown",
                              values: ["Positive","Pos or Neg", "Negative", "Whole", "Decimal"],
                              defaultValue:0
                          },
                          {
                              label:"Decimal Places",
                              type:"Number",
                              defaultValue:2
                          },{
                              label:"Format",
                              type: "Dropdown",
                              values: ["None","Phone","Currency","Other"],
                              defaultValue: 0
                          }

                          /*add regex for "Other" */

                      ]
                  },
                  {
                      name: "Color",
                      label:"CO",
                      options: [
                          {
                              /* probably not necessary */
                              label:"Type",
                              type:"Dropdown",
                              values: ["HEX","rgb","rgba"]
                          },
                          {
                              label:"Value",
                              type:"Number",
                              defaultValue:"0xFF0000"
                          }
                      ]
                  },

                  {
                      name: "Boolean",
                      label:"BO",
                      options: [
                          {
                              /* probably not necessary */
                              label:"Default Value",
                              type:"Dropdown",
                              values: ["true","false"]
                          }
                      ]
                  }
                  //,
                  //{name: "Image"}
                ]
            },{
                name : "Structures",
                type: "structure",
                entries : [
                    {
                        name : "Structure",
                        label:"ST",
                        options: [{
                            label: "Form Accessible",
                            type: "Boolean",
                            defaultValue: "false"
                        }]
                    },
                    {
                        name : "Group",
                        label:"GR",
                        options: []
                    }
                ]
            },{
                name : "Endpoints",
                type: "endpoint",
                entries: [
                    {
                        name : "Endpoint",
                        label:"EP",
                        options: []
                    },
                    {
                        name : "Query",
                        label:"QU",
                        options: []
                    },
                    {
                        name : "Form",
                        label:"FO",
                        options: []
                    }
                ]
            }

        ];

        //TODO: update from database types or have dedicated types class -- making global for now
        CM.node_types = this.menu;

        this.isOpen = true;

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

        this.close_btn = s.rect(0,0,30,30);
        $t.set(this.close_btn.node, {
           x: $(this.group.node).width() - $(this.close_btn.node).width() - 1,
            y: -34,
            pointerEvents:"auto",
            cursor:"pointer"
        });
        $(this.close_btn.node).on("click", $.proxy(this.toggleVisibility, this));
        this.group.add(this.close_btn);

        CM.keys.register('m', $.proxy(this.toggleVisibility, this));

    },

    toggleVisibility : function() {

        if(this.isOpen) {
            this.close()
        } else {
            this.show();
        }

        this.isOpen = !this.isOpen;


    },

    handleClose : function() {

       this.close();

    },

    show : function() {

        $t.to(this.group.node, 0, {
            autoAlpha: 1
        })

    },

    close : function() {

        $t.to(this.group.node, 0, {
            autoAlpha: 0
        })

    },

    render: function() {


        MASTRI.centerXY($(this.group.node), $b);

    }

});