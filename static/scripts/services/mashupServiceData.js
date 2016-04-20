'use strict';

console.log("outer mashupServiceData");

angular.module("shell")
    .service('mashupService', function ($http) {
        console.log("mashupServiceData initialized!");

        this.getTwitter = function (callback) {


            $http({
                url: '/twitter',
                method: "POST",
                data: {
                    screen_name: 'nodejs'
                }
            })


            .then(callback);

        };

        this.getTwitterExtended = function (params, callback) {
            console.log("success from callApi");
            console.log(params);

            $http({
                url: '/inputquery',
                method: "POST",
                data: params
            })

            .then(callback);

        };

        this.getInstagramExtended = function (callback) {


            $http({
                url: '/ig',
                method: "POST"
            })


            .then(callback);

        };

        this.getTodos = function (callback) {

            $http.get('../mock/todos.json')

            .then(callback);
        };

        this.deleteTodo = function (todo) {

            console.info('The ' + todo.name + " todo has been delted!")
        };

        this.saveTodos = function (todo) {

            console.info('The ' + todo.length + " number of todos has been saved!")

        };

    });