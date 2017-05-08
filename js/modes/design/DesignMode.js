"use strict";

var $ = require('jquery');
var Backbone = require('backbone');
var Designer = require("./Designer");
var StructureManager = require("./StructureManager");


module.exports = Backbone.View.extend({

    initialize: function(){

/*        $t.set(this.$el, {
            width: "100%",
            height: "100%",
            backgroundColor:"blue",
            color:"white"
        });

        this.$el.html("THIS IS THE DESIGN SECTION");*/

        this.group = s.group();
        this.group.attr({name:"design_mode"});

        this.bg = s.rect(0,0,$w.width(),$w.height()).attr("fill", "#999999");
        this.group.add(this.bg);

        CM.sm = new StructureManager(this);
        CM.designer = new Designer(this);

        this.holder = MASTRI.add("div", {

        });

        $b.append(this.holder);


        var field_names = [
            "name",
            "address",
            "phone"
        ];

        this.fields = [];

        for(var a = 0 ; a < field_names.length ; a++) {

            var i = MASTRI.add("input",{
                position:"relative"
            });
            i.attr({
                "value" : field_names[a] + "WJATEVER",
                "id" : field_names[a]
            });

            this.fields.push(i);
            i.appendTo(this.holder);

        }

        this.add_btn = MASTRI.add("div", {
            position:"relative",
            width: 100,
            height: 50,
            backgroundColor: "red"
        });

        this.add_btn.on("click", $.proxy(this.handleAdd, this));

        console.log("FUCK YOU");

        this.add_btn.appendTo(this.holder);

    },

    handleAdd : function() {

        $.ajax({
            url : "http://localhost:3000/api/" + "case-studies" + Math.round(Math.random()) + "/4/652/5763",
            type: "POST",
            data : {
                "name": this.fields[0].val()
            },
            success: function(data, textStatus, jqXHR)
            {
                console.log("HOHOHOHO")
            },
            //data - response from server

            error: function (jqXHR, textStatus, errorThrown)
            {
            }

        })

    },

    render: function() {


    }

});