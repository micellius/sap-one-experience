/**
 * Created by i070970 on 8/11/14.
 */
angular.module('sapShared').directive('sapSharedDropdownDirective', [function() {
    return {
        link: function(scope, element) {
            var toggleElement,
                menuElement,
                isOpen;

            toggleElement = angular.element(element[0].querySelector('.dropdown-toggle'));
            menuElement = angular.element(element[0].querySelector('.dropdown-menu'));
            isOpen = false;

            toggleElement.on('click', function() {
                menuElement.css('display', (isOpen = !isOpen) ? 'block' : '');
            });
        }
    }
}]);