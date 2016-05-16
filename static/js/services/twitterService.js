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

    });