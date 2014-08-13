/**
 * Created by i070970 on 8/3/14.
 */
(function () {
    'use strict';

    function config($provide, sapSharedI18nServiceProvider) {
        $provide.value('setDefaultBundle', sapSharedI18nServiceProvider.setDefaultBundle);
        $provide.value('setDefaultLocale', sapSharedI18nServiceProvider.setDefaultLocale);
    }

    function run($rootScope, $location, $window, sapSharedI18nService, setDefaultBundle, setDefaultLocale) {
        $rootScope.$on('$locationChangeStart', function () {
            $rootScope.fromRoute = $rootScope.toRoute;
            $rootScope.toRoute = $location.path().split('/')[1];
        });

        $rootScope.$on('sapSharedI18nService.localeChanged', function () {
            $rootScope.title = sapSharedI18nService.translate('title');
        });

        if ($window['sap-bootstrap']) {
            angular.extend($rootScope, $window['sap-bootstrap']);
        }

        setDefaultBundle(function () {
            return $location.path().split('/')[1];
        });

        setDefaultLocale($rootScope.locale || 'en');

        $rootScope.title = sapSharedI18nService.translate('title');
    }

    angular.
        module('sapIndex', ['sapLogin', 'sapMain']).
        config(['$provide', 'sapSharedI18nServiceProvider', config]).
        run(['$rootScope', '$location', '$window', 'sapSharedI18nService', 'setDefaultBundle', 'setDefaultLocale', run]);

}());