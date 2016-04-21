'use strict';
console.log("outer mashupController");

angular.module("shell")
    .controller('mashupController', function ($scope, mashupService) {

        console.log("mashupController initializedc!");

        $scope.igRequestUri = 'https://www.instagram.com/oauth/authorize/?client_id=e272444723924d49bb78da2b5e5c4dfd&redirect_uri=https://losethequit.herokuapp.com/views/mashupShell.html/handleauth&response_type=code'

        $scope.changeThis = function () {

            console.log('inpuQuery: ' + $scope.inputQuery);

            mashupService.getTwitterExtended({

                screen_name: $scope.inputQuery

            }, function (response) {

                var tweets = response.data;
                // console.log(tweets);
                $scope.twitterdata = tweets;

            });


        };


        $scope.getInstagramNested = function () {
            mashupService.getInstagramExtended(function (response) {

                var tweets = response.data;
                console.log(tweets);
                // $scope.twitterdata = tweets;

            });
        };

        mashupService.getTwitter(function (response) {

            var tweets = response.data;
            // console.log(tweets);
            $scope.twitterdata = tweets;

        });

    });