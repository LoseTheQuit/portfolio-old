'use strict';

console.log("OUTSIDE twitterService");

angular.module("mainModule")
    .service('twitterService', function ($http) {

        console.log("INSIDE twitterService");

        this.getTwitter = function (callback) {

            $http({
                url: '/twitter',
                method: "POST",
                data: {
                    screen_name: 'nodejs',
                    count: 10
                }
            })

            .then(callback);

        };

        this.getTwitterDropDownOptionText = 'search tweets';

        this.setTwitterDropDownOption = function (optionNumber) {

            switch (optionNumber) {
            case 1:
                this.getTwitterDropDownOptionText = 'search tweets';
                break;
            case 2:
                this.getTwitterDropDownOptionText = 'user timeline';
                break;
            case 3:
                this.getTwitterDropDownOptionText = 'coming soon';
                break;
            default:
                alert('YOU SEEM TO HAVE FORGOTTEN TO ADD THIS OPTION');
            }

        };
        this.getTwitterDropDownOptionNumber = 1;

        this.getTwitterData = function (params, callback) {

            switch (this.getTwitterDropDownOptionNumber) {
            case 1:
                this.getTwitterDropDownOption = 'search tweets';
                $http({
                    url: '/twitterSearchTweetsQuery',
                    method: "POST",
                    data: params
                })

                .then(callback);
                break;

            case 2:
                this.getTwitterDropDownOption = 'user timeline';

                $http({
                    url: '/twitterUserTimeQuery',
                    method: "POST",
                    data: params
                })

                .then(callback);
                break;

            case 3:
                this.getTwitterDropDownOption = 'coming soon';
                break;
            default:
                alert('YOU SEEM TO HAVE FORGOTTEN TO ADD THIS OPTION');
            }


        };

    });