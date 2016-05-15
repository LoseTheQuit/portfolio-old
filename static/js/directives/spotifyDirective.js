'use strict';

console.log("outer spotify directive");

angular.module("mainModule")
    .directive('spotify', function () {

        console.log("spotify directive initialized!");

        return {

            templateUrl: '../templates/spotify.html',
            controller: 'alloyController',
            replace: false
        }

    });