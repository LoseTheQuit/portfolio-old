'use strict';

console.log("OUTSIDE jumbotronController");

angular.module("omniantModule")
    .controller('jumbotronController', function ($scope, jumbotronService) {
        console.log("INSIDE jumbotronController");
    });