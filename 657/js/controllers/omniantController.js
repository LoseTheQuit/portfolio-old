'use strict';

console.log("OUTSIDE omniantController");

angular.module("omniantModule")
    .controller('omniantController', function ($scope, omniantService) {
        console.log("INSIDE omniantController");
    });