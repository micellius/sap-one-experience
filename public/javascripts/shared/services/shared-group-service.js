/**
 * Created by i69489 on 27/8/14.
 */
(function () {
    'use strict';

    function sapSharedGroupService($http) {

        var groups = [];

        $http({
            method: 'GET',
            url: 'api/groups'
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
        module('sapShared').
        service('sapSharedGroupService', [
            '$http',
            sapSharedGroupService
        ]);

}());