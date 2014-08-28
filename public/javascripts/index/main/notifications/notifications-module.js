/**
 * Created by i070970 on 8/3/14.
 */
(function () {
    'use strict';

    function run(sapSharedNotificationsService, sapNotificationsFeedService) {
        sapNotificationsFeedService.promise.success(function () {
            sapSharedNotificationsService.setItems(sapNotificationsFeedService.getNotifications());
        });
    }

    angular.
        module('sapNotifications', ['sapShared']).
        run([
            'sapSharedNotificationsService',
            'sapNotificationsFeedService',
            run
        ]);

}());