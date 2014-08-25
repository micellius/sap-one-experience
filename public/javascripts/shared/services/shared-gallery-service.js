/**
 * Created by i070970 on 8/25/14.
 */
(function () {
    'use strict';


    function sapSharedGalleryService() {

        var items = [];

        this.setItems = function(collection) {
            items.length = 0;
            Array.prototype.forEach.call(collection, function(item) {
                items.push(item);
            });
        };

        this.getItems = function() {
            return items;
        };
    }

    angular.
        module('sapShared').
        service('sapSharedGalleryService', [
            sapSharedGalleryService
        ]);

}());