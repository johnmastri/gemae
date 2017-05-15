var $ = require('jquery');
var Backbone = require('backbone');
//var Designer = require("./modes/design/designer");
//var StructureManager = require("./modes/design/StructureManager");
var Navigation = require("./navigation/Navigation");
var DesignMode = require("./modes/design/DesignMode");
var PopulateMode = require("./modes/populate/PopulateMode");
var GenerateMode = require("./modes/generate/GenerateMode");
var MASTRI = require("./mastri/Mastri");
var Keys = require("./application/Keys")

Backbone.$ = $;

$(function() {

    window.$w = $(window);
    window.$b = $("body");
    window.$t = TweenMax;

    window.CM = {};

    window.s = Snap($w.width(), $w.height());
    $t.set($b, {
        overflow: "hidden"
    });

    window.MASTRI = new MASTRI();

    window.main = window.MASTRI.add("div", {
        width:"100%",
        height:"100%"
    });
    window.main.appendTo($b);

/*    window.main.attr({
        "contentEditable":"true"
    });*/

    window.main.append(window.s.node);


    CM.keys = new Keys();

    CM.mode_group = s.group();

    CM.design_mode = new DesignMode();
    CM.populate_mode = new PopulateMode();
    CM.generate_mode = new GenerateMode();

    CM.mode_group.add(CM.populate_mode.group, CM.generate_mode.group, CM.design_mode.group);

    CM.navigation = new Navigation();

});