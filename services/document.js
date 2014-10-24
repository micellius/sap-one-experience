/**
 * Created by i070970 on 8/30/14.
 */
var mock = {},
    document = {},
    list;

list = [{
    id: 'fld0',
    title: 'MyFolder',
    type: 'folder',
    modified: {
        at: Date.now() - 12*86400000 // 12 days ago
    },
    items: [{
        id: 'doc10',
        title: 'Donec nec nunc luctus.avi',
        type: 'video',
        size: 45687423,
        modified: {
            at: Date.now() - 12*86400000 // 12 days ago
        }
    }]
}, {
    id: 'doc1',
    title: 'Lorem ipsum.xlsx',
    type: 'sheet',
    size: 128234,
    modified: {
        at: Date.now() - 3*86400000 // 3 days ago
    }
}, {
    id: 'doc2',
    title: 'Donec nec tellus dapibus.docx',
    type: 'document',
    size: 1284231,
    modified: {
        at: Date.now() - 4*86400000 // 4 days ago
    }
}, {
    id: 'doc3',
    title: 'Vestibulum sodales tellus at viverra efficitur.jpg',
    type: 'image',
    size: 8345765,
    modified: {
        at: Date.now() - 2*86400000 // 2 days ago
    }
}];

mock.getDocuments = function (req, res) {
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

document.getDocuments = mock.getDocuments;

module.exports = function (opts) {
    if(opts) {
        if(opts.mock) {
            return mock;
        }
    }
    return document;
};