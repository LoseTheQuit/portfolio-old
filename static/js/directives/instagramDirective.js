'use strict';

console.log("OUTSIDE initDirective");

angular.module("mainModule")
    .directive('instagram', function () {

        console.log("INSIDE initDirective");

        return {

            templateUrl: '/templates/instagram.html',
            controller: 'initController',
            replace: false
        }

    });