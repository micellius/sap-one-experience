/**
 * Created by i070970 on 8/26/14.
 */
(function () {
    'use strict';

    function sapMainNotificationsPopoverDirective(sapSharedNotificationsService) {
        return {
            template:
                '<div class="popover bottom sap-notifications-popover">' +
                    '<div class="arrow"></div>' +
                    '<div class="popover-content">' +
                        '<ul class="sap-notifications-list">' +
                            '<li ng-repeat="item in items">{{item.title}}</li>' +
                        '</ul>' +
                    '</div>' +
                '</div>',
            replace: true,
            scope: true,
            link: function (scope) {
                scope.items = sapSharedNotificationsService.getItems();
            }
        };
    }

    angular.
        module('sapMain').
        directive('sapMainNotificationsPopoverDirective', [
            'sapSharedNotificationsService',
            sapMainNotificationsPopoverDirective
        ]);

}());