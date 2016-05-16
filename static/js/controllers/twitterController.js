'use strict';

console.log("INSIDE twitterController");

angular.module("mainModule")
    .controller('twitterController', function ($scope, instagramService, twitterService, alloy) {
        console.log("OUTSIDE twitterController");
    });