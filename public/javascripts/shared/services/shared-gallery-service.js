/**
 * Created by i070970 on 8/25/14.
 */
(function () {
    'use strict';


    function sapSharedGalleryService() {

        var items = [],
            messages = {};

        this.setItems = function (collection) {
            items.length = 0;
            Array.prototype.forEach.call(collection, function (item) {
                items.push(item);
            });
        };

        this.getItems = function () {
            return items;
        };

        this.setMessages = function (msg) {
            var key,
                value;
            for (key in msg) {
                if (msg.hasOwnProperty(key)) {
                    value = msg[key];
                    if (value) {
                        messages[key] = value;
                    } else {
                        delete messages[key];
                    }
                }
            }
        };

        this.getMessages = function () {
            return messages;
        };
    }

    angular.
        module('sapShared').
        service('sapSharedGalleryService', [
            sapSharedGalleryService
        ]);

}());