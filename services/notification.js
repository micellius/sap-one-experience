/**
 * Created by i070970 on 8/27/14.
 */
var mock = {},
    notification = {},
    list;

list = [{
    id: '0',
    avatar: 'images/shared/john-doe.png',
    name: 'John Doe',
    email: 'john@doe.com',
    date: Date.now() - 86400000, // Day before server start
    title: 'Performance Self Assessment',
    text: 'Hi,\n Can you please approve my performance self assessment form that I sent you last week?',
    buttons: [{
        title: 'Create Task',
        icon: 'check',
        type: 'primary'
    }, {
        title: 'Reply',
        icon: 'edit',
        type: 'default'
    }]
}, {
    id: '1',
    avatar: 'images/shared/john-doe.png',
    name: 'Jane Doe',
    email: 'jane@doe.com',
    date: Date.now() - 2 * 86400000, // Two days before server start
    title: 'Invitation to join "SAP One Experience" group',
    text: 'Hi Vadim! I would like to invite you to join the "SAP One Experience" group where people are sharing their thoughts about new user experience and visual design of innovative SAP products',
    buttons: [{
        title: 'Accept',
        icon: 'ok',
        type: 'success'
    }, {
        title: 'Decline',
        icon: 'remove',
        type: 'danger'
    }]
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