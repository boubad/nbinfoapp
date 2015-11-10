//main-init.js
//
var baseUrl = window.location.origin;
require.config({
    baseUrl: baseUrl,
    paths: {
        aurelia: "javascripts/aurelia",
        pouchdb: "javascripts/pouchdb/pouchdb-5.1.0.min",
        pouchdbfind:  "javascripts/pouchdb/pouchdb.find",
        papaparse: "javascripts/papaparse/papaparse",
        webcomponentsjs:  "javascripts/webcomponentsjs"
    },
    shim: {
        "pouchdb": {
            exports: "PouchDB"
        },
        "pouchdbfind": {
            deps: ['pouchdb']
        },
        "papaparse": {
            exports: "Papa"
        }
    }
});
require(['pouchdbfind'], function (pd) {
    require(["aurelia/aurelia-bundle-latest"], function (au) {
        require(["aurelia-bundle-manifest"], function (abm) {
            require(["aurelia-bootstrapper"], function (b) {
                // alert("loaded");
            });
        });
    });
});
