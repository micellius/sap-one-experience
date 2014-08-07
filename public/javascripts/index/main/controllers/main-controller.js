angular.module('sapMain').controller('sapMainController', ['$scope', function($scope) {

    $scope.msg = {
        title: 'SAP One Experience'
    };

    $scope.pages = [{
        name: 'home',
        title: 'Home',
        icon: 'home'
    }, {
        name: 'apps',
        title: 'Applications',
        icon: 'th'
    }, {
        name: 'todos',
        title: 'To-do\'s',
        icon: 'check'
    }, {
        name: 'notifications',
        title: 'Notifications',
        icon: 'bell'
    }, {
        name: 'analytics',
        title: 'Analytics',
        icon: 'stats'
    }, {
        name: 'documents',
        title: 'Documents',
        icon: 'folder-open'
    }];

    this.toggleSideBar = function() {
        $scope.sidebarMode = ($scope.sidebarMode === 'toggle' ? '' : 'toggle');
    };

}]);