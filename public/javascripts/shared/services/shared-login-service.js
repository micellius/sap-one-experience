/**
 * Created by i070970 on 8/7/14.
 */
angular.module('sapShared').service('sapSharedLoginService', ['$location', function($location) {

    this.login = function(username, password) {
        $location.path('/main');
    };

    this.logout = function() {
        $location.path('/login');
    };

}]);