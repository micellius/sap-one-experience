/**
 * Created by i070970 on 8/3/14.
 */
angular.module('sapLogin').controller('sapLoginController', [
    '$scope', 'sapLoginService', 'sapSharedI18nService',
    function($scope, sapLoginService, sapSharedI18nService) {
        $scope.msg = sapSharedI18nService.getMessages('login');

        this.login = function() {
            sapLoginService.login($scope.username, $scope.password);
        }
    }
]);