'use strict';

console.log("OUTSIDE omniantController");

angular.module("omniantModule")
    .directive('omniant', function () {

        console.log("INSIDE omniantController");

        return {

            templateUrl: '/views/omniant.html',
            controller: 'omniantController',
            replace: false

        }

    });