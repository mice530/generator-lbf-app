/**
 * Created by apple on 14-5-20.
 */
var tcache = require('lbf-hengine').tcache,
    defaultConf = tcache.conf;

module.exports = exports = function(grunt){
    grunt.registerTask('hengine-tcache', 'Start a hengine file cache service for local development.', function(){
        var options = this.options(defaultConf);

        tcache(options);

        grunt.log.writeln('hengine-tcache started');

        // forever running
        var done = this.async();
        grunt.log.writeln('hengine tcache forever running');
    });
};