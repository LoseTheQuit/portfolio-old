'use strict';

console.log("OUTSIDE initDirective");

angular.module("initModule")
    .directive('init', function () {

        console.log("INSIDE initDirective");

        return {

            templateUrl: '/views/init.html',
            controller: 'initController',
            replace: false
        }

    });