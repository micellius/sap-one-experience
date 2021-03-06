/**
 * Created by i070970 on 7/18/14.
 */
exports.get = function(req, res){

    var theme = req.context.theme,
        dir = req.context.dir,
        locale = req.context.locale,
        user = req.context.user;

    res.render('index', {
        bootstrap: JSON.stringify({
            dir: dir,
            locale: locale,
            theme: theme,
            user: user
        }),
        stylesheets: [
            '/stylesheets/themes/' + theme + '/css/bootstrap.min.css',
            '/stylesheets/themes/' + theme + '/index/login/login.css',
            '/stylesheets/themes/' + theme + '/index/main/main.css',
            '/stylesheets/themes/' + theme + '/index/main/home/home.css',
            '/stylesheets/themes/' + theme + '/index/main/apps/apps.css',
            '/stylesheets/themes/' + theme + '/index/main/todos/todos.css',
            '/stylesheets/themes/' + theme + '/index/main/notifications/notifications.css',
            '/stylesheets/themes/' + theme + '/index/main/analytics/analytics.css',
            '/stylesheets/themes/' + theme + '/index/main/documents/documents.css'
        ],
        javascripts: [
            // Libs
            '/angular/angular.min.js',
            '/angular-animate/angular-animate.min.js',
            '/angular-route/angular-route.min.js',
            // Shared
            '/javascripts/shared/shared-module.js',
            '/javascripts/shared/services/shared-bootstrap-service.js',
            '/javascripts/shared/services/shared-authentication-service.js',
            '/javascripts/shared/services/shared-i18n-service.js',
            '/javascripts/shared/services/shared-theme-service.js',
            '/javascripts/shared/services/shared-css-service.js',
            '/javascripts/shared/services/shared-gallery-service.js',
            '/javascripts/shared/services/shared-notifications-service.js',
            '/javascripts/shared/directives/shared-dropdown-directive.js',
            '/javascripts/shared/filters/shared-translate-filter.js',
            // Login
            '/javascripts/index/login/login-module.js',
            '/javascripts/index/login/controllers/login-controller.js',
            // Home
            '/javascripts/index/main/home/home-module.js',
            '/javascripts/index/main/home/controllers/home-controller.js',
            '/javascripts/index/main/home/services/home-widgets-service.js',
            '/javascripts/index/main/home/services/home-layout-service.js',
            '/javascripts/index/main/home/directives/home-widget-directive.js',
            // G1t1
            '/javascripts/index/main/apps/g1t1/g1t1-module.js',
            '/javascripts/index/main/apps/g1t1/services/g1t1-feed-service.js',
            '/javascripts/index/main/apps/g1t1/directives/g1t1-app-directive.js',
            // Apps
            '/javascripts/index/main/apps/apps-module.js',
            '/javascripts/index/main/apps/controllers/apps-controller.js',
            '/javascripts/index/main/apps/services/apps-groups-service.js',
            '/javascripts/index/main/apps/directives/apps-group-directive.js',
            '/javascripts/index/main/apps/directives/apps-tile-directive.js',
            '/javascripts/index/main/apps/directives/apps-app-directive.js',
            // Todos
            '/javascripts/index/main/todos/todos-module.js',
            '/javascripts/index/main/todos/controllers/todos-controller.js',
            '/javascripts/index/main/todos/services/todos-feed-service.js',
            '/javascripts/index/main/todos/directives/todos-item-directive.js',
            // Notifications
            '/javascripts/index/main/notifications/notifications-module.js',
            '/javascripts/index/main/notifications/controllers/notifications-controller.js',
            '/javascripts/index/main/notifications/services/notifications-feed-service.js',
            '/javascripts/index/main/notifications/directives/notifications-item-directive.js',
            // Analytics
            '/javascripts/index/main/analytics/analytics-module.js',
            '/javascripts/index/main/analytics/controllers/analytics-controller.js',
            '/javascripts/index/main/analytics/services/analytics-feed-service.js',
            '/javascripts/index/main/analytics/directives/analytics-list-directive.js',
            // Documents
            '/javascripts/index/main/documents/documents-module.js',
            '/javascripts/index/main/documents/controllers/documents-controller.js',
            '/javascripts/index/main/documents/services/documents-feed-service.js',
            '/javascripts/index/main/documents/directives/documents-list-directive.js',
            // Main
            '/javascripts/index/main/main-module.js',
            '/javascripts/index/main/controllers/main-controller.js',
            '/javascripts/index/main/services/main-pages-service.js',
            '/javascripts/index/main/directives/main-user-button-directive.js',
            '/javascripts/index/main/directives/main-user-popover-directive.js',
            '/javascripts/index/main/directives/main-language-button-directive.js',
            '/javascripts/index/main/directives/main-language-popover-directive.js',
            '/javascripts/index/main/directives/main-gallery-button-directive.js',
            '/javascripts/index/main/directives/main-gallery-popover-directive.js',
            '/javascripts/index/main/directives/main-notifications-button-directive.js',
            '/javascripts/index/main/directives/main-notifications-popover-directive.js',
            // Index
            '/javascripts/index/index-module.js'
        ]
    });
};