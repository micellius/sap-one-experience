/**
 * Created by i070970 on 8/30/14.
 */
var mock = {},
    document = {},
    list;

list = [{
    title: 'Document 1'
}, {
    title: 'Document 2'
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