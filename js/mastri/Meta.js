//var $ = require('jquery-browserify');

Meta = {


    /*
    * <meta property="og:title" content="Facebook Open Graph META Tags"/>
     <meta property="og:image" content="https://davidwalsh.name/wp-content/themes/klass/img/facebooklogo.png"/>
     <meta property="og:site_name" content="David Walsh Blog"/>
     <meta property="og:description" content="Facebook's Open Graph protocol allows for web developers to turn their websites into Facebook "graph" objects, allowing a certain level of customization over how information is carried over from a non-Facebook website to Facebook when a page is 'recommended', 'liked', or just generally shared."/>


     * */

    add : function(ele, style) {

        if(ele == undefined) ele = "div";
        var e = $(document.createElement(ele));

        if(style != undefined) {
            TweenMax.set(e, style);
        }

        return e;

    },

    update : function(obj) {

        console.log("UPDATE META");

    }


};

module.exports = Meta;