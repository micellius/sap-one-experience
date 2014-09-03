/**
 * Created by i070970 on 9/2/14.
 */
(function () {
    'use strict';

    function sapTodosFeedService($http) {

        var todos,
            promise;

        todos = [];

        promise = $http({
            method: 'GET',
            url: 'api/todos'
        }).success(function (data) {
            var i, l, results;
            if (data.status === 'OK') {
                results = data.results;
                todos.length = 0;
                for (i = 0, l = results.length; i < l; i++) {
                    todos.push(results[i]);
                }
            }
        });

        this.promise = promise;

        this.getTodos = function () {
            return todos;
        };
    }

    angular.
        module('sapTodos').
        service('sapTodosFeedService', [
            '$http',
            sapTodosFeedService
        ]);

}());