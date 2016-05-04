'use strict';

console.log("OUTSIDE initDirective");

angular.module("mainModule")
    .directive('jumbotron', function () {

        console.log("INSIDE initDirective");

        return {

            templateUrl: '/templates/jumbotron.html',
            controller: 'alloyController',
            replace: false
        }

    });