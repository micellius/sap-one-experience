(function () {
    'use strict';

    function sapMainController(
        $scope,
        $routeParams,
        sapMainPagesService,
        sapSharedAuthenticationService,
        sapSharedI18nService,
        sapSharedThemeService,
        sapSharedGroupService
    ) {

        $scope.msg = sapSharedI18nService.getMessages('main');
        $scope.user = sapSharedAuthenticationService.getUser();
        $scope.pages = sapMainPagesService.getPages();
        $scope.currentPage = sapMainPagesService.getPageByName($routeParams.page) ||
            sapMainPagesService.getDefaultPage();
        $scope.themes = sapSharedThemeService.getThemes();
        $scope.isUserPopoverVisible = false;
        $scope.isLanguagePopoverVisible = false;

        this.updateBindings = function(){
            $scope.$apply();
        };

        $scope.userGroups = sapSharedGroupService.getGroups(this.updateBindings);

        $scope.$on('sapSharedI18nService.localeChanged', function () {
            $scope.msg = sapSharedI18nService.getMessages('main');
        });



        this.toggleSideBar = function () {
            $scope.sidebarMode = ($scope.sidebarMode === 'toggle' ? '' : 'toggle');
        };

        this.toggleUserPopover = function () {
            $scope.isUserPopoverVisible = !$scope.isUserPopoverVisible;
        };

        this.toggleLanguagePopover = function () {
            $scope.isLanguagePopoverVisible = !$scope.isLanguagePopoverVisible;
        };

        this.logout = function () {
            $scope.isUserPopoverVisible = false;
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
            'sapSharedGroupService',
            sapMainController
        ]);

}());