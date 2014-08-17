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
            title: 'SAP One Experience',
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
            '/stylesheets/themes/' + theme + '/index/main/apps/apps.css'
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
            '/javascripts/shared/directives/shared-dropdown-directive.js',
            '/javascripts/shared/filters/shared-translate-filter.js',
            // Login
            '/javascripts/index/login/login-module.js',
            '/javascripts/index/login/controllers/login-controller.js',
            // Main
            '/javascripts/index/main/main-module.js',
            '/javascripts/index/main/controllers/main-controller.js',
            '/javascripts/index/main/services/main-pages-service.js',
            '/javascripts/index/main/directives/main-user-button-directive.js',
            '/javascripts/index/main/directives/main-user-popover-directive.js',
            '/javascripts/index/main/directives/main-language-button-directive.js',
            '/javascripts/index/main/directives/main-language-popover-directive.js',
            // Home
            '/javascripts/index/main/home/home-module.js',
            // Apps
            '/javascripts/index/main/apps/apps-module.js',
            // Index
            '/javascripts/index/index-module.js'
        ]
    });
};