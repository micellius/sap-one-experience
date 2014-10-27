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
                        "dateFormat": "M d, Y H:m:S",
                        "search": "Search"
                    },
                    "g1t1": {
                        "search": "Search",
                        "from": "From",
                        "supplier": "Supplier",
                        "supplierAddress": "Supplier Address",
                        "categoryAssignment": "Category Assignment",
                        "category": "Category",
                        "name": "Name",
                        "street": "Street",
                        "city": "City",
                        "zip": "ZIP Code",
                        "country": "Country",
                        "id": "ID",
                        "Products": "Products",
                        "Product": "Product",
                        "rate": 1,
                        "USD": "USD",
                        "Bread": "Bread",
                        "Milk": "Milk",
                        "Vint Soda": "Vint Soda",
                        "Havina Cola": "Havina Cola",
                        "Fruit Punch": "Fruit Punch",
                        "Cranberry Juice": "Cranberry Juice",
                        "Pink Lemonade": "Pink Lemonade",
                        "DVD Player": "DVD Player",
                        "LCD HDTV": "LCD HDTV",
                        "Whole grain bread": "Whole grain bread",
                        "Low fat milk": "Low fat milk",
                        "Americana Variety - Mix of 6 flavors": "Americana Variety - Mix of 6 flavors",
                        "The Original Key Lime Cola": "The Original Key Lime Cola",
                        "Mango flavor, 8.3 Ounce Cans (Pack of 24)": "Mango flavor, 8.3 Ounce Cans (Pack of 24)",
                        "16-Ounce Plastic Bottles (Pack of 12)": "16-Ounce Plastic Bottles (Pack of 12)",
                        "36 Ounce Cans (Pack of 3)": "36 Ounce Cans (Pack of 3)",
                        "1080P Upconversion DVD Player": "1080P Upconversion DVD Player",
                        "42 inch 1080p LCD with Built-in Blu-ray Disc Player": "42 inch 1080p LCD with Built-in Blu-ray Disc Player",
                        "Exotic Liquids": "Exotic Liquids",
                        "NE 228th": "NE 228th",
                        "Sammamish": "Sammamish",
                        "USA": "USA",
                        "Food": "Food",
                        "House Electronics": "House Electronics",
                        "Household Appliances": "Household Appliances"
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
                        "dateFormat": "d M Y H:m:S",
                        "search": "Поиск"
                    },
                    "g1t1": {
                        "search": "Поиск",
                        "from": "С",
                        "supplier": "Поставщик",
                        "supplierAddress": "Адрес поставщика",
                        "categoryAssignment": "Ассоциированные категории",
                        "category": "Категория",
                        "name": "Имя",
                        "street": "Улица",
                        "city": "Город",
                        "zip": "Индекс",
                        "country": "Страна",
                        "id": "№",
                        "Products": "Продукты",
                        "Product": "Продукт",
                        "rate": 41.8,
                        "USD": "РУБ",
                        "Bread": "Хлеб",
                        "Milk": "Молоко",
                        "Vint Soda": "Газировка",
                        "Havina Cola": "Хавина кола",
                        "Fruit Punch": "Фруктовый пунш",
                        "Cranberry Juice": "Клюквенный сок",
                        "Pink Lemonade": "Розовый лемонад",
                        "DVD Player": "Проигрыватель DVD",
                        "LCD HDTV": "ЖК телевизор",
                        "Whole grain bread": "Цельнозерновой хлеб",
                        "Low fat milk": "Обезжиренное молоко",
                        "Americana Variety - Mix of 6 flavors": "Состав Американа - смесь из 6 вкусов",
                        "The Original Key Lime Cola": "Оригинальная кола из лайма",
                        "Mango flavor, 8.3 Ounce Cans (Pack of 24)": "Вкус манго, банка 235 грамм (24 в упаковке)",
                        "16-Ounce Plastic Bottles (Pack of 12)": "Пластиковая бутылка 0.5 литра (12 в упаковке)",
                        "36 Ounce Cans (Pack of 3)": "Банка 1.0 кг. (3 в упаковке)",
                        "1080P Upconversion DVD Player": "1080P преобразуюший DVD проигрыватель",
                        "42 inch 1080p LCD with Built-in Blu-ray Disc Player": "106.6 см 1080p ЖК телевизок со встроенным Blu-ray проигрывателем",
                        "Exotic Liquids": "Экзотические жидкости",
                        "NE 228th": "228ой переулок",
                        "Sammamish": "Саммамиш",
                        "USA": "США",
                        "Food": "Продукт питания",
                        "House Electronics": "Домашняя электроника",
                        "Household Appliances": "Бытовая техника"
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