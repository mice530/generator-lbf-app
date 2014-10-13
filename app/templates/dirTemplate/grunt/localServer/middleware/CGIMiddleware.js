/**
 * Created by amos on 14-4-12.
 */
var path = require('path'),
    url = require('url'),
    fs = require('fs');

module.exports = function(conf){
    console.log('[connect] use cgi middleware');

    return function(req, res, next){
        var pathname = url.parse(req.url).pathname,
            filePath = path.normalize(conf.root + '/' + pathname + '.json');

        fs.readFile(filePath, function(err, file){
            if(err){
                next(err);
                return;
            }

            try {
                var data = JSON.parse(file);

                var body = JSON.stringify(data.body || {});

                res.writeHead(data.statusCode, {
                    'Content-Length': Buffer.byteLength(body),
                    'Content-Type': 'application/json'
                });
                res.end(body);
            } catch(err){
                next(err);
                return;
            }
        });
    }
};