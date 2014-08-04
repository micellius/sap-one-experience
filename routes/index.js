/**
 * Created by i070970 on 7/18/14.
 */
exports.get = function(req, res){

    var theme = req.context.theme;

    res.render('index', {
        title: 'One Experience',
        stylesheets: [
            '/stylesheets/themes/' + theme + '/bootstrap.min.css',
            '/stylesheets/themes/' + theme + '/index/login/login.css',
            '/stylesheets/themes/' + theme + '/index/main/main.css',
        ],
        javascripts: [
            // Libs
            '/angular/angular.min.js',
            '/angular-animate/angular-animate.min.js',
            '/angular-bootstrap/ui-bootstrap.min.js',
            '/angular-resource/angular-resource.min.js',
            '/angular-route/angular-route.min.js',
            // Custom
            '/javascripts/index/login/login-module.js',
            '/javascripts/index/main/main-module.js',
            '/javascripts/index/index-module.js',
        ]
    });
};