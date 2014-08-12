/**
 * Created by i070970 on 8/10/14.
 */
angular.module('sapMain').service('sapMainPagesService', [function() {

    var pages = [{
        name: 'home',
        icon: 'home'
    }, {
        name: 'apps',
        icon: 'th'
    }, {
        name: 'todos',
        icon: 'check'
    }, {
        name: 'notifications',
        icon: 'bell'
    }, {
        name: 'analytics',
        icon: 'stats'
    }, {
        name: 'documents',
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