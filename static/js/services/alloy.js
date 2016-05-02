'use strict';

console.log("this is the shellServiceData");

angular.module("mainModule")
    .service('alloy', function ($http) {
        console.log("alloy initialized!");

        this.helloConsole = function () {

            console.info("This is inside the dataService method - service method");

        };


        this.getTwitterSearchTweets = function (params, callback) {
            console.log("success from callApi");
            console.log(params);

            $http({
                url: '/searchTweetsQuery',
                method: "POST",
                data: params
            })

            .then(callback);

            console.log('q: ' + params.q)

        };


    });