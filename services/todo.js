/**
 * Created by i070970 on 8/30/14.
 */
var mock = {},
    todo = {},
    list;

list = [{
    title: 'Todo 1'
}, {
    title: 'Todo 2'
}, {
    title: 'Todo 3'
}, {
    title: 'Todo 4'
}, {
    title: 'Todo 5'
}, {
    title: 'Todo 6'
}, {
    title: 'Todo 7'
}, {
    title: 'Todo 8'
}, {
    title: 'Todo 9'
}, {
    title: 'Todo 10'
}, {
    title: 'Todo 11'
}, {
    title: 'Todo 12'
}];

mock.getTodos = function (req, res) {
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

todo.getTodos = mock.getTodos;

module.exports = function (opts) {
    if(opts) {
        if(opts.mock) {
            return mock;
        }
    }
    return todo;
};