/**
 * Created by i070970 on 8/12/14.
 */
(function () {
    'use strict';

    function sapMainLanguagePopoverDirective(sapSharedI18nService) {
        return {
            template:
                '<div class="popover bottom sap-language-popover">' +
                    '<div class="arrow"></div>' +
                    '<div class="popover-content">' +
                        '<ul class="list-group">' +
                            '<li class="list-group-item" ng-repeat="locale in locales" ng-click="setLocale(locale)">' +
                                '{{locale | uppercase}}' +
                            '</li>' +
                        '</ul>' +
                    '</div>' +
                '</div>',
            replace: true,
            scope: true,
            link: function (scope) {
                scope.locales = sapSharedI18nService.getLocales();
                scope.setLocale = sapSharedI18nService.setLocale;
            }
        };
    }

    angular.
        module('sapMain').
        directive('sapMainLanguagePopoverDirective', [
            'sapSharedI18nService',
            sapMainLanguagePopoverDirective
        ]);

}());