/**
 * Created by i070970 on 9/28/14.
 */
(function () {
    'use strict';

    function sapDocumentsListDirective() {
        return {
            template:
                '<div class="sap-documents-list">' +
                    '<div class="sap-documents-list-header"></div>' +
                    '<div class="sap-documents-list-body">' +
                        '<div class="sap-documents-list-row" ng-repeat="item in items">' +
                            '<div class="sap-documents-list-check"><span ng-click="item.checked = !item.checked" ng-class="{\'glyphicon\':true, \'glyphicon-unchecked\':!item.checked, \'glyphicon-check\':item.checked}"></span></div>' +
                            '<div class="sap-documents-list-type" ng-click="open({item: item})"><span ng-class="getTypeClass(item.type)"></span></div>' +
                            '<div class="sap-documents-list-main">' +
                                '<div class="sap-documents-list-name">{{item.title}}</div>' +
                                '<div class="sap-documents-list-modified">{{changedOn}}: {{formatDate(item.modified.at)}}</div>' +
                            '</div>' +
                            '<div class="sap-documents-list-size">{{formatSize(item.size)}}</div>' +
                        '</div>' +
                    '</div>' +
                '</div>',
            replace: true,
            scope: {
                items: '=sapDocumentsListDirective',
                open: '&sapDocumentsListOpen'
            },
            controller: ['$scope', 'sapSharedI18nService', function ($scope, sapSharedI18nService) {
                $scope.changedOn = sapSharedI18nService.translate('changedOn');
                $scope.$on('sapSharedI18nService.localeChanged', function () {
                    $scope.changedOn = sapSharedI18nService.translate('changedOn');
                });

                $scope.getTypeClass = function (type) {
                    var cls = 'glyphicon glyphicon-';
                    switch (type) {
                    case 'folder':
                        cls += 'folder-open text-warning';
                        break;
                    case 'sheet':
                        cls += 'calendar text-success';
                        break;
                    case 'image':
                        cls += 'picture text-info';
                        break;
                    case 'video':
                        cls += 'film text-danger';
                        break;
                    default:
                        cls += 'file';
                    }
                    return cls;
                };

                $scope.formatDate = function (timestamp) {
                    var date = new Date(timestamp),
                        format = sapSharedI18nService.translate('dateFormat'),
                        M = sapSharedI18nService.translate('months')[date.getMonth()],
                        d = date.getDate(),
                        Y = date.getFullYear(),
                        H = date.getHours(),
                        m = date.getMinutes(),
                        S = date.getSeconds();
                    return format.
                        replace('M', M).
                        replace('d', d).
                        replace('Y', Y).
                        replace('H', H).
                        replace('m', m).
                        replace('S', S);
                };

                $scope.formatSize = function (size) {
                    if (size >= 1024 * 1024 * 1024) {
                        return (size / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
                    }
                    if (size >= 1024 * 1024) {
                        return (size / (1024 * 1024)).toFixed(2) + ' MB';
                    }
                    if (size >= 1024) {
                        return (size / 1024).toFixed(2) + ' KB';
                    }
                };
            }]
        };
    }

    angular.
        module('sapDocuments').
        directive('sapDocumentsListDirective', [
            sapDocumentsListDirective
        ]);

}());
