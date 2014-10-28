/**
 * Created in SAP Labs Israel.
 * Author: Vadim Tomnikov (i070970)
 * Date: 10/25/14
 * Time: 13:09
 */
/**
 * Created by i070970 on 9/11/14.
 */
(function () {
    'use strict';

    function sapAppsAppDirective($compile) {
        return {
            template: '<div class="sap-apps-app"></div>',
            replace: true,
            scope: {
                tile: '=sapAppsAppDirective'
            },
            link: function (scope, element) {
                var id,
                    el;
                id = scope.tile.id;
                id = id[0].toUpperCase() + id.substring(1);
                el = angular.element('<div/>');
                el.attr('sap-' + id.toLowerCase() + '-app-directive', 'tile');
                $compile(el)(scope);
                element.append(el);
            }
        };
    }

    angular.
        module('sapApps').
        directive('sapAppsAppDirective', [
            '$compile',
            sapAppsAppDirective
        ]);

}());