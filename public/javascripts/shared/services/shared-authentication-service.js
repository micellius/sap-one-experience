/**
 * Created by i070970 on 8/12/14.
 */
angular.module('sapShared').service('sapSharedAuthenticationService', ['$location', function($location) {

    var user = {
        firstName: 'Vadim',
        lastName: 'Tomnikov',
        email: 'micellius@gmail.com',
        avatar: 'images/shared/vadim.jpg'
    };

    this.setUser = function(u) {
        user = u;
    };

    this.getUser = function() {
        return user;
    };

    this.login = function(username, password) {
        $location.path('/main');
    };

    this.logout = function() {
        $location.path('/login');
    };

}]);