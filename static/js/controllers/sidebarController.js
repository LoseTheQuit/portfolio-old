'use strict';

console.log("OUTSIDE sidebarController");

angular.module("mainModule")
    .controller('sidebarController', function ($scope, instagramService, twitterService, alloy) {
        console.log("INSIDE sidebarController");
    });