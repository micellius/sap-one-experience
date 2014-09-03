/**
 * Created by i070970 on 8/16/14.
 */
var authentication = {};
var mock = {};

mock.login = function(req, res) {

    var data = {
        status: 'OK',
        results: {
            firstName: 'Vadim',
            lastName: 'Tomnikov',
            email: 'micellius@gmail.com',
            avatar: 'images/shared/vadim.jpg'
        }
    };

    if(arguments.length) {
        req.session.user = data.results;
        res.json(data);
    } else {
        return JSON.stringify(data);
    }
};

mock.logout = function(req, res) {

    var data = {
        status: 'OK'
    };

    if(arguments.length) {
        delete req.session.user;
        res.json(data);
    } else {
        return JSON.stringify(data);
    }
};

authentication.login = mock.login;
authentication.logout = mock.logout;

module.exports = function (opts) {
    if(opts) {
        if(opts.mock) {
            return mock;
        }
    }
    return authentication;
};