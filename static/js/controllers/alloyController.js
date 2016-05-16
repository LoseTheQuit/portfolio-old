'use strict';

console.log("OUTSIDE alloyController");

angular.module("mainModule")
    .controller('alloyController', function ($scope, instagramService, twitterService, alloy) {

        console.log("INSIDE alloyController");

        $scope.windowInfoWithToken = instagramService.getWindowInfo();

        $scope.getIgandTwitterApiData = function () {

            instagramService.tapInstaExtended($scope.windowInfoWithToken, $scope.inputSearchTweetsAndInstagramQuery, function (response) {

                // console.info(response.data);
                $scope.instagramData = response.data;

            });

            alloy.getTwitterAndInstagramDataByTags({

                q: $scope.inputSearchTweetsAndInstagramQuery,
                count: 20

            }, function (response) {

                var tweets = response.data;
                console.log(tweets);
                $scope.twitterData = tweets;
            });

            alloy.getSpotifyDATA({

                q: $scope.inputSearchTweetsAndInstagramQuery,
                count: 20

            }, function (response) {

                $scope.spotifyData = response.data;

                console.log("_________________________________");
                console.log("SPOTIFY response.DATA: ");
                console.info(response.data);
                console.log("SPOTIFY response: ");
                console.info(response);
                console.log("_________________________________");

            });

        };

        $scope.tagQuery = function (instaQuery) {

            instagramService.tapInstaExtended($scope.windowInfoWithToken, instaQuery, function (response) {

                // console.info(response.data);
                $scope.instagramData = response.data;

            });

        };

        $scope.hideThisDiv = false;
        $scope.customOverFlow = function (value) {

            if ($scope.hideThisDiv) {

                return {
                    "overflow": 'auto'
                }
            } else {

                return {
                    "overflow": 'hidden'
                }

            }
        }

        $scope.changeThis = function () {

            twitterService.getTwitterExtended({

                screen_name: $scope.inputQuery,
                count: 25

            }, function (response) {

                var tweets = response.data;
                console.log(tweets);
                $scope.twitterData = {};
                $scope.twitterData.data = tweets;

            });

        };

        $scope.changeThisSearchTweets = function () {

            alloy.getTwitterAndInstagramDataByTags({

                q: $scope.inputSearchTweetsAndInstagramQuery,
                count: 25

            }, function (response) {

                var tweets = response.data;
                console.log(tweets);
                $scope.twitterData = tweets;
            });

        };


        twitterService.getTwitter(function (response) {

            var tweets = response.data;
            console.log(tweets);
            console.log($scope.hideThisDiv);
            $scope.twitterData = {};
            $scope.twitterData.data = tweets;

        });

        alloy.getSpotify($scope.windowInfoWithToken, function (response) {

            $scope.spotifyData = response.data;
            console.info('getSPOTIFY: ');
            console.info(response.data);
            console.info('getSPOTIFY: ');


        });

        instagramService.tapInsta($scope.windowInfoWithToken, function (response) {

            $scope.instagramData = response.data;

            // debugger;

            if (!response.data.access_token == undefined) {

                $scope.instagramDataWithToken = response.data.access_token;

            } else {
                $scope.hideThisDiv = true;
            }

            console.info(response.data);

        });


    });