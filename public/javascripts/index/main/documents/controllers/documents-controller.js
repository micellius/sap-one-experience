/**
 * Created by i070970 on 8/25/14.
 */
(function () {
    'use strict';

    function sapDocumentsController($scope, $location, sapSharedGalleryService, sapDocumentsFeedService) {
        sapSharedGalleryService.setItems([]);

        sapDocumentsFeedService.promise.success(function () {
            var i,
                path,
                next;
            $scope.items = sapDocumentsFeedService.getDocuments();
            path = ($location.search().item || '').split('/');
            path.shift();
            while (path.length) {
                next = path.shift();
                for (i = 0; i < $scope.items.length; i++) {
                    if ($scope.items[i].id === next) {
                        $scope.items = $scope.items[i].items;
                        next = '';
                        break;
                    }
                }
                if (next) {
                    break;
                }
            }
        });

        $scope.open = function (item) {
            $location.search('item', [$location.search().item || '', item.id].join('/'));
        };
    }

    angular.
        module('sapDocuments').
        controller('sapDocumentsController', [
            '$scope',
            '$location',
            'sapSharedGalleryService',
            'sapDocumentsFeedService',
            sapDocumentsController
        ]);
}());
