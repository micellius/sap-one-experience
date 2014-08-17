/**
 * Created by i070970 on 8/3/14.
 */
(function () {
    'use strict';

    var SAP_LOGIN_PATH = '/login';

    function config($routeProvider) {
        $routeProvider.
            when(SAP_LOGIN_PATH, {
                controller: 'sapLoginController',
                controllerAs: 'controller',
                templateUrl: 'partials/index/login/login.html'
            });
    }

    function run($rootScope, $location, sapSharedAuthenticationService) {
        $rootScope.$on('$locationChangeStart', function(event) {
            if($location.path() !== SAP_LOGIN_PATH && !sapSharedAuthenticationService.isAuthenticated()) {
                $location.path(SAP_LOGIN_PATH);
            }
        });
    }

    angular.
        module('sapLogin', ['ngRoute', 'ngAnimate', 'sapShared']).
        constant('SAP_LOGIN_PATH', SAP_LOGIN_PATH).
        config(['$routeProvider', config]).
        run(['$rootScope', '$location', 'sapSharedAuthenticationService', run]);

}());