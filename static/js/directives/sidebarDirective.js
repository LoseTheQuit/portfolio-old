'use strict';

console.log("OUTSIDE sidebar");

angular.module("mainModule")
    .directive('sidebar', function () {

        console.log("INSIDE sidebar");

        return {

            templateUrl: '/templates/sidebar.html',
            controller: 'sidebarController',
            replace: false
        }

    });