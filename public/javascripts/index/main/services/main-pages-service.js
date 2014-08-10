/**
 * Created by i070970 on 8/10/14.
 */
angular.module('sapMain').service('sapMainPagesService', [function() {

    var pages = [{
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

    this.getPages = function() {
        return pages;
    };

    this.getPageByName = function(pageName) {
        return pages.filter(function(page) {
            return page.name === pageName;
        })[0];
    };

    this.getDefaultPage = function() {
        return pages[0];
    };

}]);