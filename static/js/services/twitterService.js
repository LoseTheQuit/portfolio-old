'use strict';

console.log("outer mashupServiceData");

//angular.module("shell")
angular.module("mainModule")
    .service('twitterService', function ($http) {

        console.log("mashupServiceData initialized!");

        this.getTwitter = function (callback) {


            $http({
                url: '/twitter',
                method: "POST",
                data: {
                    screen_name: 'nodejs',
                    count: 10
                }
            })

            .then(callback);

        };

        this.getTwitterExtended = function (params, callback) {
            console.log("success from callApi");
            console.log(params);

            $http({
                url: '/twitterinputquery',
                method: "POST",
                data: params
            })

            .then(callback);

            console.log('sn: ' + params.screen_name)

        };


    });