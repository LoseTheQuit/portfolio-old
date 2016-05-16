'use strict';

console.log("OUTSIDE spotify directive");

angular.module("mainModule")
    .directive('spotify', function () {

        console.log("INSIDE spotify directive");

        return {
            templateUrl: '../templates/spotify.html',
            controller: 'spotifyController',
            replace: false
        }

    });