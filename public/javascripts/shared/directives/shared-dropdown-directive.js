/**
 * Created by i070970 on 8/11/14.
 */
(function () {
    'use strict';

    function sapSharedDropdownDirective() {

        /*jslint unparam: true */
        function link(scope, element) {
            var rootElement,
                toggleElement,
                menuElement,
                isOpen;

            rootElement = element[0];
            toggleElement = angular.element(rootElement.querySelector('.dropdown-toggle'));
            menuElement = angular.element(rootElement.querySelector('.dropdown-menu'));
            isOpen = false;

            toggleElement.on('click', function () {
                isOpen = !isOpen;
                menuElement.css('display', isOpen ? 'block' : '');
            });
        }

        return {
            link: link
        };
    }

    angular.
        module('sapShared').
        directive('sapSharedDropdownDirective', sapSharedDropdownDirective);

}());