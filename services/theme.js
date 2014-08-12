/**
 * Created by i070970 on 8/12/14.
 */
var fs = require('fs'),
    path = require('path'),
    themes = listThemeDirectories();

function listThemeDirectories() {
    var pathToThemes = path.normalize('./public/stylesheets/themes');
    return fs.readdirSync(pathToThemes).filter(function (file) {
        return fs.statSync(path.join(pathToThemes, file)).isDirectory();
    });
}

exports.getThemes = function(req, res) {
    res.json({
        status: 'OK',
        results: themes
    });
};