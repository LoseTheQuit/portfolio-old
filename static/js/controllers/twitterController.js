'use strict';
console.log("outer mashupController");

//angular.module("shell")      
angular.module("mainModule")
    .controller('mashupController', function ($scope, mashupService, alloy) {

        console.log("mashupController initialized!");

        mashupService.getTwitter(function (response) {

            var tweets = response.data;
            console.log(tweets);
            console.log($scope.hideThisDiv);
            $scope.twitterData = {};
            $scope.twitterData.data = tweets


        });

        $scope.changeThis = function () {

            mashupService.getTwitterExtended({

                screen_name: $scope.inputQuery,
                count: 10

            }, function (response) {

                var tweets = response.data;
                console.log(tweets);
                $scope.twitterData = {};
                $scope.twitterData.data = tweets;

            });


        };

        $scope.changeThisSearchTweets = function () {

            alloy.getTwitterSearchTweets({

                q: $scope.inputSearchTweetsQuery,
                count: 10

            }, function (response) {

                var tweets = response.data;
                console.log(tweets);
                $scope.twitterData = tweets;
            });


        };



    });