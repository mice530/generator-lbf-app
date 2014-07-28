/**
 * Created by apple on 14-5-20.
 */
var httpServer = require('lbf-hengine').http,
    defaultConf = httpServer.conf;

module.exports = exports = function(grunt){
    grunt.registerTask('hengine-http', 'Start a hengine http server for local development.', function(){
        var options = this.options(defaultConf);

        console.log(options);
        httpServer(options);

        grunt.log.writeln('hengine-http started');

        // forever running
        var done = this.async();
        grunt.log.writeln('hengine http server forever running');
    });
};