/**
 * Created by i070970 on 8/17/14.
 */
(function () {
    'use strict';


    function sapSharedBootstrapService($window, $rootScope) {
        if ($window['sap-bootstrap']) {
            angular.extend($rootScope, $window['sap-bootstrap']);
        }

        this.get = function(key) {
            return $rootScope[key];
        }
    }

    angular.
        module('sapShared').
        service('sapSharedBootstrapService', [
            '$window',
            '$rootScope',
            sapSharedBootstrapService
        ]);

}());