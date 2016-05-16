'use strict';

console.log("OUTSIDE instagramDirective");

angular.module("mainModule")
    .directive('instagram', function () {

        console.log("INSIDE instagramDirective");

        return {
            templateUrl: '/templates/instagram.html',
            controller: 'instagramController',
            replace: false
        }

    });