/**
 * Created by i070970 on 8/12/14.
 */
angular.module('sapShared').filter('sapSharedTranslateFilter', ['sapSharedI18nService', function(sapSharedI18nService) {
    return function(input, bundle) {
        return sapSharedI18nService.translate(input, bundle);
    };
}]);
