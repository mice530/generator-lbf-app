/**
 * Created by amos on 14-4-9.
 */
var path = require('path'),
    spriteLessTemplate = require('./grunt/sprite/lessTemplate');

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

            sprites: {
                files: ['src/less/**/*.png', 'Gruntfile.js', 'grunt/sprite/**/*'],
                tasks: ['sprite']
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

        sprite: {
            icons: {
                src: 'src/less/base/icons/**/*.png',
                destImg: 'src/themes/default/base/images/icons.png',
                destCSS: 'src/less/base/icons.less',
                padding: 10,
                cssFormat: 'less',
                engine: 'phantomjs',

                // More information can be found below
                cssTemplate: spriteLessTemplate,

                // OPTIONAL: Manual override for imgPath specified in CSS
                imgPath: '{root}/themes/default/base/images/icons.png',

                // OPTIONAL: Map variable of each sprite
                cssVarMap: function (sprite) {
                    // `sprite` has `name`, `image` (full path), `x`, `y`
                    //   `width`, `height`, `total_width`, `total_height`
                    // EXAMPLE: Prefix all sprite names with 'sprite-'
                    sprite.name = 'icon-' + sprite.name;
                }
            }            
        },

        localServer: {
            options: {
                server: {
                    port: 80
                },

                routes: [
                    ['/page', 'page', {
                        root: __dirname + '/dev/page/',
                        host: '127.0.0.1',
                        hostname: HENGINE_HOSTNAME,
                        port: HENGINE_HTTP_PORT
                    }],
                    ['/template', 'template', {
                        host: '127.0.0.1',
                        hostname: HENGINE_HOSTNAME,
                        port: HENGINE_HTTP_PORT
                    }],
                    ['/mockup', 'static', {
                        root: 'dev/mockup'
                    }],
                    ['/static_proxy', 'static', {
                        root: 'src'
                    }],
                    ['/', 'cgi', {
                        env: 'local',
                        root: __dirname + '/dev/cgi/'
                    }]
                ]
            }
        },

        'hengine-http': {
            // override hengine options in config file
            options: {
                // override hengine options in config file
                port: HENGINE_HTTP_PORT,
                // setup env
                env: 'local',
                // use debug mode
                debug: true,

                // setup dir
                root: __dirname + '/src',
                errorDirectory: 'errors',

                // use port instead path
                // for compatibility of window
                sock: HENGINE_TCP_PORT,

                // setup vhosts
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
            // override hengine options in config file
            options: {                
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
            }
        }
    });



    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-connect');    
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-spritesmith');

    grunt.loadTasks(__dirname + '/grunt/hengine/tasks');
    grunt.loadTasks(__dirname + '/grunt/localServer/tasks');


    grunt.registerTask('dev', 'launch web server and watch tasks', ['concurrent:dev']);

};