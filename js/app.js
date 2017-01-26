var $ = require('jquery');
var Backbone = require('backbone');
var Designer = require("./designer");
var StructureManager = require("./StructureManager");

Backbone.$ = $;

$(function() {

    window.$w = $(window);
    window.$t = TweenMax;

    window.CM = {};

    window.s = Snap($w.width(), $w.height());

    CM.sm = new StructureManager();
    CM.designer = new Designer();

});