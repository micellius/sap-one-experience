/**
 * Created by i070970 on 8/25/14.
 */
(function () {
    'use strict';

    function sapAppsController(
        $scope,
        sapSharedGalleryService,
        sapSharedI18nService,
        sapAppsGroupsService
    ) {
        $scope.groups = sapAppsGroupsService.getGroups();

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
    }

    angular.
        module('sapApps').
        controller('sapAppsController', [
            '$scope',
            'sapSharedGalleryService',
            'sapSharedI18nService',
            'sapAppsGroupsService',
            sapAppsController
        ]);
}());