'use strict';

console.log("outer mashup directive");

angular.module("mainModule")
    .directive('twitter', function () {

        console.log("mashup directive initialized!");

        return {

            templateUrl: '../templates/twitter.html',
            controller: 'alloyController',
            replace: false
        }

    });