/**
 * Created by i070970 on 8/3/14.
 */
var http = require('http');
var path = require('path');
var express = require('express');
var favicon = require('serve-favicon');
var morgan  = require('morgan'); // Logger
var bodyParser = require('body-parser');
var locale = require('locale');
var supportedLanguages = ['en', 'ru'];
var rtlLanguages = ['he'];
var less = require('less-middleware');
var index = require('./routes/index.js');
var themeService = require('./services/theme.js');
var app = express();

app.set('port', 3000);
app.set('dev', true);
app.set('themeRegExp', /\/themes\/([a-z]+)\//);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/images/shared/favicon.png'));
app.use(morgan());
app.use(bodyParser.json());
app.use(locale(supportedLanguages));
app.use(function(req, res, next) {
    // Set request context
    req.context = {
        theme: req.query.theme || (app.get('themeRegExp').exec(req.url) || [])[1] || 'default',
        locale: req.query.locale && supportedLanguages.indexOf(req.query.locale) >=0 ? req.query.locale : req.locale,
        dir: rtlLanguages.indexOf(req.locale) >=0 ? 'rtl' : 'ltr'
    };
    next();
});
app.use(less(__dirname + '/public', {
    force: app.get('dev'),
    preprocess: {
        path: function (pathname, req) {
            return pathname.replace(app.get('themeRegExp'), '/');
        },
        less: function (src, req) {
            var variables = 'stylesheets/themes/' + req.context.theme + '/less/variables.less';
            return '@import "' + variables + '";\n' + src;
        }
    },
    compiler: {
        compress: !app.get('dev')
    }
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

// Index
app.get('/', index.get);

// Services
app.get('/api/themes', themeService.getThemes);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
