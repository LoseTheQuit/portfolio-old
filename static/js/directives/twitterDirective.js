'use strict';

console.log("OUTSIDE twitter directive");

angular.module("mainModule")
    .directive('twitter', function () {

        console.log("INSIDE twitter directive");

        return {

            templateUrl: '../templates/twitter.html',
            controller: 'twitterController',
            replace: false
        }

    });