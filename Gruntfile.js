module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ['dist'],
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
                        // Main
                        'public/javascripts/index/main/main-module.js',
                        'public/javascripts/index/main/**/main-*.js',
                        // Home
                        'public/javascripts/index/main/home/home-module.js',
                        'public/javascripts/index/main/home/**/home-*.js',
                        // Home
                        'public/javascripts/index/main/home/apps-module.js',
                        'public/javascripts/index/main/home/**/apps-*.js',
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
                            title: 'SAP One Experience',
                            dir: 'ltr',
                            locale: 'en',
                            theme: 'default'
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
        cssmin: {
            combine: {
                files: {
                    'dist/stylesheets/<%= pkg.name %>-<%= pkg.version %>.min.css': [
                        'public/stylesheets/themes/default/index/login/login.css',
                        'public/stylesheets/themes/default/index/main/main.css',
                        'public/stylesheets/themes/default/index/main/home/home.css'
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
                        'public/stylesheets/themes/default/fonts/*',
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
            dist: {
                options: {
                    replacements: [{
                        pattern: /\(\/images\//gm,
                        replacement: '(../images/'
                    }]
                },
                files: {
                    'dist/stylesheets/<%= pkg.name %>-<%= pkg.version %>.min.css': 'dist/stylesheets/<%= pkg.name %>-<%= pkg.version %>.min.css'
                }
            }
        },
        'file-creator': {
            api: {
                "dist/api/themes": function(fs, fd, done) {
                    fs.writeSync(fd, '{"status":"OK","results":[]}');
                    done();
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-closurecompiler');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-file-creator');

    grunt.registerTask('default', [
        'jslint',
        'clean',
        'closurecompiler',
        'jade',
        'cssmin',
        'copy',
        'string-replace',
        'file-creator'
    ]);

};