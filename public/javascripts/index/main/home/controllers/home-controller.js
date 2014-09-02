/**
 * Created by i070970 on 8/25/14.
 */
(function () {
    'use strict';

    function sapHomeController($scope, sapSharedGalleryService, sapSharedI18nService, sapHomeWidgetsService) {

        sapHomeWidgetsService.promise.success(function () {
            sapSharedGalleryService.setMessages({
                title: sapSharedI18nService.translate('homeGalleryTitle')
            });
            sapSharedGalleryService.setItems(sapHomeWidgetsService.getWidgets());
            $scope.widgets = sapHomeWidgetsService.getWidgets();
        });

    }

    angular.
        module('sapHome').
        controller('sapHomeController', [
            '$scope',
            'sapSharedGalleryService',
            'sapSharedI18nService',
            'sapHomeWidgetsService',
            sapHomeController
        ]);
}());