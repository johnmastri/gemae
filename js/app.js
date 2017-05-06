var $ = require('jquery');
var Backbone = require('backbone');
//var Designer = require("./modes/design/designer");
//var StructureManager = require("./modes/design/StructureManager");
var Navigation = require("./navigation/Navigation");
var DesignMode = require("./modes/design/DesignMode");
var PopulateMode = require("./modes/populate/PopulateMode");
var GenerateMode = require("./modes/generate/GenerateMode");
var MASTRI = require("./mastri/Mastri");

Backbone.$ = $;

$(function() {

    window.$w = $(window);
    window.$b = $("body");
    window.$t = TweenMax;

    window.CM = {};

    window.s = Snap($w.width(), $w.height());

    window.MASTRI = MASTRI;

    //CM.sm = new StructureManager();
    //CM.designer = new Designer();
    CM.mode_group = s.group();

    CM.design_mode = new DesignMode();
    CM.populate_mode = new PopulateMode();
    CM.generate_mode = new GenerateMode();

    CM.mode_group.add(CM.design_mode.group, CM.populate_mode.group, CM.generate_mode.group);

    CM.navigation = new Navigation();

});