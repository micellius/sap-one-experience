/**
 * Created by i070970 on 8/25/14.
 */
(function () {
    'use strict';

    function sapAnalyticsController($scope, sapSharedGalleryService, sapAnalyticsFeedService) {
        sapSharedGalleryService.setItems([]);

        sapAnalyticsFeedService.promise.success(function () {
            $scope.items = sapAnalyticsFeedService.getReports();
        });
    }

    angular.
        module('sapAnalytics').
        controller('sapAnalyticsController', [
            '$scope',
            'sapSharedGalleryService',
            'sapAnalyticsFeedService',
            sapAnalyticsController
        ]);
}());