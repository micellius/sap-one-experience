/**
 * Created by i070970 on 8/3/14.
 */
angular.module('sapLogin').controller('sapLoginController', [
    '$scope', 'sapSharedAuthenticationService', 'sapSharedI18nService',
    function($scope, sapSharedAuthenticationService, sapSharedI18nService) {

        $scope.msg = sapSharedI18nService.getMessages();

        $scope.$on('sapSharedI18nService.localeChanged', function() {
            $scope.msg = sapSharedI18nService.getMessages();
        });

        this.login = function() {
            sapSharedAuthenticationService.login($scope.username, $scope.password);
        }
    }
]);