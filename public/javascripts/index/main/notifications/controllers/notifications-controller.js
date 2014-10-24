/**
 * Created by i070970 on 8/25/14.
 */
(function () {
    'use strict';

    function sapNotificationsController($scope, sapSharedGalleryService, sapNotificationsFeedService) {
        sapSharedGalleryService.setItems([]);
        $scope.items = sapNotificationsFeedService.getNotifications();
    }

    angular.
        module('sapNotifications').
        controller('sapNotificationsController', [
            '$scope',
            'sapSharedGalleryService',
            'sapNotificationsFeedService',
            sapNotificationsController
        ]);
}());