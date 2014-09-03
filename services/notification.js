/**
 * Created by i070970 on 8/27/14.
 */
var mock = {},
    notification = {},
    list;

list = [{
    title: 'Notification 1',
    subtitle: 'Notification 1'
}, {
    title: 'Notification 2',
    subtitle: 'Notification 2'
}];

mock.getNotifications = function (req, res) {
    var data = {
        status: 'OK',
        results: list
    };

    if(arguments.length) {
        res.json(data);
    } else {
        return JSON.stringify(data);
    }
};

notification.getNotifications = mock.getNotifications;

module.exports = function (opts) {
    if(opts) {
        if(opts.mock) {
            return mock;
        }
    }
    return notification;
};