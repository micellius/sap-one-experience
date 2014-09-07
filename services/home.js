/**
 * Created by i070970 on 8/19/14.
 */

var request = require('request');
var fs = require('fs');
var path = require('path');
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
            var pages,
                apps;
            if (error) {
                sendErrorJson(res, error);
            } else {
                try {
                    body = JSON.parse(body);
                    if(body.status.toUpperCase() === 'OK') {
                        pages = {};
                        body.site.pages.forEach(function (page) {
                            var key,
                                layout = JSON.parse(page.layout);
                            pages[page.ID] = {};
                            for(key in layout) {
                                if(layout.hasOwnProperty(key) && key.length === 36) {
                                    pages[page.ID][key] = layout[key];
                                }
                            }
                        });
                        apps = body.site.apps.map(function (app) {
                            var property = app.globalProperties.filter(function(property) {
                                return property.key === 'ecm' || property.key === 'video-url';
                            })[0];
                            var contentType = property.key === 'ecm' ?
                                JSON.parse(fixJson(property.value)).contentType : 'video';
                            return {
                                widgetId: app.ID,
                                documentId: app.ecmIds || property.value.split('/').pop(),
                                contentType: contentType,
                                name: app.name,
                                layout: pages[app.containerID][app.ID]
                            };
                        });
                        res.json({
                            status: 'OK',
                            results: apps
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
                "contentType": "text/html",
                "name": "Text Widget",
                "layout": {
                    "top": 2,
                    "left": 2,
                    "width": 58,
                    "height": 10,
                    "showFrameArea": true
                }
            }, {
                "widgetId": "wid2",
                "documentId": "did2",
                "contentType": "image/png",
                "name": "Image Widget",
                "layout": {
                    "top": 13,
                    "left": 40,
                    "width": 20,
                    "height": 10,
                    "showFrameArea": true
                }
            }, {
                "widgetId": "wid3",
                "documentId": "did3",
                "contentType": "application/pdf",
                "name": "Document Widget",
                "layout": {
                    "top": 24,
                    "left": 29,
                    "width": 31,
                    "height": 9,
                    "showFrameArea": true
                }
            }, {
                "widgetId": "wid4",
                "documentId": "9DbLd0Hp9Ac",
                "contentType": "video",
                "name": "Video Widget",
                "layout": {
                    "top": 13,
                    "left": 2,
                    "width": 26,
                    "height": 20,
                    "showFrameArea": true
                }
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
    var data = '',
        dataType;

    if(arguments.length) {
        dataType = JSON.parse(mock.getWidgets()).results.filter(function(item) {
            return item.widgetId === req.params.widgetId
        })[0].contentType;
        switch(dataType) {
            case 'text/html':
                data = '<h1>Hello</h1><p style="color:red;background:#ffff00;">This text is red</p>';
                break;
            case 'image/png':
                data = fs.readFileSync(path.join(__dirname, '..', 'public', 'images', 'shared', 'logo.png'));
                break;
            case 'application/pdf':
                data = fs.readFileSync(path.join(__dirname, '..', 'public', 'images', 'shared', 'pdf.pdf'));
                break;
            case 'video/mp4':
                break;
        }
    } else {
        data = 'Hello';
    }

    if(arguments.length > 1) {
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