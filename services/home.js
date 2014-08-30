/**
 * Created by i070970 on 8/19/14.
 */

var request = require('request');
var home = {};
var mock = {};
var siteUrl = '';
var host = '';
var errors = {
    '403': {
        code: 'EACCESS',
        message: 'Access Denied'
    },
    '500': {
        code: 'EGENSRV',
        message: 'General Server Error'
    },
    '502': {
        code: 'EHCP',
        message: 'Can\'t Access HANA Cloud Portal'
    }
};

function fixJson(data) {
    var r,
        keyRe = /[{,]\s*([a-z0-9_$]+)\s*:/gim,
        valRe = /:\s*'([^']*)'/gim,
        json = data;
    while((r = keyRe.exec(data)) && r.length === 2) {
        json = json.replace(r[0], r[0][0] + '"' + r[1] + '"' + r[0][r[0].length-1]);
    }
    while((r = valRe.exec(data)) && r.length === 2) {
        json = json.replace(r[0], ':"' + r[1] + '"');
    }
    return json.replace(/'/gim, '"');
}

function sendErrorJson(res, error) {
    error = error || {};
    error.code = error.code || '500';
    res.status(error.code);
    res.json({
        status: 'ERROR',
        results: errors[error.code] || {
            code: error.code,
            message: error.message
        }
    });
}

function sendErrorText(res, error) {
    error = error || {};
    error.code = error.code || '500';
    res.status(error.code);
    res.end('ERROR: [' + (errors[error.code] || error).code + '] ' + (errors[error.code] || error).message);
}

home.getWidgets = function (req, res) {
    if(siteUrl) {
        request.get(siteUrl, function (error, response, body) {
            if (error) {
                sendErrorJson(res, error);
            } else {
                try {
                    body = JSON.parse(body);
                    if(body.status.toUpperCase() === 'OK') {
                        res.json({
                            status: 'OK',
                            results: body.site.apps.map(function (app) {
                                var contentType = JSON.parse(fixJson(app.globalProperties.filter(function(property) {
                                    return property.key === 'ecm';
                                })[0].value)).contentType;
                                return {
                                    widgetId: app.ID,
                                    documentId: app.ecmIds,
                                    contentType: contentType,
                                    name: app.name
                                };
                            })
                        });
                    } else {
                        sendErrorJson(res, body.error);
                    }
                } catch(e) {
                    sendErrorJson(res, {
                       code: 'EPARSE',
                       message: 'Parsing error'
                    });
                }
            }
        });
    } else {
        sendError(res, {code: '502'});
    }
};

home.getWidget = function (req, res) {
    if(host) {
        request.get(host + 'portal/v1/widgets/' + req.params.widgetId + '/documents/' + req.params.documentId, function (error, response, body) {
            if (error) {
                sendErrorText(res, error);
            } else {
                if(response.statusCode === 200) {
                    res.setHeader('Content-Type', response.headers['content-type']);
                    res.end(body, 'binary');
                } else {
                    sendErrorText(res, {code: response.statusCode + ''});
                }
            }
        });
    } else {
        sendErrorText(res, {code: '502'});
    }
};

mock.getWidgets = function (req, res) {
    var data = {
        "status": "OK",
        "results": [
            {
                "widgetId": "wid1",
                "documentId": "did1",
                "contentType": "text/plain",
                "name": "Text Widget"
            }, {
                "widgetId": "wid2",
                "documentId": "did2",
                "contentType": "image/png",
                "name": "Image Widget"
            }, {
                "widgetId": "wid3",
                "documentId": "did3",
                "contentType": "document/pdf",
                "name": "Document Widget"
            }, {
                "widgetId": "wid4",
                "documentId": "did4",
                "contentType": "video/mp4",
                "name": "Video Widget"
            }
        ]
    };

    if(arguments.length) {
        res.json(data);
    } else {
        return JSON.stringify(data);
    }
};

mock.getWidget = function (req, res) {
    var data = 'Hello';

    if(arguments.length) {
        res.end(data);
    } else {
        return data;
    }
};

module.exports = function(opts) {
    if(opts) {
        if(opts.proxy) {
            request = request.defaults({
                'encoding': null,
                'proxy': opts.proxy
            });
        }
        if(opts.site) {
            siteUrl = opts.site;
            host = siteUrl.split('portal')[0];
        }
        if(opts.mock) {
            return mock;
        }
    }
    return home;
};