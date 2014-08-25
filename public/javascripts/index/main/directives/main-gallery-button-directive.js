/**
 * Created by i070970 on 8/25/14.
 */
(function () {
    'use strict';

    function sapMainGalleryButtonDirective() {
        return {
            template:
                '<button class="sap-navbar-button sap-gallery-button">' +
                    '<span class="glyphicon glyphicon-th"></span>' +
                '</button>',
            replace: true,
            scope: true
        };
    }

    angular.
        module('sapMain').
        directive('sapMainGalleryButtonDirective', [
            sapMainGalleryButtonDirective
        ]);

}());