var $ = require('jquery');
var Backbone = require('backbone');
var Designer = require("./designer");
var StructureManager = require("./StructureManager");
var MASTRI = require("./mastri/Mastri");

Backbone.$ = $;

$(function() {

    window.$w = $(window);
    window.$b = $("body");
    window.$t = TweenMax;

    window.CM = {};

    window.s = Snap($w.width(), $w.height());

    window.MASTRI = MASTRI;

    CM.sm = new StructureManager();
    CM.designer = new Designer();

});