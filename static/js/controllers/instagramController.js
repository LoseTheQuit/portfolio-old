'use strict';

console.log("OUTSIDE initController");

angular.module("mainModule")
    .controller('initController', function ($scope, dataService) {

        console.log("INSIDE initController");
        //
        $scope.instagramDataLink = 'https://www.instagram.com/oauth/authorize?client_id=b23670e220f14f1c89c11f627c9f9953&redirect_uri=https://losethequit.herokuapp.com/views/mainShell.html&response_type=code&scope=basic+public_content+follower_list+comments+relationships+likes';

        console.log($scope.tagQuery);

        $scope.aninamte = true;

        $scope.windowInfoWithToken = dataService.getWindowInfo();

        console.warn($scope.windowInfoWithToken);

        $scope.tapIgApiCUSTOM = function () {

            dataService.tapInstaExtended($scope.windowInfoWithToken, $scope.instaQuery, function (response) {

                // console.info(response.data);
                $scope.instagramData = response.data;

            });

        };

        $scope.tagQuery = function (instaQuery) {

            dataService.tapInstaExtended($scope.windowInfoWithToken, instaQuery, function (response) {

                // console.info(response.data);
                $scope.instagramData = response.data;

            });

        };

        dataService.tapInsta($scope.windowInfoWithToken, function (response) {



            $scope.instagramData = response.data;

            if (!response.data.access_token == undefined) {

                $scope.instagramDataWithToken = response.data.access_token;
            }


            console.info(response.data);
        });


    });