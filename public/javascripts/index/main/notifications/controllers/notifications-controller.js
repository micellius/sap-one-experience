/**
 * Created by i070970 on 8/25/14.
 */
(function () {
    'use strict';

    function sapNotificationsController(sapSharedGalleryService) {
        sapSharedGalleryService.setItems([]);
    }

    angular.
        module('sapNotifications').
        controller('sapNotificationsController', [
            'sapSharedGalleryService',
            sapNotificationsController
        ]);
}());