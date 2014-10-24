/**
 * Created by i070970 on 9/28/14.
 */
(function () {
    'use strict';

    function sapDocumentsFeedService($http) {

        var documents,
            promise;

        documents = [];

        promise = $http({
            method: 'GET',
            url: 'api/documents'
        }).success(function (data) {
            var i, l, results;
            if (data.status === 'OK') {
                results = data.results;
                documents.length = 0;
                for (i = 0, l = results.length; i < l; i++) {
                    documents.push(results[i]);
                }
            }
        });

        this.promise = promise;

        this.getDocuments = function () {
            return documents;
        };
    }

    angular.
        module('sapDocuments').
        service('sapDocumentsFeedService', [
            '$http',
            sapDocumentsFeedService
        ]);

}());
