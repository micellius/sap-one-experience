/**
 * Created by i070970 on 8/26/14.
 */
(function () {
    'use strict';

    function sapHomeWidgetsService($http) {

        var widgets,
            promise;

        widgets = [];

        promise = $http({
            method: 'GET',
            url: 'api/home/widgets'
        }).success(function (data) {
            var i, l, results;
            if (data.status === 'OK') {
                results = data.results;
                widgets.length = 0;
                for (i = 0, l = results.length; i < l; i++) {
                    widgets.push(results[i]);
                }
            }
        });

        this.promise = promise;

        this.getWidgets = function () {
            return widgets;
        };

        this.getWidgetContentUrl = function (widgetId, documentId) {
            return 'api/home/widget/' + widgetId + '/document/' + documentId;
        };

        this.getWidgetContent = function (widgetId, documentId) {
            return $http({
                method: 'GET',
                url: this.getWidgetContentUrl(widgetId, documentId)
            });
        };
    }

    angular.
        module('sapHome').
        service('sapHomeWidgetsService', [
            '$http',
            sapHomeWidgetsService
        ]);

}());