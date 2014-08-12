angular.module('sapShared').provider('sapSharedI18nService', function sapSharedI18nServiceProvider() {

    var defaultLocale,
        defaultBundle,
        getDefaultLocale,
        getDefaultBundle;

    defaultLocale = 'en';
    defaultBundle = '';

    getDefaultLocale = function () {
        return defaultLocale;
    };

    getDefaultBundle = function () {
        return getDefaultBundle;
    };

    this.setDefaultLocale = function(locale) {
        switch(typeof locale) {
            case 'function':
                getDefaultLocale = locale;
                break;
            case 'string':
                defaultLocale = locale;
                break;
        }
    };

    this.setDefaultBundle = function(bundle) {
        switch(typeof bundle) {
            case 'function':
                getDefaultBundle = bundle;
                break;
            case 'string':
                defaultBundle = bundle;
                break;
        }
    };

    this.$get = ['$rootScope', function sapSharedI18nFactory($rootScope) {

        var messageBundle,
            sapSharedI18nService;

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
                    "title": "SAP One Experience",
                    "home": "Home",
                    "apps": "Applications",
                    "todos": "To-do's",
                    "notifications": "Notifications",
                    "analytics": "Analytics",
                    "documents": "Documents",
                    "theme": "Theme",
                    "logout": "Logout"
                }
            },
            "ru": {
                "login": {
                    "title": "SAP Единое рабочее пространство",
                    "subtitle": "Расти — Упрощать — Лидировать",
                    "description": "Построй своё рабочее пространство",
                    "rememberMe": "запомнить меня",
                    "forgotPassword": "вспомнить пароль",
                    "login": "Войти",
                    "username": "Имя пользователя",
                    "password": "Пароль"
                },
                "main": {
                    "title": "SAP Единое рабочее пространство",
                    "home": "Домашняя страница",
                    "apps": "Приложения",
                    "todos": "Задания",
                    "notifications": "Оповещения",
                    "analytics": "Аналитика",
                    "documents": "Документы",
                    "theme": "Тема",
                    "logout": "Выйти"
                }
            }
        };

        function getLocales() {
            return Object.keys(messageBundle);
        }

        function getLocale() {
            return getDefaultLocale();
        }

        function setLocale(locale) {
            defaultLocale = locale;
            $rootScope.$broadcast('sapSharedI18nService.localeChanged');
        }

        function getMessages(bundle) {
            return messageBundle[getLocale()][bundle || getDefaultBundle()];
        }

        function translate(key, bundle) {
            var scope;
            if(scope = messageBundle[getLocale()]) {
                if(scope[bundle]) {
                    scope = scope[bundle];
                } else {
                    scope = scope[getDefaultBundle()];
                }
            }
            return scope[key] || key;
        }

        sapSharedI18nService = {
            getLocales: getLocales,
            getLocale: getLocale,
            setLocale: setLocale,
            getMessages: getMessages,
            translate: translate
        };

        return sapSharedI18nService;
    }];
});