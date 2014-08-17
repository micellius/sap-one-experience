/**
 * Created by i070970 on 8/3/14.
 */
(function () {
    'use strict';

    var SAP_MAIN_PATH = '/main';

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
        constant('SAP_MAIN_PATH', SAP_MAIN_PATH).
        config(['$routeProvider', config]);

}());