/**
 * Created by i070970 on 8/25/14.
 */
(function () {
    'use strict';

    function sapAppsController(sapSharedGalleryService) {
        sapSharedGalleryService.setItems([{
            name: 'app1'
        }]);
    }

    angular.
        module('sapApps').
        controller('sapAppsController', [
            'sapSharedGalleryService',
            sapAppsController
        ]);
}());