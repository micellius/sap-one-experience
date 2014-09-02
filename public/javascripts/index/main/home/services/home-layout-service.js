/**
 * Created by i070970 on 8/31/14.
 */
(function () {
    'use strict';

    var numberOfCells = 60,
        cell = 100 / numberOfCells;

    function sapHomeLayoutService() {

        this.getWidgetCss = function (layout) {
            return {
                'position': 'absolute',
                'height': '0',
                'margin-top': (layout.top - 1) * cell + '%',
                'left': (layout.left - 1) * cell + '%',
                'width': layout.width * cell + '%',
                'padding-bottom': layout.height * cell + '%'
            };
        };

    }

    angular.
        module('sapHome').
        service('sapHomeLayoutService', [
            sapHomeLayoutService
        ]);

}());