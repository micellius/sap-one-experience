/**
 * Created by i070970 on 8/3/14.
 */
angular.module('sapLogin').controller('sapLoginController', [
    '$scope', 'sapSharedLoginService', 'sapSharedI18nService',
    function($scope, sapSharedLoginService, sapSharedI18nService) {

        $scope.msg = sapSharedI18nService.getMessages();

        $scope.$on('sapSharedI18nService.localeChanged', function() {
            $scope.msg = sapSharedI18nService.getMessages();
        });

        this.login = function() {
            sapSharedLoginService.login($scope.username, $scope.password);
        }
    }
]);