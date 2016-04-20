'use strict';

console.log("outer shellController");

angular.module("shell")
    .controller('portfolioController', function ($scope, dataService) {
        console.info("portfolioController initialized!")

        $scope.helloConsole = dataService.helloConsole;

        dataService.getTodos(function (response) {

            console.info(response.data);
            $scope.todos = response.data;

        });

        $scope.helloWorld = function () {
            // console.log('hello there! this is the hello world contr oller');
        };


        $scope.addTodo = function () {

            var todo = {
                name: "edit this task"
            }

            $scope.todos.unshift(todo);
        };

        $scope.saveTodos = function () {

            var filteredTodos = $scope.todos.filter(function (todo) {

                if (todo.edited) {
                    console.info('todo.edited found');
                    return todo;
                };

            });


            dataService.saveTodos(filteredTodos);

        };

        $scope.deleteTodo = function (todo, $index) {

            $scope.todos.splice($index, 1)
            dataService.deleteTodo(todo);

        };
    });