/**
 * Created by i070970 on 9/26/14.
 */
(function () {
    'use strict';

    function sapAnalyticsFeedService($http) {

        var reports,
            promise;

        reports = [];

        promise = $http({
            method: 'GET',
            url: 'api/reports'
        }).success(function (data) {
            var i, l, results;
            if (data.status === 'OK') {
                results = data.results;
                reports.length = 0;
                for (i = 0, l = results.length; i < l; i++) {
                    reports.push(results[i]);
                }
            }
        });

        this.promise = promise;

        this.getReports = function () {
            return reports;
        };
    }

    angular.
        module('sapAnalytics').
        service('sapAnalyticsFeedService', [
            '$http',
            sapAnalyticsFeedService
        ]);

}());