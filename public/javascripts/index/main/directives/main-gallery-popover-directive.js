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
                    '<h3 class="popover-title">{{msg.title}}</h3>' +
                    '<div class="popover-content">' +
                        '<ul class="list-group">' +
                            '<li class="list-group-item" ng-repeat="item in items">' +
                                '<i class="glyphicon glyphicon-{{getIcon(item)}}"></i>' +
                                '<span>{{item.name}}</span>' +
                            '</li>' +
                        '</ul>' +
                    '</div>' +
                '</div>',
            replace: true,
            scope: true,
            link: function (scope) {
                scope.items = sapSharedGalleryService.getItems();
                scope.msg = sapSharedGalleryService.getMessages();
                scope.getIcon = function getIcon(item) {
                    switch ((item.contentType || '').split('/')[0]) {
                    case 'text':
                        return 'font';
                    case 'image':
                        return 'picture';
                    case 'document':
                        return 'file';
                    case 'video':
                        return 'facetime-video';
                    default:
                        return 'exclamation-sign';
                    }
                };
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