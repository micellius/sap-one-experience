/**
 * Created by i070970 on 8/25/14.
 */
(function () {
    'use strict';

    function sapHomeController(sapSharedGalleryService) {
        sapSharedGalleryService.setItems([{
            name: 'app1'
        }, {
            name: 'app2'
        }]);
    }

    angular.
        module('sapHome').
        controller('sapHomeController', [
            'sapSharedGalleryService',
            sapHomeController
        ]);
}());