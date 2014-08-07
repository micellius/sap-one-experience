/**
 * Created by i070970 on 8/7/14.
 */
angular.module('sapLogin').service('sapLoginService', ['$location', function($location) {

    this.login = function(username, password) {
        $location.path('/main');
    }

}]);