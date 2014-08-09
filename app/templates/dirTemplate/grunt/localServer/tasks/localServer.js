/**
 * Created by apple on 14-5-20.
 */
var http = require('http'),
    connect = require('connect'),
    LivereloadMiddleware = require('connect-livereload'),
    CGIMiddleware = require('../middleware/CGIMiddleware'),
    HengineMiddleware = require('../middleware/HengineMiddleware');

module.exports = exports = function(grunt){
    grunt.registerTask('localServer', 'Start a web server for local development.', function(){
        var options = this.options({
            router: {
                page: '/page',
                template: '/template',
                mockup: '/mockup',
                static: '/static_proxy',
                cgi: '/'
            }
        });

        var router = options.router;

        console.log(router);

        var app = connect()
            .use(LivereloadMiddleware(options.livereload))
            .use(router.page, HengineMiddleware.page(options.page))
            .use(router.template, HengineMiddleware.template(options.template))
            .use(router.mockup, connect.static('dev/mockup'))
            .use(router.static, connect.static('src'))
            .use(router.cgi, CGIMiddleware(options.cgi));

        http
            .createServer(app)
            .listen(options.server.port)
            .on('error', function(err) {
                if (err.code === 'EADDRINUSE') {
                    grunt.fatal('Port ' + options.server.port + ' is already in use by another process.');
                } else {
                    grunt.fatal(err);
                }
            });

        grunt.log.writeln('local server started listening on port ' + options.server.port);

        // forever running
        var done = this.async();
        grunt.log.writeln('local server forever running');
    });
};