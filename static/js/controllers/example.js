'use strict';

console.log("OUTSIDE alloyController");

angular.module("mainModule")
    .controller('alloyController', function ($scope, instagramService) {

        console.log("INSIDE alloyController");

        $scope.windowInfoWithToken = instagramService.getWindowInfo();

        instagramService.tapInsta($scope.windowInfoWithToken, function (response) {

            $scope.instagramData = response.data;

            if (!response.data.access_token == undefined) {

                $scope.instagramDataWithToken = response.data.access_token;

            } else {

                $scope.hideThisDiv = true;
            }

            console.info(response.data);

        });

    });