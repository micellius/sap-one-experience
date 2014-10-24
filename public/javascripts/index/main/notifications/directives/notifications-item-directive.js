/**
 * Created by i070970 on 9/21/14.
 */
(function () {
    'use strict';

    function sapNotificationsItemDirective(sapSharedCssService) {
        return {
            template:
                '<div class="sap-notifications-item col-md-12 col-sm-12 col-xs-12" id="sap-notifications-item-{{item.id}}">' +
                    '<div class="panel panel-default">' +
                        '<div class="panel-heading">{{item.title}}</div>' +
                        '<div class="panel-body">' +
                            '<div class="sap-notifications-item-avatar"></div>' +
                            '<div class="sap-notifications-item-text">' +
                                '<p><strong>{{item.name}}</strong> <small>wrote:</small></p>' +
                                '<p>{{item.text}}</p>' +
                                '<small>{{item.ago}}</small>' +
                            '</div>' +
                        '</div>' +
                        '<div class="panel-footer">' +
                            '<button type="button" class="btn btn-{{button.type}}" ng-repeat="button in item.buttons">' +
                                '<span class="glyphicon glyphicon-{{button.icon}}" ng-if="button.icon"></span> ' +
                                '{{button.title}}' +
                            '</button>' +
                        '</div>' +
                    '</div>' +
                '</div>',
            replace: true,
            scope: {
                item: '=sapNotificationsItemDirective'
            },
            link: function (scope) {
                sapSharedCssService.setStyle('#sap-notifications-item-' + scope.item.id + ' .sap-notifications-item-avatar', {
                    'background-image': 'url(' + scope.item.avatar + ')'
                });
                scope.item.ago = (new Date(Date.now() - scope.item.date)).getDate() + ' days ago';
            }
        };
    }

    angular.
        module('sapNotifications').
        directive('sapNotificationsItemDirective', [
            'sapSharedCssService',
            sapNotificationsItemDirective
        ]);

}());