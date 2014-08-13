/**
 * Created by i070970 on 8/12/14.
 */
(function () {
    'use strict';

    function sapMainUserPopoverDirective(
        $location,
        sapSharedAuthenticationService,
        sapSharedI18nService,
        sapSharedThemeService
    ) {
        return {
            template:
                '<div class="popover bottom sap-user-popover">' +
                    '<div class="arrow"></div>' +
                    '<div class="popover-content">' +
                        '<h5>{{user.firstName}} {{user.lastName}}</h5>' +
                        '<div>{{user.email}}</div>' +
                        '<div class="dropdown" sap-shared-dropdown-directive>' +
                        '<button type="button" class="btn btn-default dropdown-toggle">' +
                            '{{msg.theme}}' +
                            ' <span class="caret"></span>' +
                        '</button>' +
                        '<ul class="dropdown-menu" role="menu">' +
                            '<li ng-repeat="theme in themes"><a ng-click="setTheme(theme)">{{theme}}</a></li>' +
                        '</ul>' +
                        '</div>' +
                    '</div>' +
                    '<h3 class="popover-title" ng-click="logout()">{{msg.logout}}</h3>' +
                '</div>',
            replace: true,
            scope: true,
            link: function (scope) {
                scope.user = sapSharedAuthenticationService.getUser();
                scope.logout = sapSharedAuthenticationService.logout;
                scope.path = $location.path();
                scope.setTheme = sapSharedThemeService.setTheme;
                scope.msg = sapSharedI18nService.getMessages();

                scope.$on('sapSharedI18nService.localeChanged', function () {
                    scope.msg = sapSharedI18nService.getMessages();
                });
            }
        };
    }

    angular.module('sapMain').directive('sapMainUserPopoverDirective', [
        '$location', 'sapSharedAuthenticationService', 'sapSharedI18nService', 'sapSharedThemeService',
        sapMainUserPopoverDirective
    ]);

}());