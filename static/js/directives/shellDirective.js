'use strict';
console.log("outer portfolio directive");
angular.module("shell")

.directive('portfolio', function () {
    console.log("portfolio directive initialized!");
    return {
        templateUrl: '../templates/portfolio.html',
        controller: 'sidebarController',
        replace: false
    }

});