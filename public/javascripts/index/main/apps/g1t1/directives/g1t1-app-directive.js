/**
 * Created in SAP Labs Israel.
 * Author: Vadim Tomnikov (i070970)
 * Date: 10/25/14
 * Time: 1:33
 */
(function () {
    'use strict';

    function sapG1t1AppDirective($timeout, sapSharedI18nService, sapG1t1FeedService) {
        return {
            template:
                '<div class="sap-app-master-details">' +
                    '<div class="sap-app-master panel">' +
                        '<div class="sap-app-header panel-heading">{{data.master.title}}</div>' +
                        '<div class="sap-app-toolbar"><input class="sap-app-toolbar-search" placeholder="{{msg.search}}" type="text" ng-model="searchText"></div>' +
                        '<ul class="sap-app-master-list list-group">' +
                            '<li ng-repeat="item in data.items | filter:{title:searchText}" ng-class="{\'sap-app-master-list-item\':true, \'list-group-item\':true, \'sap-active\': item === activeItem}" ng-click="setActiveItem(item, $index)">' +
                                '<div class="sap-app-master-list-item-start">{{item.title}}</div>' +
                                '<div class="sap-app-master-list-item-end">' +
                                    '<div class="sap-app-master-list-item-large">{{item.price}}</div>' +
                                    '<div class="sap-app-master-list-item-small">{{item.currency}}</div>' +
                                '</div>' +
                            '</li>' +
                        '</ul>' +
                        '<div class="sap-app-footer">' +
                            '<div class="sap-app-footer-button"><span class="glyphicon glyphicon-plus"></span></div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="sap-app-details panel">' +
                        '<div class="sap-app-header">{{data.details.title}}</div>' +
                        '<div class="sap-app-details-container">' +
                            '<div class="sap-app-details-header">' +
                                '<div class="sap-app-details-header-top">' +
                                    '<div class="sap-app-details-header-top-title">{{activeItem.title}}</div>' +
                                    '<div class="sap-app-details-header-top-number">' +
                                        '<div class="sap-app-details-header-top-number-price">{{activeItem.price}}</div>' +
                                        '<div class="sap-app-details-header-top-number-currency">{{activeItem.currency}}</div>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="sap-app-details-header-bottom">' +
                                    '<div class="sap-app-details-header-bottom-date">{{msg.from}} {{activeItem.fromDate}}</div>' +
                                    '<div class="sap-app-details-header-bottom-description">{{activeItem.description}}</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="sap-app-details-tabs">' +
                                '<div ng-class="{\'sap-app-details-tab\': true, \'sap-active\': activeTab === \'supplier\'}" ng-click="activeTab = \'supplier\'">' +
                                    '<div class="sap-app-details-tab-icon"><span class="glyphicon glyphicon-user"></span></div>' +
                                    '<div class="sap-app-details-tab-icon-text">{{msg.supplier}}</div>' +
                                '</div>' +
                                '<div ng-class="{\'sap-app-details-tab\': true, \'sap-active\': activeTab === \'category\'}" ng-click="activeTab = \'category\'">' +
                                    '<div class="sap-app-details-tab-icon"><span class="glyphicon glyphicon-info-sign"></span></div>' +
                                    '<div class="sap-app-details-tab-icon-text">{{msg.category}}</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="sap-app-details-tab-panel panel panel-default" ng-if="activeTab === \'supplier\'">' +
                                '<div class="sap-app-details-tab-panel-header">{{msg.supplierAddress}}</div>' +
                                '<div class="sap-app-details-tab-panel-body">' +
                                    '<div class="sap-app-details-tab-panel-field-label" ng-repeat-start="field in activeItem.supplier">{{field.key}}:</div>' +
                                    '<div class="sap-app-details-tab-panel-field-value" ng-repeat-end>{{field.value}}</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="sap-app-details-tab-panel panel panel-default" ng-if="activeTab === \'category\'">' +
                                '<div class="sap-app-details-tab-panel-header">{{msg.categoryAssignment}}</div>' +
                                '<div class="sap-app-details-tab-panel-body">' +
                                    '<div class="sap-app-details-tab-panel-field-label" ng-repeat-start="field in activeItem.category">{{field.key}}:</div>' +
                                    '<div class="sap-app-details-tab-panel-field-value" ng-repeat-end>{{field.value}}</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="sap-app-footer"></div>' +
                    '</div>' +
                '</div>',
            scope: {
                'app': '=sapG1t1AppDirective'
            },
            link: function (scope) {
                var activeIdx;
                scope.msg = sapSharedI18nService.getMessages('g1t1');
                scope.$on('sapSharedI18nService.localeChanged', function () {
                    scope.msg = sapSharedI18nService.getMessages('g1t1');
                    scope.activeItem = scope.data.items[activeIdx];
                });
                $timeout(function () {
                    scope.$emit('closePanels');
                }, 1200);
                scope.data = sapG1t1FeedService.getData();
                scope.setActiveItem = function (item, index) {
                    activeIdx = index;
                    scope.activeItem = item;
                };
                scope.setActiveItem(scope.data.items[0], 0);
                scope.activeTab = 'supplier';
            }
        };
    }

    angular.
        module('sapG1t1').
        directive('sapG1t1AppDirective', [
            '$timeout',
            'sapSharedI18nService',
            'sapG1t1FeedService',
            sapG1t1AppDirective
        ]);
}());