/**
 * Created by i070970 on 8/25/14.
 */
(function () {
    'use strict';

    function sapAnalyticsController(sapSharedGalleryService) {
        sapSharedGalleryService.setItems([]);
    }

    angular.
        module('sapAnalytics').
        controller('sapAnalyticsController', [
            'sapSharedGalleryService',
            sapAnalyticsController
        ]);
}());