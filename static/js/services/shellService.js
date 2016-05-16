'use strict';

console.log("OUTSIDE shellServiceData");

angular.module("shell")
    .service('dataService', function ($http) {
        console.info("INSIDE dataService");

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