/**
 * Created by i070970 on 8/10/14.
 */
angular.module('sapMain').directive('sapMainLanguageButtonDirective', [
    'sapSharedI18nService',
    function(sapSharedI18nService) {
        return {
            template: '<button class="sap-navbar-button sap-language-button">' +
                          '<span>{{locale}}</span>' +
                          '<span class="caret"></span>' +
                      '</button>',
            replace: true,
            scope: true,
            link: function(scope) {
                scope.locale = sapSharedI18nService.getLocale().toUpperCase();
                scope.$on('sapSharedI18nService.localeChanged', function() {
                    scope.locale = sapSharedI18nService.getLocale().toUpperCase();
                });
            }
        }
    }
]);