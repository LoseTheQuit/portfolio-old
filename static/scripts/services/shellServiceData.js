'use strict';

console.log("this is the shellServiceData");

angular.module("shell")
    .service('dataService', function ($http) {
        console.log("shellServiceData initialized!");
        this.helloConsole = function () {

            console.info("This is inside the dataService method - service method");

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