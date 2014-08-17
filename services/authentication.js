/**
 * Created by i070970 on 8/16/14.
 */
exports.login = function(req, res) {

    var user = {
        firstName: 'Vadim',
        lastName: 'Tomnikov',
        email: 'micellius@gmail.com',
        avatar: 'images/shared/vadim.jpg'
    };

    req.session.user = user;

    res.json({
        status: 'OK',
        results: user
    });
};

exports.logout = function(req, res) {

    delete req.session.user;

    res.json({
        status: 'OK'
    });
};