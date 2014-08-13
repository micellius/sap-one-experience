/**
 * Created by i070970 on 8/12/14.
 */
(function () {
    'use strict';

    function sapSharedAuthenticationService($location) {

        var user = {
            firstName: 'Vadim',
            lastName: 'Tomnikov',
            email: 'micellius@gmail.com',
            avatar: 'images/shared/vadim.jpg'
        };

        this.setUser = function (newUser) {
            user = newUser;
        };

        this.getUser = function () {
            return user;
        };

        this.login = function () {
            $location.path('/main');
        };

        this.logout = function () {
            $location.path('/login');
        };

    }

    angular.
        module('sapShared').
        service('sapSharedAuthenticationService', [
            '$location',
            sapSharedAuthenticationService
        ]);

}());