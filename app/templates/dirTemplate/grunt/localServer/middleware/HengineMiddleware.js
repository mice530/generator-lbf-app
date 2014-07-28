/**
 * Created by apple on 14-5-20.
 */
var path = require('path'),
    fs = require('fs'),
    url = require('url'),
    hengineClient = require('../lib/hengineClient');

// todo
// setting up hengine

module.exports = exports = {
    page: function(conf){
        console.info('[connect] use hengine.page middleware');

        return function(req, res, next){
            var filePath = url.parse(req.url).pathname,
                dataPath = path.normalize(conf.root + filePath).replace(/\.html/, '.json');

            fs.readFile(dataPath, function(err, data){
                if(err){
                    res.writeHead(404);
                    res.end(dataPath + ' not found, ' + err.message);

                    next(err);
                    return;
                }

                hengineClient(
                    {
                        method: 'POST',
                        host: conf.host,
                        hostname: conf.hostname,
                        port: conf.port,
                        path: filePath,
                        data: data
                    },

                    function(err, html){
                        if(err){
                            res.writeHead(500);
                            res.end(err.message);

                            next(err);
                            return;
                        }

                        res.writeHead(200, {
                            'Content-Type': 'text/html'
                        });
                        res.end(html);
                    }
                );
            });
        }
    },

    template: function(conf){
        console.info('[connect] use hengine.template middleware');

        return function(req, res, next){
            var filePath = url.parse(req.url).pathname;

            hengineClient(
                {
                    method: 'GET',
                    host: conf.host,
                    hostname: conf.hostname,
                    port: conf.port,
                    path: '/template/' + filePath
                },

                function(err, html){
                    if(err){
                        res.writeHead(500);
                        res.end(err.message);

                        next(err);
                        return;
                    }

                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    res.end(html);
                }
            );
        }
    }
};