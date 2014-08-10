/**
 * Created by i070970 on 8/10/14.
 */
angular.module('sapMain').directive('sapMainUserButtonDirective', ['sapSharedUserService', function() {
    return {
        template: '<button>' +
                      '<img ng-src="user.avatar" alt="{{user.firstName}} {{user.lastName}}"/>' +
                      '<span class="caret"></span>' +
                  '</button>',
        replace: true,
        link: function(scope) {
            scope.user = sapSharedUserService.getUser();
        }
    }
}]);