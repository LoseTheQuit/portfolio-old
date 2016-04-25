'use strict';

angular.module("mainModule", ['ngAnimate'])
    .animation('.colorful', [function () {
        return {
            addClass: function (element, className, doneFn) {
                // do some cool animation and call the doneFn
            },
            removeClass: function (element, className, doneFn) {
                // do some cool animation and call the doneFn
            },
            setClass: function (element, addedClass, removedClass, doneFn) {
                // do some cool animation and call the doneFn
            }
        }
}]);