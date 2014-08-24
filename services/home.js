/**
 * Created by i070970 on 8/19/14.
 */

var request = require('request');
var home = {};
var url = '';

home.getHome = function (req, res) {
    if(url) {
        request.get(url, function (error, response, body) {
            if (error) {
                res.status(500);
                res.json({
                    status: 'ERROR',
                    results: {
                        code: error.code,
                        message: error.message
                    }
                });
            } else {
                res.json({
                    status: 'OK',
                    results: body.site
                });
            }
        });
    } else {
        res.status(404);
        res.json({
            status: 'ERROR',
            results: {
                code: 'ECONFIG',
                message: 'Site not found'
            }
        });
    }
};

module.exports = function(opts) {
    if(opts) {
        if(opts.proxy) {
            request = request.defaults({
                'proxy': opts.proxy
            });
        }
        if(opts.site) {
            url = opts.site;
        }
    }
    return home;
};