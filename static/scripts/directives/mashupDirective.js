'use strict';
console.log("outer mashup directive");
angular.module("shell")

.directive('mashup', function () {

    console.log("mashup directive initialized!");

    return {
        templateUrl: '../templates/mashup.html',
        controller: 'mashupController',
        replace: false
    }

});