/**
 * Created by i070970 on 8/30/14.
 */
var mock = {},
    analytic = {},
    list;

list = [{
    type: 'dataset',
    title: 'Lorem ipsum dolor sit amet',
    owner: 'John Doe',
    modified: {
        by: 'John Doe',
        at: Date.now() - 3*86400000 // 3 days ago
    },
    tags: ['shared', 'submitted']
}, {
    type: 'story',
    title: 'Duis viverra viverra massa nec malesuada',
    owner: 'Jane Doe',
    modified: {
        by: 'John Doe',
        at: Date.now() - 2*86400000 // 2 days ago
    },
    tags: ['shared', 'submitted']
}, {
    type: 'report',
    title: 'Quisque vel lorem',
    owner: 'John Doe',
    modified: {
        by: 'John Doe',
        at: Date.now() - 5*86400000 // 5 days ago
    },
    tags: ['shared', 'submitted']
}, {
    type: 'dataset',
    title: 'Lorem ipsum dolor sit amet',
    owner: 'John Doe',
    modified: {
        by: 'John Doe',
        at: Date.now() - 3*86400000 // 3 days ago
    },
    tags: ['shared', 'submitted']
}, {
    type: 'story',
    title: 'Duis viverra viverra massa nec malesuada',
    owner: 'Jane Doe',
    modified: {
        by: 'John Doe',
        at: Date.now() - 2*86400000 // 2 days ago
    },
    tags: ['shared', 'submitted']
}, {
    type: 'report',
    title: 'Quisque vel lorem',
    owner: 'John Doe',
    modified: {
        by: 'John Doe',
        at: Date.now() - 5*86400000 // 5 days ago
    },
    tags: ['shared', 'submitted']
}, {
    type: 'dataset',
    title: 'Lorem ipsum dolor sit amet',
    owner: 'John Doe',
    modified: {
        by: 'John Doe',
        at: Date.now() - 3*86400000 // 3 days ago
    },
    tags: ['shared', 'submitted']
}, {
    type: 'story',
    title: 'Duis viverra viverra massa nec malesuada',
    owner: 'Jane Doe',
    modified: {
        by: 'John Doe',
        at: Date.now() - 2*86400000 // 2 days ago
    },
    tags: ['shared', 'submitted']
}, {
    type: 'report',
    title: 'Quisque vel lorem',
    owner: 'John Doe',
    modified: {
        by: 'John Doe',
        at: Date.now() - 5*86400000 // 5 days ago
    },
    tags: ['shared', 'submitted']
}];

mock.getReports = function (req, res) {
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

analytic.getReports = mock.getReports;

module.exports = function (opts) {
    if(opts) {
        if(opts.mock) {
            return mock;
        }
    }
    return analytic;
};