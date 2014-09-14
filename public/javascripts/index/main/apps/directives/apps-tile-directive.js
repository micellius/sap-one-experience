/**
 * Created by i070970 on 9/11/14.
 */
(function () {
    'use strict';

    function sapAppsTileDirective() {
        return {
            template:
                '<div class="sap-apps-tile panel panel-default">' +
                    '<h3 class="sap-apps-tile-header">' +
                        '{{tile.title}}' +
                        '<small class="sap-apps-tile-header-subtitle">{{tile.subtitle}}</small>' +
                    '</h3>' +
                    '<div class="sap-apps-tile-content">' +
                        '<span ng-if="tile.icon" class="text-primary glyphicon glyphicon-{{tile.icon}}"></span>' +
                    '</div>' +
                    '<div class="sap-apps-tile-footer">{{tile.number}} {{tile.info}}</div>' +
                '</div>',
            replace: true,
            scope: {
                tile: '=sapAppsTileDirective'
            }
        };
    }

    angular.
        module('sapApps').
        directive('sapAppsTileDirective', [
            sapAppsTileDirective
        ]);

}());