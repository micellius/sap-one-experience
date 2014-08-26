/**
 * Created by i070970 on 8/12/14.
 */
var fs = require('fs'),
    path = require('path'),
    themes = listThemeDirectories(),
    theme = {},
    mock = {};

function listThemeDirectories() {
    var pathToThemes = path.normalize('./public/stylesheets/themes');
    return fs.readdirSync(pathToThemes).filter(function (file) {
        return fs.statSync(path.join(pathToThemes, file)).isDirectory();
    });
}

theme.getThemes = function(req, res) {
    res.json({
        status: 'OK',
        results: themes
    });
};

mock.getThemes = function (req, res) {
    var data = {
        "status": "OK",
        "results": ["default"]
    };

    if(arguments.length) {
        res.json(data);
    } else {
        return JSON.stringify(data);
    }
};

module.exports = function(opts) {
    if(opts) {
        if(opts.mock) {
            return mock;
        }
    }
    return theme;
};