'use strict';

console.log("OUTSIDE initDirective");

angular.module("omniantModule")
    .directive('jumbotron', function () {

        console.log("INSIDE initDirective");

        return {

            templateUrl: '/views/jumbotron.html',
            controller: 'jumbotronController',
            replace: false
        }

    });