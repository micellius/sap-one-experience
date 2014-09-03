/**
 * Created by i070970 on 8/28/14.
 */
(function () {
    'use strict';

    function sapNotificationsFeedService($http) {

        var notifications,
            promise;

        notifications = [];

        promise = $http({
            method: 'GET',
            url: 'api/notifications'
        }).success(function (data) {
            var i, l, results;
            if (data.status === 'OK') {
                results = data.results;
                notifications.length = 0;
                for (i = 0, l = results.length; i < l; i++) {
                    notifications.push(results[i]);
                }
            }
        });

        this.promise = promise;

        this.getNotifications = function () {
            return notifications;
        };
    }

    angular.
        module('sapNotifications').
        service('sapNotificationsFeedService', [
            '$http',
            sapNotificationsFeedService
        ]);

}());