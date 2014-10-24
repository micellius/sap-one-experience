/**
 * Created by i070970 on 9/23/14.
 */
(function () {
    'use strict';

    function sapAnalyticsListDirective() {
        return {
            template:
                '<div class="sap-analytics-list">' +
                    '<div class="sap-analytics-list-header">' +
                        '<div class="sap-analytics-list-type"></div>' +
                        '<div class="sap-analytics-list-name">NAME</div>' +
                        '<div class="sap-analytics-list-owner">OWNER</div>' +
                        '<div class="sap-analytics-list-modified">LAST MODIFIED</div>' +
                        '<div class="sap-analytics-list-action"></div>' +
                    '</div>' +
                    '<div class="sap-analytics-list-body">' +
                        '<div class="sap-analytics-list-row" ng-repeat="item in items">' +
                            '<div class="sap-analytics-list-type"><span class="{{getTypeClass(item.type)}}" title="{{item.type | sapSharedTranslateFilter}}"></span></div>' +
                            '<div class="sap-analytics-list-name">' +
                                '<div class="sap-analytics-list-name-text">{{item.title}}</div>' +
                                '<ul class="sap-analytics-list-name-tags">' +
                                    '<li ng-repeat="tag in item.tags" class="label label-info" title="{{tag | sapSharedTranslateFilter}}"><span class="{{getTagClass(tag)}}"></span></li>' +
                                '</ul>' +
                            '</div>' +
                            '<div class="sap-analytics-list-owner">{{item.owner}}</div>' +
                            '<div class="sap-analytics-list-modified">{{formatDate(item.modified.at)}} <small>({{item.modified.by}})</small></div>' +
                            '<div class="sap-analytics-list-action"><span class="glyphicon glyphicon-cog"></span></div>' +
                        '</div>' +
                    '</div>' +
                '</div>',
            replace: true,
            scope: {
                items: '=sapAnalyticsListDirective'
            },
            controller: ['$scope', function ($scope) {
                $scope.getTypeClass = function (type) {
                    var cls = 'glyphicon glyphicon-';
                    switch (type) {
                    case 'dataset':
                        cls += 'th-large text-warning';
                        break;
                    case 'story':
                        cls += 'stats text-success';
                        break;
                    case 'report':
                        cls += 'signal text-danger';
                        break;
                    }
                    return cls;
                };
                $scope.getTagClass = function (tag) {
                    var cls = 'glyphicon glyphicon-';
                    switch (tag) {
                    case 'shared':
                        cls += 'share';
                        break;
                    case 'submitted':
                        cls += 'check';
                        break;
                    }
                    return cls;
                };
                $scope.formatDate = function (timestamp) {
                    var date = new Date(timestamp);
                    return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
                };
            }]
        };
    }

    angular.
        module('sapAnalytics').
        directive('sapAnalyticsListDirective', [
            sapAnalyticsListDirective
        ]);

}());