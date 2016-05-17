'use strict';

console.log("OUTSIDE sidebarController");

angular.module("mainModule")
    .controller('sidebarController', function ($scope, instagramService, twitterService, sidebarService, alloy) {
        console.log("INSIDE sidebarController");

        $scope.getTwitterDropDownOptionText = twitterService.getTwitterDropDownOptionText;
        $scope.setTwitterDropDownOption = function (optionNumber) {
            twitterService.setTwitterDropDownOption(optionNumber);
            $scope.getTwitterDropDownOptionText = twitterService.getTwitterDropDownOptionText;
            twitterService.getTwitterDropDownOptionNumber = optionNumber;
        }
    });