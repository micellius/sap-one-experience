/**
 * Created by i070970 on 8/25/14.
 */
(function () {
    'use strict';

    function sapMainGalleryPopoverDirective(sapSharedGalleryService) {
        return {
            template:
                '<div class="popover bottom sap-gallery-popover">' +
                    '<div class="arrow"></div>' +
                    '<div class="popover-content">' +
                        '<ul class="sap-gallery-list">' +
                            '<li class="sap-gallery-list-item" ng-repeat="item in items"></li>' +
                        '</ul>' +
                    '</div>' +
                '</div>',
            replace: true,
            scope: true,
            link: function (scope) {
                scope.items = sapSharedGalleryService.getItems();
            }
        };
    }

    angular.
        module('sapMain').
        directive('sapMainGalleryPopoverDirective', [
            'sapSharedGalleryService',
            sapMainGalleryPopoverDirective
        ]);

}());