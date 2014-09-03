/**
 * Created by i070970 on 8/30/14.
 */
var mock = {},
    analytic = {},
    list;

list = [{
    title: 'Report 1'
}, {
    title: 'Report 2'
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