var opts = {mock: true};
var authenticationService = require('./services/authentication.js')(opts);
var themeService = require('./services/theme.js')(opts);
var homeService = require('./services/home.js')(opts);
var notificationsService = require('./services/notification.js')(opts);
var todoService = require('./services/todo.js')(opts);
var analyticService = require('./services/analytic.js')(opts);
var documentService = require('./services/document.js')(opts);

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ['.grunt', 'dist'],
        jslint: {
            client: {
                src: ['public/javascripts/**/*.js'],
                directives: {
                    predef: [
                        'angular'
                    ],
                    plusplus: true
                }
            }
        },
        closurecompiler: {
            minify: {
                files: {
                    'dist/javascripts/<%= pkg.name %>-<%= pkg.version %>.min.js': [
                        // Shared
                        'public/javascripts/shared/shared-module.js',
                        'public/javascripts/shared/**/shared-*.js',
                        // Login
                        'public/javascripts/index/login/login-module.js',
                        'public/javascripts/index/login/**/login-*.js',
                        // Home
                        'public/javascripts/index/main/home/home-module.js',
                        'public/javascripts/index/main/home/**/home-*.js',
                        // Apps
                        'public/javascripts/index/main/apps/apps-module.js',
                        'public/javascripts/index/main/apps/**/apps-*.js',
                        // Todos
                        'public/javascripts/index/main/todos/todos-module.js',
                        'public/javascripts/index/main/todos/**/todos-*.js',
                        // Notifications
                        'public/javascripts/index/main/notifications/notifications-module.js',
                        'public/javascripts/index/main/notifications/**/notifications-*.js',
                        // Analytics
                        'public/javascripts/index/main/analytics/analytics-module.js',
                        'public/javascripts/index/main/analytics/**/analytics-*.js',
                        // Documents
                        'public/javascripts/index/main/documents/documents-module.js',
                        'public/javascripts/index/main/documents/**/documents-*.js',
                        // Main
                        'public/javascripts/index/main/main-module.js',
                        'public/javascripts/index/main/**/main-*.js',
                        // Index
                        'public/javascripts/index/index-module.js'
                    ]
                },
                options: {
                    'banner': '/* <%= pkg.name %>-<%= pkg.version %> */'
                    //'compilation_level': 'ADVANCED_OPTIMIZATIONS',
                    //'create_source_map': '<%= pkg.name %>-<%= pkg.version %>.min.js.map'
                }
            }
        },
        jade: {
            compile: {
                options: {
                    pretty: true,
                    data: {
                        bootstrap: JSON.stringify({
                            dir: 'ltr',
                            locale: 'en',
                            theme: 'default',
                            user: null
                        }),
                        stylesheets: [
                            'stylesheets/bootstrap.min.css',
                            'stylesheets/<%= pkg.name %>-<%= pkg.version %>.min.css'
                        ],
                        javascripts: [
                            'javascripts/angular.min.js',
                            'javascripts/angular-animate.min.js',
                            'javascripts/angular-route.min.js',
                            'javascripts/<%= pkg.name %>-<%= pkg.version %>.min.js'
                        ]
                    }
                },
                files: {
                    'dist/index.html': ['views/index.jade']
                }
            }
        },
        less: {
            dist: {
                options: {
                    rootpath: '../',
                    compress: true,
                    ieCompat: false,
                    preprocess: function(src) {
                        return '@import "public/stylesheets/themes/default/less/variables.less";\n'+ src;
                    }
                },
                files: {
                    'public/stylesheets/themes/default/index/login/login.css': 'public/stylesheets/index/login/login.less',
                    'public/stylesheets/themes/default/index/main/main.css': 'public/stylesheets/index/main/main.less',
                    'public/stylesheets/themes/default/index/main/home/home.css': 'public/stylesheets/index/main/home/home.less',
                    'public/stylesheets/themes/default/index/main/apps/apps.css': 'public/stylesheets/index/main/apps/apps.less',
                    'public/stylesheets/themes/default/index/main/todos/todos.css': 'public/stylesheets/index/main/todos/todos.less',
                    'public/stylesheets/themes/default/index/main/notifications/notifications.css': 'public/stylesheets/index/main/notifications/notifications.less',
                    'public/stylesheets/themes/default/index/main/analytics/analytics.css': 'public/stylesheets/index/main/analytics/analytics.less',
                    'public/stylesheets/themes/default/index/main/documents/documents.css': 'public/stylesheets/index/main/documents/documents.less'
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    'dist/stylesheets/<%= pkg.name %>-<%= pkg.version %>.min.css': [
                        'public/stylesheets/themes/default/index/login/login.css',
                        'public/stylesheets/themes/default/index/main/main.css',
                        'public/stylesheets/themes/default/index/main/*/*.css'
                    ]
                }
            }
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: [
                        'bower_components/angular/angular.min.js',
                        'bower_components/angular/angular.min.js.map',
                        'bower_components/angular-animate/angular-animate.min.js',
                        'bower_components/angular-animate/angular-animate.min.js.map',
                        'bower_components/angular-route/angular-route.min.js',
                        'bower_components/angular-route/angular-route.min.js.map'
                    ],
                    dest: 'dist/javascripts/'
                }, {
                    expand: true,
                    cwd: 'public/stylesheets/themes/default/css',
                    src: ['**'],
                    dest: 'dist/stylesheets/'
                }, {
                    expand: true,
                    cwd: 'public/images/',
                    src: ['**'],
                    dest: 'dist/images/'
                }, {
                    expand: true,
                    cwd: 'public/images/shared/',
                    src: ['favicon.png'],
                    dest: 'dist/'
                }, {
                    expand: true,
                    flatten: true,
                    src: [
                        'public/stylesheets/themes/default/fonts/*'
                    ],
                    dest: 'dist/fonts/'
                }, {
                    expand: true,
                    cwd: 'public/partials/',
                    src: ['**'],
                    dest: 'dist/partials/'
                }]
            }
        },
        'string-replace': {
            css: {
                options: {
                    replacements: [{
                        pattern: /\(\/images\//gm,
                        replacement: '(../images/'
                    }]
                },
                files: {
                    'dist/stylesheets/<%= pkg.name %>-<%= pkg.version %>.min.css': 'dist/stylesheets/<%= pkg.name %>-<%= pkg.version %>.min.css'
                }
            },
            js: {
                options: {
                    replacements: [{
                        pattern: /\.post\(/gm,
                        replacement: '.get('
                    }]
                },
                files: {
                    'dist/javascripts/<%= pkg.name %>-<%= pkg.version %>.min.js': 'dist/javascripts/<%= pkg.name %>-<%= pkg.version %>.min.js'
                }
            }
        },
        'file-creator': {
            api: {
                "dist/api/themes": function (fs, fd, done) {
                    var data = themeService.getThemes();
                    fs.write(fd, new Buffer(data), 0, data.length, 0, done);
                },
                "dist/api/login": function (fs, fd, done) {
                    var data = authenticationService.login();
                    fs.write(fd, new Buffer(data), 0, data.length, 0, done);
                },
                "dist/api/logout": function (fs, fd, done) {
                    var data = authenticationService.logout();
                    fs.write(fd, new Buffer(data), 0, data.length, 0, done);
                },
                "dist/api/home/widgets": function (fs, fd, done) {
                    var data = homeService.getWidgets();
                    fs.mkdirSync("dist/api/home/widget");
                    JSON.parse(data).results.forEach(function(item) {
                        fs.mkdirSync("dist/api/home/widget/" + item.widgetId);
                        fs.mkdirSync("dist/api/home/widget/" + item.widgetId + "/document");
                        fs.writeFileSync(
                            "dist/api/home/widget/" + item.widgetId + "/document/" + item.documentId,
                            homeService.getWidget({
                                params: {
                                    widgetId: item.widgetId
                                }
                            })
                        );
                    });
                    fs.write(fd, new Buffer(data), 0, data.length, 0, done);
                },
                "dist/api/notifications": function (fs, fd, done) {
                    var data = notificationsService.getNotifications();
                    fs.write(fd, new Buffer(data), 0, data.length, 0, done);
                },
                "dist/api/todos": function (fs, fd, done) {
                    var data = todoService.getTodos();
                    fs.write(fd, new Buffer(data), 0, data.length, 0, done);
                },
                "dist/api/reports": function (fs, fd, done) {
                    var data = analyticService.getReports();
                    fs.write(fd, new Buffer(data), 0, data.length, 0, done);
                },
                "dist/api/documents": function (fs, fd, done) {
                    var data = documentService.getDocuments();
                    fs.write(fd, new Buffer(data), 0, data.length, 0, done);
                }
            }
        },
        'gh-pages': {
            local: {
                options: {
                    base: 'dist',
                    message: 'Generate gh-pages with Grunt task gh-pages:local'
                },
                src: ['**']
            },
            travis: {
                options: {
                    repo: 'https://' + process.env.GH_TOKEN + '@github.com/micellius/sap-one-experience.git',
                    base: 'dist',
                    message: 'Generate gh-pages with Grunt task gh-pages:travis',
                    user: {
                        name: 'Travis CI',
                        email: 'travis@localhost.localdomain'
                    },
                    silent: true
                },
                src: ['**']
            }
        }
    });

    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-closurecompiler');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-file-creator');
    grunt.loadNpmTasks('grunt-gh-pages');

    grunt.registerTask('build', [
        'jslint',
        'clean',
        'closurecompiler',
        'jade',
        'less',
        'cssmin',
        'copy',
        'string-replace',
        'file-creator'
    ]);
    grunt.registerTask('publish', ['gh-pages:local']);
    grunt.registerTask('default', ['build']);

};