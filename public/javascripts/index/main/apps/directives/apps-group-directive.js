/**
 * Created by i070970 on 9/11/14.
 */
(function () {
    'use strict';

    function sapAppsGroupDirective() {
        return {
            template:
                '<div class="sap-apps-group">' +
                    '<h2 class="sap-app-group-title">{{group.title}}</h2>' +
                    '<div ng-transclude></div>' +
                '</div>',
            replace: true,
            scope: {
                group: '=sapAppsGroupDirective'
            },
            transclude: true
        };
    }

    angular.
        module('sapApps').
        directive('sapAppsGroupDirective', [
            sapAppsGroupDirective
        ]);

}());