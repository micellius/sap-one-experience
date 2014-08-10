angular.module('sapShared').service('sapSharedI18nService', [function() {

    var locale,
        messageBundle;

    locale = 'en';

    messageBundle = {
        "en": {
            "login": {
                "title": "SAP One Experience",
                "subtitle": "Grow — Simplify — Lead",
                "description": "Build your working experience",
                "rememberMe": "remember me",
                "forgotPassword": "Forgot password",
                "login": "Login",
                "username": "User name",
                "password": "Password"
            },
            "main": {
                "title": "SAP One Experience"
            }
        }
    };

    this.getMessages = function(bundle) {
        return messageBundle[locale][bundle];
    };
    
    this.translate = function (key) {
        return messageBundle[locale][key] || key;
    };

}]);