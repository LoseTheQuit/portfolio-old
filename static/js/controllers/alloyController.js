'use strict';

console.log("OUTSIDE alloyController");

angular.module("mainModule")
    .controller('alloyController', function ($scope, instagramService, twitterService, alloy) {

        console.log("INSIDE alloyController");

        $scope.instagramDataLink = 'http://www.instagram.com/oauth/authorize?client_id=b23670e220f14f1c89c11f627c9f9953&redirect_uri=https://losethequit.herokuapp.com/views/werkspayce.html&response_type=code&scope=basic+public_content+follower_list+comments+relationships+likes';

        //        $scope.instagramDataLink = 'http://www.instagram.com/oauth/authorize?client_id=d0f6230a40954cb2823768aa53910a5e&redirect_uri=http://localhost:5000/views/werkspayce.html&response_type=code&scope=basic+public_content+follower_list+comments+relationships+likes';

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

        instagramService.tapInsta($scope.windowInfoWithToken, function (response) {

            $scope.instagramData = response.data;

            if (!response.data.access_token == undefined) {

                $scope.instagramDataWithToken = response.data.access_token;

            } else {

                $scope.hideThisDiv = true;
            }

            console.info(response.data);

        });


        twitterService.getTwitter(function (response) {

            var tweets = response.data;
            console.log(tweets);
            console.log($scope.hideThisDiv);
            $scope.twitterData = {};
            $scope.twitterData.data = tweets


        });

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


    });