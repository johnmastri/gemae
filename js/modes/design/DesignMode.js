"use strict";

var $ = require('jquery');
var Backbone = require('backbone');
var Designer = require("./Designer");
var StructureManager = require("./StructureManager");


module.exports = Backbone.View.extend({

    initialize: function(){

        this.bg = s.rect(0,0,$w.width(),$w.height()).attr("fill", "#737373");

        this.group = s.group();
        this.group.attr({name:"design_mode"});

       this.group.add(this.bg);

        this.designer_holder = s.group();
        this.group.add(this.designer_holder);

        CM.sm = new StructureManager(this);
        CM.designer = new Designer(this);

        Draggable.create(this.designer_holder.node, {
            type:"x,y",
            edgeResistance:0.65,
            trigger: CM.designer.rect.node,
            onDrag : this.handleGroupDrag,
            onDragScope: this,
/*             onDragStart: this.handleDragStart,
             onDragStartScope : this,
             onDragEnd: this.handleDragComplete,
             onDragEndScope : this*/
            //bounds:s.node,
            //throwProps:true
        });


        //temporary for filling out forms

        this.holder = MASTRI.add("div", {
            position:"relative",
            width:"200",
            clear:"both"
        });

        //$b.append(this.holder);


        var field_names = [
            "name",
            "slug"
            //"phone"
        ];

        this.fields = [];

        for(var a = 0 ; a < field_names.length ; a++) {

            var i = MASTRI.add("input",{
                position:"relative",
                float: "left"
            });
            i.attr({
                "value" : field_names[a],
                "id" : field_names[a]
            });

            this.fields.push(i);
            i.appendTo(this.holder);

        }

        this.add_btn = MASTRI.add("div", {
            position:"relative",
            width: 100,
            height: 50,
            backgroundColor: "red",
            color:"white",
            cursor:"pointer",
            float:"left"
        });

        this.add_btn.html("add endpoint");
        this.add_btn.on("click", $.proxy(this.handleAdd, this));
        this.add_btn.appendTo(this.holder);

    },

    handleAdd : function() {

        $.ajax({
            url : "http://localhost:3000/api/cs/",
            type: "POST",
            data : {
 //               "name": this.fields[0].val(),
 //               "slug" : this.fields[1].val()
                    "title" : {
                        "slug" : this.fields[0].val(),
                        "type" : "String"
                    }
            },
            success: function(data, textStatus, jqXHR)
            {
                console.log("endpoint added");
                console.log(data, " < data");
            },
            //data - response from server

            error: function (jqXHR, textStatus, errorThrown)
            {
            }

        })

    },

    handleGroupDrag : function() {

        var r = CM.designer.rect;
        var x = this.designer_holder.node._gsTransform.x;
        var y = this.designer_holder.node._gsTransform.y;
        $t.set(r.node, {
            x: -x,
            y: -y
        })

    },

    render: function() {


    }

});