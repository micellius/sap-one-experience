/**
 * Created by i070970 on 9/2/14.
 */
(function () {
    'use strict';

    function sapTodosItemDirective() {
        return {
            template:
                '<div class="sap-todos-item col-md-4 col-sm-6 col-xs-12">' +
                    '<div class="panel panel-default">' +
                        '<div class="panel-body">{{item.title}}</div>' +
                        '<div class="panel-footer">' +
                            '<i class="glyphicon glyphicon-comment"></i>' +
                            '<span>Category</span>' +
                            '<span class="pull-right">Due: 3-Sep-2014</span>' +
                        '</div>' +
                    '</div>' +
                '</div>',
            replace: true,
            scope: {
                item: '=sapTodosItemDirective'
            }
        };
    }

    angular.
        module('sapTodos').
        directive('sapTodosItemDirective', [
            sapTodosItemDirective
        ]);

}());