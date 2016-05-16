'use strict';

console.log("OUTSIDE instagramController");

angular.module("mainModule")
    .controller('instagramController', function ($scope, instagramService, twitterService, alloy) {
        console.log("INSIDE instagramController");
    });