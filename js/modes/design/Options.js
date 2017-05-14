"use strict";

var $ = require('jquery');
var Backbone = require('backbone');
var Connector = require("./Connector");
var Option = require("./options/Option");

module.exports = Backbone.View.extend({

    initialize: function(obj) {

        this.data = obj;
        this.isOpen = false;

        this.group = s.group();

        var fill = "#DCDCDD";
        var accent = "#C9C9CA";

        this.mask = s.rect(0,0,150,100);
        this.mask.attr({
            fill:"#fff",
            pointerEvents:"none",
        });

        this.group.add(this.mask);

        this.holder = s.group();
        this.holder.attr({//_group
            mask: this.mask
        });
        $t.set(this.holder.node, {
            pointerEvents:"none"
        });
        this.rect = s.rect(0, 0, 150, 100);
        this.rect.attr({
            fill: fill
        });

        this.holder.add(this.rect);


        this.group.add(this.holder);

        for(var a = 0 ; a < this.data.length ; a++) {

            var o = new Option({
                data:this.data[a],
                parent: this
            });
            //var t = s.text(0,0, this.data[a].label);
            $t.set(o.group.node, {
                x: 0,
                y: (22 * a) + 21
            });
            this.holder.add(o.group);
            //o.init();
        }


        this.top_rect = s.rect(0,0,150, 5);
        this.top_rect.attr({
            fill: accent
        });
        $t.set(this.top_rect.node, {
            y: -6
        });

        this.group.add(this.top_rect);

        $t.set(this.rect.node, {
            height: (this.data.length * 22) + 10
        });

        $t.set(this.mask.node, {
            y: 0,//-this.data.length * 20,
            height: 0,//this.data.length * 40
            //overflow:"hidden"
        });



       /* this.top_rect = s.rect(0, 0, 150, 5);
        this.top_rect.attr({
            fill: accent
        });
        $t.set(this.top_rect.node, {
            y: -6
        });

        this.label_rect = s.rect(0, 0, 17, 17);
        this.label_rect.attr({
            fill: accent
        });
        $t.set(this.label_rect.node, {
            x: 20,
            y: (33 - 17) / 2
        });

        this.label = s.text(0, 0, this.data.data.entry.label);
        this.label.attr({
            fill: "white",
            fontSize: 10
        });
        $t.set(this.label.node, {
            x: 22,
            y: 20
        });

        this.title = s.text(0, 15, this.data.data.entry.name);
        $(this.title.node).css(
            {
                "pointer-events": "auto"
            }
        );
        $t.set(this.title.node, {
            x: 20 + 17 + 10,
            y: (33 - 15) / 2 - 2
        });

        this.tf = MASTRI.add("input", {
            position: "absolute",
            backgroundColor: "transparent",
            border: "0px none transparent",
            color: "white",
            outline: "none",
            width: 100
            //letterSpacing: ".08em"
        });

        this.tf.attr({
            value: this.data.data.entry.name
        });

        $b.append(this.tf);

        //window.tf = this.tf;

        console.log(this.data.position);

        $t.set(this.group.node, this.data.position);
        console.log(this.data.position, " POSITION");
        $t.set(this.tf, {
            x: this.data.position.css.x + 20 + 17 + 10,
            y: this.data.position.css.y + (33 - 15) / 2 - 2
        });*/

    },

    open : function() {

        console.log("OPEN");

        var t = .4;
        var e = Quint.easeInOut;

        $t.to(this.top_rect.node, t, {
            y: -$(this.rect.node).height() - 7,
            ease: e
        });

        $t.to(this.holder.node, t, {
            y: -$(this.rect.node).height() - 1,
            ease: e
        });

        $t.to(this.mask.node, t, {
            y: -1,
            height: $(this.rect.node).height() + 1,
            ease: e
        });

       $t.set(this.holder.node, {
            pointerEvents:"auto"
        });

        this.isOpen = true;

    },

    close : function() {

        var t = .4;
        var e = Quint.easeOut;

        $t.to(this.top_rect.node, t, {
            y: -6,
            ease: e
        });

        $t.to(this.holder.node, t, {
            y: 0,
            ease: e
        });

        $t.to(this.mask.node, t, {
            y: -1,
            height: 0,
            ease: e
        });

        $t.set([this.holder.node], {
            pointerEvents:"none"
        });


        this.isOpen = false;

    },

    get : function() {

        var o = {};
        o.isOpen = this.isOpen;

        return o

    },

    set : function() {


    },

    render: function() {

    }

});