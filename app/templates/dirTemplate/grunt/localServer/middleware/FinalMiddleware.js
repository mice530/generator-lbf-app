/**
 * Created by amos on 14-4-16.
 */
var path = require('path'),
    url = require('url'),
    fs = require('fs');

module.exports = function(conf){
    console.log('[connect] use 404 middleware');
    console.log(conf);

    return function(req, res, next){
        var filePath = path.normalize(conf.base + url.parse(req.url).pathname + '.json');

        fs.readFile(filePath, function(err, file){
            if(err){
                res.writeHead(404);
                res.end(filePath + ' ' + err.message);
                return;
            }

            try {
                var data = JSON.parse(file);
            } catch(err){
                res.writeHead(500);
                res.end(filePath + ' invalid data, ' + err.message);
                return;
            }

            var body = JSON.stringify(data.body || {});

            res.writeHead(data.statusCode, {
                'Content-Length': Buffer.byteLength(body),
                'Content-Type': 'application/json'
            });
            res.end(body);
        });
    }
};