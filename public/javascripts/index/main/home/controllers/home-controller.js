/**
 * Created by i070970 on 8/25/14.
 */
(function () {
    'use strict';

    function sapHomeController(sapSharedGalleryService, sapHomeWidgetsService) {

        sapHomeWidgetsService.promise.success(function () {
            sapSharedGalleryService.setItems(sapHomeWidgetsService.getWidgets());
        });

    }

    angular.
        module('sapHome').
        controller('sapHomeController', [
            'sapSharedGalleryService',
            'sapHomeWidgetsService',
            sapHomeController
        ]);
}());