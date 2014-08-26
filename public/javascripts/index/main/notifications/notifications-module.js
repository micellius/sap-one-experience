/**
 * Created by i070970 on 8/3/14.
 */
(function () {
    'use strict';

    angular.
        module('sapNotifications', ['sapShared']).
        run(['sapSharedNotificationsService', function (sapSharedNotificationsService) {
            sapSharedNotificationsService.setItems([{
                title: 'Notification 1',
                subtitle: 'Notification 1'
            }, {
                title: 'Notification 2',
                subtitle: 'Notification 2'
            }]);
        }]);

}());