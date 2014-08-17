/**
 * Created by i070970 on 8/3/14.
 */
(function () {
    'use strict';

    function config($provide, sapSharedAuthenticationServiceProvider, sapSharedI18nServiceProvider, SAP_LOGIN_PATH, SAP_MAIN_PATH) {
        sapSharedAuthenticationServiceProvider.setLoginPath(SAP_LOGIN_PATH);
        sapSharedAuthenticationServiceProvider.setDefaultPath(SAP_MAIN_PATH);

        $provide.value('setDefaultBundle', sapSharedI18nServiceProvider.setDefaultBundle);
        $provide.value('setDefaultLocale', sapSharedI18nServiceProvider.setDefaultLocale);
    }

    function run($rootScope, $location, sapSharedI18nService, setDefaultBundle, setDefaultLocale) {
        $rootScope.$on('$locationChangeStart', function () {
            $rootScope.fromRoute = $rootScope.toRoute;
            $rootScope.toRoute = $location.path().split('/')[1] || '';
        });

        $rootScope.$on('sapSharedI18nService.localeChanged', function () {
            $rootScope.title = sapSharedI18nService.translate('title');
        });

        setDefaultBundle(function () {
            return $location.path().split('/')[1] || '';
        });

        setDefaultLocale($rootScope.locale || 'en');

        $rootScope.title = sapSharedI18nService.translate('title');
    }

    angular.
        module('sapIndex', ['sapLogin', 'sapMain']).
        config([
            '$provide',
            'sapSharedAuthenticationServiceProvider',
            'sapSharedI18nServiceProvider',
            'SAP_LOGIN_PATH',
            'SAP_MAIN_PATH',
            config
        ]).
        run([
            '$rootScope',
            '$location',
            'sapSharedI18nService',
            'setDefaultBundle',
            'setDefaultLocale',
            run
        ]);

}());