'use strict';

console.log("OUTSIDE initDirective");

angular.module("mainModule")
    .directive('init', function () {

        console.log("INSIDE initDirective");

        return {

            templateUrl: '/templates/init.html',
            controller: 'initController',
            replace: false
        }

    });