/**
 * Created by i070970 on 8/26/14.
 */
(function () {
    'use strict';

    function sapMainNotificationsButtonDirective(sapSharedNotificationsService) {
        return {
            template:
                '<button class="sap-navbar-button sap-notifications-button">' +
                    '<span class="glyphicon glyphicon-bell"></span>' +
                    '<span class="badge" ng-if="items.length">{{items.length}}</span>' +
                '</button>',
            replace: true,
            scope: true,
            link: function (scope) {
                scope.items = sapSharedNotificationsService.getItems();
            }
        };
    }

    angular.
        module('sapMain').
        directive('sapMainNotificationsButtonDirective', [
            'sapSharedNotificationsService',
            sapMainNotificationsButtonDirective
        ]);

}());