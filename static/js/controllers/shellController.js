'use strict';

console.log("outer portfolioController");

angular.module("shell")
    .controller('portfolioController', function ($scope, dataService) {
        console.log("portfolioController initialized!");
    });