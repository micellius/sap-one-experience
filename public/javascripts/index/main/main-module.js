/**
 * Created by i070970 on 8/3/14.
 */
(function () {
    'use strict';

    function config($routeProvider) {
        $routeProvider.
            when('/main/:page?', {
                controller: 'sapMainController',
                controllerAs: 'controller',
                templateUrl: 'partials/index/main/main.html'
            });
    }

    angular.
        module('sapMain', ['ngRoute', 'sapShared']).
        config(['$routeProvider', config]);

}());