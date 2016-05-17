'use strict';

console.log("OUTSIDE alloyController");

angular.module("mainModule")
    .controller('alloyController', function ($scope, instagramService, twitterService, sidebarService, alloy) {

        console.log("INSIDE alloyController");

        $scope.windowInfoWithToken = instagramService.getWindowInfo();

        $scope.getAllApiData = function () {

            instagramService.tapInstaExtended($scope.windowInfoWithToken, $scope.inputSearchTweetsAndInstagramQuery, function (response) {

                // console.info(response.data);
                $scope.instagramData = response.data;

            });

            /////////////////////// console.info(response.data); 

            //            alloy.getTwitterAndInstagramDataByTags({
            //
            //                q: $scope.inputSearchTweetsAndInstagramQuery,
            //                count: 20
            //
            //            }, function (response) {
            //
            //                var tweets = response.data;
            //                console.log(tweets);
            //                $scope.twitterData = tweets;
            //            });

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

            twitterService.getTwitterData({

                q: $scope.inputSearchTweetsAndInstagramQuery,
                count: 20

            }, function (response) {
                var tweets = response.data;
                console.log(tweets);
                $scope.twitterData = {};
                $scope.twitterData.data = tweets.statuses;

            })

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
            console.log($scope.hideThisDiv);

            $scope.twitterData = {};
            $scope.twitterData.data = tweets;

        });

        alloy.getSpotify($scope.windowInfoWithToken, function (response) {

            $scope.spotifyData = response.data;

            console.info('getSPOTIFYDATA: ' +
                response.data + ' :getSPOTIFYDATA');


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