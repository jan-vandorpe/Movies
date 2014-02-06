/* 
 main.js entry point voor Movies app
 */
requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app             : '../app',
        jquery          : 'jquery/jquery-2.0.3.min',
        'underscore'    : 'underscore/underscore-min',      // non_AMD met Shim
        'backbone'      : 'backbone/backbone-min',        // non_AMD met Shim
       },
        shim: {
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    }
});
//Require laadt de app
require(['app/movies'],
    function   (movies) {
        console.log('movies kan gestart worden')
        movies.start();         //start de movies app
 });

