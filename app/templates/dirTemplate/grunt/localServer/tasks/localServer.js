/**
 * Created by apple on 14-5-20.
 */
var http = require('http'),
    connect = require('connect'),
    LivereloadMiddleware = require('connect-livereload'),
    CGIMiddleware = require('../middleware/CGIMiddleware'),
    HengineMiddleware = require('../middleware/HengineMiddleware');

var defaults = {
    routes: [
        ['/page', 'page'],
        ['/template', 'template'],
        ['/mockup', 'static'],
        ['/', 'cgi']
    ]
};

var middlewares = {
    page: HengineMiddleware.page,
    template: HengineMiddleware.template,
    static: function(options){
        return connect.static(options.root);
    },
    cgi: CGIMiddleware
};

module.exports = exports = function(grunt){
    grunt.registerTask('localServer', 'Start a web server for local development.', function(){
        var options = this.options(defaults);

        var routes = options.routes;
        
        grunt.log.writeln('local server configuring routes');
        console.log(routes);

        var app = connect().use(LivereloadMiddleware(options.livereload));

        routes.forEach(function(conf){
            var mw = middlewares[conf[1]];

            if( !mw ){
                throw new Error('can\t find middleware ' + conf[1]);
            }

            app.use(conf[0], mw(conf[2] || {}));
        });

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