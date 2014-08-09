/**
 * Created by amos on 14-4-9.
 */
var path = require('path');

var HENGINE_HTTP_PORT = 8081,
    HENGINE_TCP_PORT = 10001,
    HENGINE_HOSTNAME = '<%= dm%>';

module.exports = function(grunt){

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            configFile: {
                files: ['Gruntfile.js'],
                options: {
                    reload: true
                }
            },

            scripts: {
                files: ['src/**/*.js']
            },

            css: {
                files: ['src/themes/**/*.css']
            },

            less: {
                files: ['src/less/**/*.less'],
                tasks: ['less']
            },

            views: {
                files: ['src/views/**/*.html']
            },

            protoype: {
                files: ['dev/mockup/**/*.html']
            },

            test: {
                files: ['dev/page/**/*.json']
            },

            options: {
                livereload: true
            }
        },

        less: {
            dev: {
                options: {
                    paths: ['./']
                },
                files: {
                    './src/themes/default/base/base.css': './src/less/default/base/base.less',
                    './src/themes/default/main/style.css': './src/less/default/main/style.less'
                }
            }
        },

        // compass for css sprite
        compass: {
            dist: {
                options: {
                    sassDir: './src/less/default/base',
                    cssDir: './src/less/default/base',
                    imagesDir: './src/themes/default/base',
                    outputStyle: 'expanded'
                }
            }
        },

        localServer: {
            options: {
                server: {
                    port: 80
                },

                router: {
                    page: '/page',
                    template: '/template/cb',
                    mockup: '/mockup',
                    static: '/static_proxy',
                    cgi: '/'
                },

                cgi: {
                    env: 'local',
                    root: __dirname + '/dev/cgi/'
                },

                livereload: true,

                page: {
                    root: __dirname + '/dev/page/',
                    host: '127.0.0.1',
                    hostname: HENGINE_HOSTNAME,
                    port: HENGINE_HTTP_PORT
                },

                template: {
                    host: '127.0.0.1',
                    hostname: HENGINE_HOSTNAME,
                    port: HENGINE_HTTP_PORT
                }
            }
        },

        'hengine-http': {
            options: {
                // override hengine options in config file
                port: HENGINE_HTTP_PORT,
                env: 'local',
                root: __dirname + '/src',
                errorDirectory: 'errors',

                // use port instead path
                // for compatibility of window
                sock: HENGINE_TCP_PORT,

                vhosts: function(){
                    var vhosts = {};

                    vhosts[HENGINE_HOSTNAME] = {
                        root: '/views'
                    };

                    return vhosts;
                }()
            }
        },

        'hengine-tcache': {
            options: {
                // override hengine options in config file

                // use port instead path
                // for compatibility of window
                sock: HENGINE_TCP_PORT,

                root: __dirname + '/src'
            }
        },

        concurrent: {
            dev: {
                tasks: ['hengine-tcache', 'hengine-http', 'localServer', 'watch'],
                options: {
                    limit: 10,
                    logConcurrentOutput: true
                }
            },

            init: {
                tasks: ['svn_fetch:mp']
            }
        }
    });



    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-svn-fetch');
    grunt.loadNpmTasks('grunt-concurrent');

//    grunt.loadNpmTasks('grunt-contrib-sass');
//    grunt.loadNpmTasks('grunt-contrib-compass');

    grunt.loadTasks(__dirname + '/grunt/hengine/tasks');
    grunt.loadTasks(__dirname + '/grunt/localServer/tasks');


    grunt.registerTask('dev', 'launch web server and watch tasks', ['concurrent:dev']);
    grunt.registerTask('refresh', 'launch web server and watch tasks', ['concurrent:refresh']);

};