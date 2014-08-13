/**
 * Created by i070970 on 8/12/14.
 */
(function () {
    'use strict';

    function sapSharedTranslateFilter(sapSharedI18nService) {
        return function (input, bundle) {
            return sapSharedI18nService.translate(input, bundle);
        };
    }

    angular.
        module('sapShared').
        filter('sapSharedTranslateFilter', [
            'sapSharedI18nService',
            sapSharedTranslateFilter
        ]);

}());
