/**
 * Created by apple on 14-5-20.
 */
var http = require('http');

module.exports = exports = function(options, callback){
    var req = http.request(
        {
            method: options.method || 'POST',
            host: options.host || '127.0.0.1',
            hostname: options.hostname,
            port: options.port || 8080,
            path: options.path
        },

        function(res){
            var chunkArr = [],
                bufLen = 0;

            res
                .on('data', function(chunk){
                    chunkArr.push(chunk);
                    bufLen += chunk.length;
                })
                .on('end', function(){
                    callback(null, Buffer.concat(chunkArr, bufLen));
                });
        }
    );

    req.on('error', function(err){
        console.error('[hengine client] request error');
        console.log({
            method: options.method || 'POST',
            host: options.host || '127.0.0.1',
            hostname: options.hostname,
            port: options.port || 8080,
            path: options.path
        });
        callback(err);
    });

    options.data && req.write(options.data);
    req.end();
};
