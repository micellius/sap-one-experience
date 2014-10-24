/**
 * Created by i070970 on 8/12/14.
 */
(function () {
    'use strict';

    function sapSharedI18nServiceProvider() {

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
            return defaultBundle;
        };

        this.setDefaultLocale = function (locale) {
            switch (typeof locale) {
            case 'function':
                getDefaultLocale = locale;
                break;
            case 'string':
                defaultLocale = locale;
                break;
            }
        };

        this.setDefaultBundle = function (bundle) {
            switch (typeof bundle) {
            case 'function':
                getDefaultBundle = bundle;
                break;
            case 'string':
                defaultBundle = bundle;
                break;
            }
        };

        function sapSharedI18nFactory($rootScope) {

            var messageBundle,
                sapSharedI18nService;

            messageBundle = {
                "en": {
                    "": {
                        "title": "SAP One Experience"
                    },
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
                        "logout": "Logout",
                        "languageSwitch": "Language",
                        "userProfile": "User profile",
                        "gallerySwitch": "Galley",
                        "notificationsSwitch": "Notifications",
                        "homeGalleryTitle": "Widgets",
                        "appsGalleryTitle": "Applications",
                        "dataset": "Dataset",
                        "story": "Story",
                        "report": "Report",
                        "shared": "Shared",
                        "submitted": "Submitted",
                        "changedOn": "Changed On",
                        "months": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                        "dateFormat": "M d, Y H:m:S"
                    }
                },
                "ru": {
                    "": {
                        "title": "SAP One Experience"
                    },
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
                        "notifications": "Уведомления",
                        "analytics": "Аналитика",
                        "documents": "Документы",
                        "theme": "Тема",
                        "logout": "Выйти",
                        "languageSwitch": "Язык",
                        "userProfile": "Профиль пользователя",
                        "gallerySwitch": "Галлерея",
                        "notificationsSwitch": "Уведомления",
                        "homeGalleryTitle": "Виджеты",
                        "appsGalleryTitle": "Приложения",
                        "dataset": "Данные",
                        "story": "История",
                        "report": "Отчет",
                        "shared": "Коллективный",
                        "submitted": "Опубликованный",
                        "changedOn": "Изменено",
                        "months": ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"],
                        "dateFormat": "d M Y H:m:S"
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
                scope = messageBundle[getLocale()];
                if (scope) {
                    if (scope[bundle]) {
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
        }

        this.$get = ['$rootScope', sapSharedI18nFactory];
    }

    angular.
        module('sapShared').
        provider('sapSharedI18nService', sapSharedI18nServiceProvider);

}());