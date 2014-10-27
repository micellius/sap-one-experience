(function () {
    'use strict';

    function sapMainController(
        $scope,
        $routeParams,
        sapMainPagesService,
        sapSharedAuthenticationService,
        sapSharedI18nService,
        sapSharedThemeService
    ) {

        $scope.msg = sapSharedI18nService.getMessages('main');
        $scope.user = sapSharedAuthenticationService.getUser();
        $scope.pages = sapMainPagesService.getPages();
        $scope.currentPage = sapMainPagesService.getPageByName($routeParams.page) ||
            sapMainPagesService.getDefaultPage();
        $scope.themes = sapSharedThemeService.getThemes();
        $scope.isUserPopoverVisible = false;
        $scope.isLanguagePopoverVisible = false;
        $scope.isGalleryPopoverVisible = false;

        $scope.$on('sapSharedI18nService.localeChanged', function () {
            $scope.msg = sapSharedI18nService.getMessages('main');
        });

        $scope.$on('closePanels', function () {
            $scope.sidebarMode = 'toggle';
        });

        this.toggleSideBar = function () {
            $scope.sidebarMode = ($scope.sidebarMode ? '' : 'toggle');
        };

        this.toggleUserPopover = function () {
            $scope.isUserPopoverVisible = !$scope.isUserPopoverVisible;
        };

        this.toggleLanguagePopover = function () {
            $scope.isLanguagePopoverVisible = !$scope.isLanguagePopoverVisible;
        };

        this.toggleGalleryPopover = function () {
            $scope.isGalleryPopoverVisible = !$scope.isGalleryPopoverVisible;
        };

        this.toggleNotificationsPopover = function () {
            $scope.isNotificationsPopoverVisible = !$scope.isNotificationsPopoverVisible;
        };

        this.logout = function () {
            sapSharedAuthenticationService.logout();
        };

    }

    angular.
        module('sapMain').
        controller('sapMainController', [
            '$scope',
            '$routeParams',
            'sapMainPagesService',
            'sapSharedAuthenticationService',
            'sapSharedI18nService',
            'sapSharedThemeService',
            sapMainController
        ]);

}());