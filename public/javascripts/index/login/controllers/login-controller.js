/**
 * Created by i070970 on 8/3/14.
 */
angular.module('sapLogin').controller('sapLoginController', ['$scope', 'sapLoginService', function($scope, sapLoginService) {
    $scope.msg = {
        title: 'SAP One Experience',
        subtitle: 'Grow — Simplify — Lead',
        description: 'Build your working experience',
        rememberMe: 'remember me',
        forgotPassword: 'Forgot password',
        login: 'Login',
        username: 'User name',
        password: 'Password'
    };

    this.login = function() {
        sapLoginService.login($scope.username, $scope.password);
    }
}]);