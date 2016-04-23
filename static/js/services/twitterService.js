'use strict';

console.log("outer mashupServiceData");

//angular.module("shell")
angular.module("mainModule")
    .service('mashupService', function ($http) {
        console.log("mashupServiceData initialized!");

        this.getTwitter = function (callback) {


            $http({
                url: '/twitter',
                method: "POST",
                data: {
                    screen_name: 'nodejs'
                }
            })

            .then(callback);

        };

        this.getTwitterExtended = function (params, callback) {
            console.log("success from callApi");
            console.log(params);

            $http({
                url: '/inputquery',
                method: "POST",
                data: params
            })

            .then(callback);

            console.log('params: ' + params)
            console.log('sn: ' + params.screen_name)

        };

        this.getInstagramExtended = function (callback) {


            $http({
                url: '/ig',
                method: "POST"
            })


            .then(callback);

        };

    });