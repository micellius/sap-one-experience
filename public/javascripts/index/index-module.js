/**
 * Created by i070970 on 8/3/14.
 */
angular.module('sapIndex', ['sapLogin', 'sapMain']).
    run(['$rootScope', '$location', '$window', function($rootScope, $location, $window) {

        $rootScope.$on('$locationChangeStart', function() {
            $rootScope.fromRoute = $rootScope.toRoute;
            $rootScope.toRoute = $location.path().split('/')[1];

        });

        angular.extend($rootScope, $window['sap-bootstrap']);
    }]);