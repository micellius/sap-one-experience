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