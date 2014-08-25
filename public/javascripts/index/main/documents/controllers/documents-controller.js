/**
 * Created by i070970 on 8/25/14.
 */
(function () {
    'use strict';

    function sapDocumentsController(sapSharedGalleryService) {
        sapSharedGalleryService.setItems([]);
    }

    angular.
        module('sapDocuments').
        controller('sapDocumentsController', [
            'sapSharedGalleryService',
            sapDocumentsController
        ]);
}());