/**
 * Created by i070970 on 8/25/14.
 */
(function () {
    'use strict';

    function sapTodosController(sapSharedGalleryService) {
        sapSharedGalleryService.setItems([]);
    }

    angular.
        module('sapTodos').
        controller('sapTodosController', [
            'sapSharedGalleryService',
            sapTodosController
        ]);
}());