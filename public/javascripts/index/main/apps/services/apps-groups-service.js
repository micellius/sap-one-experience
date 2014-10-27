/**
 * Created by i070970 on 9/8/14.
 */
(function () {
    'use strict';

    function sapAppsGroupsService($http) {

        var groups = [];

        this.promise = $http({
            method: 'GET',
            url: 'api/apps/groups'
        }).success(function (data) {
            var i, l, results;
            results = data.results;
            for (i = 0, l = results.length; i < l; i++) {
                groups.push(results[i]);
            }
        });

        this.getGroups = function () {
            return groups;
        };
    }

    angular.
        module('sapApps').
        service('sapAppsGroupsService', [
            '$http',
            sapAppsGroupsService
        ]);

}());