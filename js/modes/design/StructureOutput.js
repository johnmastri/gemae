"use strict";

var $ = require('jquery');
var Backbone = require('backbone');

module.exports = Backbone.View.extend({

    initialize: function(obj) {

        this.$el = MASTRI.add("div", {
            width: "25%",
            height: "100%",
            backgroundColor: "white",
            color:"black",
            right:"0%",
            fontFamily:"Courier",
            fontWeight:"Bold",
            fontSize: 11,
            padding:"10px"
        });

/*        this.$el.html("{code : <br>" +
            "<blockquote>sample: [{" +
            "<blockquote>whatever, whatever, whatever</blockquote>" +
            "]\n</blockquote>" +
            "<blockquote>sample: []\n</blockquote>" +
            "<br>" +
            "}");*/

        this.$el.appendTo($b);

        /*
        *
        * var style = $('<style>body { background: green; }</style>')
         $('html > head').append(style);*/

        this.highlights = [
            {name: "string", props: { "color": "green" }},
            {name: "number", props: { color: "darkorange" }},
            {name: "boolean", props: { color: "blue" }},
            {name: "null", props: { color: "magenta" }},
            {name: "key", props: { color: "red" }}
         ];

        /*
         var style = $('<style>body { background: green; }</style>')
         $('html > head').append(style);

         $("<style type='text/css'> .redbold{ color:#f00; font-weight:bold;} </style>").appendTo("head");
         $("<div/>").addClass("redbold").text("SOME NEW TEXT").appendTo("body");


         */

        //TODO: can be replaced with regex

        var s = "<style type='text/css'>";

        for(var a = 0 ; a < this.highlights.length ; a++) {

            var h = this.highlights[a];
            var json = "";
            for(var b in h.props) {
                json += "." + h.name + "{ " + b ;
                json += ":";
                json += h.props[b] + "}\n"
            }
            s += json;

        }

        s += "</style>";
        $(s).appendTo("head");

        //this.output();

    },

    update : function(obj) {

        this.output(obj);

    },

    output : function(obj) {
        //var obj = {whatever: "ASS", bitch: ["fuck", "you", true], shit: { seriously : "this is lame"}};
        this.$el.html("<pre>" + this.syntaxHighlight( obj ) +"</pre>");
    },

    syntaxHighlight : function(obj) {

        obj = JSON.stringify(obj, undefined, 4);

        obj = obj.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

        return obj.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });

    },

    render: function() {

    }

});