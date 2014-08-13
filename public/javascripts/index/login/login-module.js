/**
 * Created by i070970 on 8/3/14.
 */
(function () {
    'use strict';

    function config($routeProvider) {
        $routeProvider.
            when('/login', {
                controller: 'sapLoginController',
                controllerAs: 'controller',
                templateUrl: 'partials/index/login/login.html'
            });
    }

    angular.
        module('sapLogin', ['ngRoute', 'ngAnimate', 'sapShared']).
        config(['$routeProvider', config]);

}());