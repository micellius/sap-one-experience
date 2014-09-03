/**
 * Created by i070970 on 8/25/14.
 */
(function () {
    'use strict';

    function sapTodosController($scope, sapSharedGalleryService, sapTodosFeedService) {
        sapSharedGalleryService.setItems([]);

        sapTodosFeedService.promise.success(function () {
            $scope.items = sapTodosFeedService.getTodos();
        });
    }

    angular.
        module('sapTodos').
        controller('sapTodosController', [
            '$scope',
            'sapSharedGalleryService',
            'sapTodosFeedService',
            sapTodosController
        ]);
}());