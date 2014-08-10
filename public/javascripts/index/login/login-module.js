/**
 * Created by i070970 on 8/3/14.
 */
angular.module('sapLogin', ['ngRoute', 'ngAnimate', 'sapShared']).
    config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/login', {
                    controller: 'sapLoginController',
                    controllerAs: 'controller',
                    templateUrl: 'partials/index/login/login.html'
                });
        }
    ]);