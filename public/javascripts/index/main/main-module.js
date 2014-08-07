/**
 * Created by i070970 on 8/3/14.
 */
angular.module('sapMain', ['ngRoute']).
    config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/main/:page?', {
                    controller: 'sapMainController',
                    controllerAs: 'controller',
                    templateUrl: 'partials/index/main/main.html'
                });
        }
    ]);