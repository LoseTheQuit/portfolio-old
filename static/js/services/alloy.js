'use strict';

console.log("OUTSIDE alloy");

angular.module("mainModule")
    .service('alloy', function ($http) {
        console.log("alloy initialized!");

        this.helloConsole = function () {

            console.info("INSIDE alloy");

        };


        this.getTwitterAndInstagramDataByTags = function (params, callback) {
            console.log("success from getTwitterAndInstagramDataByTags");
            console.log(params);

            $http({
                url: '/searchTwitterQuery',
                method: "POST",
                data: params
            })

            .then(callback);

            console.log('q: ' + params.q)

        };

        this.getSpotify = function (params, callback) {
            console.log("success from getSpotify");
            console.log(params);

            $http({
                url: '/spotify',
                method: "GET"
            })

            .then(callback);

            console.log('q: ' + params.q)

        };

        this.getAuthorizeSpotify = function (callback) {
            console.log("success from getSpotify");

            $http({
                url: '/authorize-spotify',
                method: "GET"
            })

            .then(callback);

        };


        this.getSpotifyDATA = function (params, callback) {
            console.log("success from getSpotify");
            console.log(params);

            $http({
                url: '/spotify-input-query',
                method: "POST",
                data: params
            })

            .then(callback);

            console.log('q: ' + params.q)

        };

    });