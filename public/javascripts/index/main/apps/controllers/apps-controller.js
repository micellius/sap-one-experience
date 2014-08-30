/**
 * Created by i070970 on 8/25/14.
 */
(function () {
    'use strict';

    function sapAppsController(sapSharedGalleryService, sapSharedI18nService) {
        sapSharedGalleryService.setMessages({
            title: sapSharedI18nService.translate('appsGalleryTitle')
        });
        sapSharedGalleryService.setItems([{
            name: 'app1'
        }]);
    }

    angular.
        module('sapApps').
        controller('sapAppsController', [
            'sapSharedGalleryService',
            'sapSharedI18nService',
            sapAppsController
        ]);
}());