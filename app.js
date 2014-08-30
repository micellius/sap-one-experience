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
var session = require('express-session');
var compress = require('compression');
var supportedLanguages = ['en', 'ru'];
var rtlLanguages = ['he'];
var less = require('less-middleware');
var index = require('./routes/index.js');
var app = express();
var stdio = require('stdio');
var opts = stdio.getopt({
    'dev': { description: 'Enable development mode' },
    'mock': { description: 'Force services to return mock data' },
    'port': { args: 1, description: 'Port to be used by Express (e.g. 3000)' },
    'proxy': { args: 1, description: 'Proxy server URL (e.g. http://proxy:1234)' },
    'site': { args: 1, description: 'HANA Cloud Portal site JSON URL (e.g. http://www.my-site.com:1234/portal/v1/sites/1919e4a3-9322-4cbd-bbae-8f291b49eceb)' }
});
var authenticationService = require('./services/authentication.js')(opts);
var themeService = require('./services/theme.js')(opts);
var homeService = require('./services/home.js')(opts);
var notificationService = require('./services/notification.js')(opts);
var todoService = require('./services/todo.js')(opts);
var analyticService = require('./services/analytic.js')(opts);
var documentService = require('./services/document.js')(opts);


app.set('port', opts.port || 3000);
app.set('dev', opts.dev || false);
app.set('themeRegExp', new RegExp('\\' + path.sep + 'themes\\' + path.sep + '([a-z]+)\\' + path.sep));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/images/shared/favicon.png'));
app.use(morgan('combined'));
app.use(compress());
app.use(bodyParser.json());
app.use(locale(supportedLanguages));
app.use(session({
    secret: 'sap-one-experience',
    resave: true,
    saveUninitialized: true
}));
app.use(function(req, res, next) {
    // Set request context
    req.context = {
        theme: req.query.theme || (app.get('themeRegExp').exec(req.url) || [])[1] || 'default',
        locale: req.query.locale && supportedLanguages.indexOf(req.query.locale) >= 0 ? req.query.locale : req.locale,
        dir: rtlLanguages.indexOf(req.locale) >= 0 ? 'rtl' : 'ltr',
        user: req.session.user || null
    };
    next();
});
if(app.get('dev') === true) {
    app.use(less(path.join(__dirname, 'public'), {
        force: true,
        preprocess: {
            path: function (pathname, req) {
                return pathname.replace(app.get('themeRegExp'), path.sep);
            },
            less: function (src, req) {
                var variables = 'stylesheets/themes/' + req.context.theme + '/less/variables.less';
                return '@import "' + variables + '";\n' + src;
            }
        },
        compiler: {
            compress: false
        }
    }));
}
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

// Index
app.get('/', index.get);

// Services
app.get('/api/themes', themeService.getThemes);
app.post('/api/login', authenticationService.login);
app.post('/api/logout', authenticationService.logout);
app.get('/api/home/widgets', homeService.getWidgets);
app.get('/api/home/widget/:widgetId/document/:documentId', homeService.getWidget);
app.get('/api/notifications', notificationService.getNotifications);
app.get('/api/todos', todoService.getTodos);
app.get('/api/reports', analyticService.getReports);
app.get('/api/documents', documentService.getDocuments);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port') + (app.get('dev') ? ' (Development mode)' : ' (Production mode)'));
});
