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
                    'dist/sap-one-experience.min.js': [
                        'public/javascripts/**/*.js'
                    ]
                },
                options: {
                    'banner': '/* <%= pkg.name %> - <%= pkg.version %> */'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-closurecompiler');

    grunt.registerTask('default', ['jslint', 'clean', 'closurecompiler']);

};