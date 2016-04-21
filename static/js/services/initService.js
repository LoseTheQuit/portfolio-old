'use strict';

console.log("OUTSIDE dataService");

angular.module("initModule")
    .service('dataService', function ($http) {

        console.log("INSIDE dataService");

        this.tapInsta = function (access_token, callback) {

            $http({
                method: 'POST',
                url: '/ig',
                data: {
                    token: access_token
                }
            })

            .then(callback);
        }

        this.getHandleAuth = function (callback) {


            $http({
                method: 'GET',
                url: '/handleauth',
                data: {
                    name: "LTQ"
                }
            })

            .then(callback);

        }

        this.getWindowInfo = function () {

            var windowLocation = window.location.href;
            var windowLocationWithToken = windowLocation.replace("http://localhost:5000/views/initShell.html?code=", "");

            return windowLocationWithToken;

        };

    });