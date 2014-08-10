angular.module('sapMain').controller('sapMainController', [
    '$scope', '$routeParams', 'sapMainPagesService', 'sapSharedI18nService',
    function($scope, $routeParams, sapMainPagesService, sapSharedI18nService) {

        $scope.msg = sapSharedI18nService.getMessages('main');

        $scope.pages = sapMainPagesService.getPages();

        $scope.currentPage = sapMainPagesService.getPageByName($routeParams.page) || sapMainPagesService.getDefaultPage();

        this.toggleSideBar = function() {
            $scope.sidebarMode = ($scope.sidebarMode === 'toggle' ? '' : 'toggle');
        };

    }
]);