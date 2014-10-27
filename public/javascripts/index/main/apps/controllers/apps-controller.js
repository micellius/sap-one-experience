/**
 * Created by i070970 on 8/25/14.
 */
(function () {
    'use strict';

    function sapAppsController(
        $scope,
        $location,
        sapSharedGalleryService,
        sapSharedI18nService,
        sapAppsGroupsService
    ) {
        sapAppsGroupsService.promise.success(function () {
            var app,
                appId,
                groups;
            groups = sapAppsGroupsService.getGroups();
            appId = $location.search().id;
            if (appId) {
                app = groups.reduce(function (prev, current) {
                    return prev || current.tiles.filter(function (item) {
                        return (item.id === appId);
                    })[0];
                }, null);
                $scope.app = app;
            } else {
                $scope.groups = groups;
            }
        });

        sapSharedGalleryService.setMessages({
            title: sapSharedI18nService.translate('appsGalleryTitle')
        });

        sapSharedGalleryService.setItems([{
            name: 'Report GW8-1282',
            contentType: 'document'
        }, {
            name: 'Product Preview',
            contentType: 'image'
        }]);

        $scope.open = function (app) {
            $location.search('app', app.id);
        };
    }

    angular.
        module('sapApps').
        controller('sapAppsController', [
            '$scope',
            '$location',
            'sapSharedGalleryService',
            'sapSharedI18nService',
            'sapAppsGroupsService',
            sapAppsController
        ]);
}());