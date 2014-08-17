/**
 * Created by i070970 on 8/12/14.
 */
(function () {
    'use strict';

    function sapSharedAuthenticationServiceProvider() {

        var loginPath,
            defaultPath;

        this.setLoginPath = function (path) {
            loginPath = path;
        };

        this.setDefaultPath = function (path) {
            defaultPath = path;
        };

        function sapSharedAuthenticationFactory($location, $http, sapSharedBootstrapService) {

            var bootstrappedUser,
                user,
                isAuth,
                sapSharedAuthenticationService;

            bootstrappedUser = sapSharedBootstrapService.get('user');
            user = bootstrappedUser || {};
            isAuth = !!bootstrappedUser;

            function isAuthenticated() {
                return isAuth;
            }

            function getUser() {
                return user;
            }

            function login(username, password) {
                $http.post('api/login', {
                    username: username,
                    password: password
                }).success(function (data) {
                    isAuth = true;
                    angular.extend(user, data.results);
                    $location.path(defaultPath);
                });
            }

            function logout() {
                $http.post('api/logout', {}).success(function () {
                    var key;
                    for (key in user) {
                        if (user.hasOwnProperty(key)) {
                            delete user[key];
                        }
                    }
                    isAuth = false;
                    $location.path(loginPath);
                });
            }

            sapSharedAuthenticationService = {
                isAuthenticated: isAuthenticated,
                getUser: getUser,
                login: login,
                logout: logout
            };

            return sapSharedAuthenticationService;

        }

        this.$get = [
            '$location',
            '$http',
            'sapSharedBootstrapService',
            sapSharedAuthenticationFactory
        ];

    }

    angular.
        module('sapShared').
        provider('sapSharedAuthenticationService', sapSharedAuthenticationServiceProvider);

}());