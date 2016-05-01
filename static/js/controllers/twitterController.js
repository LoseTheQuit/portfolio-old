'use strict';
console.log("outer mashupController");

//angular.module("shell")      
angular.module("mainModule")
    .controller('mashupController', function ($scope, mashupService, alloy) {

        console.log("mashupController initialized!");

        $scope.igRequestUri = 'https://www.instagram.com/oauth/authorize/?client_id=e272444723924d49bb78da2b5e5c4dfd&redirect_uri=https://losethequit.herokuapp.com/views/werkspayce.html/handleauth&response_type=code';

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