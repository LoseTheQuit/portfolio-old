'use strict';
console.log("outer mashup directive");

//angular.module("shell")
angular.module("mainModule")
    .directive('mashup', function () {

        console.log("mashup directive initialized!");

        return {
            templateUrl: '../templates/twitter.html',
            controller: 'mashupController',
            replace: false
        }

    });