/**
 * Created by i070970 on 8/10/14.
 */
angular.module('sapShared').service('sapSharedUserService', function() {

    var user = {
        firstName: 'Vadim',
        lastName: 'Tomnikov',
        avatar: 'images/shared/vadim.jpg'
    };

    this.setUser = function(u) {
        user = u;
    };

    this.getUser = function(u) {
        return user;
    };

});