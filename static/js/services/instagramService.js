'use strict';

console.log("OUTSIDE dataService");

angular.module("mainModule")
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
        this.tapInstaExtended = function (access_token, instaQuery, callback) {

            $http({
                method: 'POST',
                url: '/instaInputQuery',
                data: {
                    token: access_token,
                    query: instaQuery
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
            var windowLocationWithToken = windowLocation.replace("https://losethequit.herokuapp.com/views/mainShell.html?code=", "");

            return windowLocationWithToken;

        };

    });