/**
 * Created by i070970 on 8/31/14.
 */
(function () {
    'use strict';

    function sapHomeWidgetDirective($sce, sapSharedCssService, sapHomeWidgetsService, sapHomeLayoutService) {
        return {
            template:
                '<div id="widget-{{widget.widgetId}}" class="sap-home-widget ng-class:{\'sap-home-widget-frame\':widget.layout.showFrameArea, \'sap-hidden\':widget.layout.hidden}">' +
                    '<div class="panel panel-default">' +
                        '<div class="panel-heading">{{widget.name}}</div>' +
                        '<div class="panel-body" ng-bind-html="widget.content">' +
                        '</div>' +
                    '</div>' +
                '</div>',
            replace: true,
            scope: {
                widget: '=sapHomeWidgetDirective'
            },
            link: function (scope) {
                // Layout
                if (!scope.widget.css) {
                    scope.widget.css = sapHomeLayoutService.getWidgetCss(scope.widget.layout);
                }
                sapSharedCssService.setStyle('#widget-' + scope.widget.widgetId, scope.widget.css);
                // Content
                if (!scope.widget.content) {
                    switch ((scope.widget.contentType || '').split('/')[0]) {
                    case 'text':
                        sapHomeWidgetsService.
                            getWidgetContent(scope.widget.widgetId, scope.widget.documentId).
                            success(function (data) {
                                scope.widget.content = $sce.trustAsHtml(data);
                            });
                        break;
                    case 'image':
                        var url = sapHomeWidgetsService.getWidgetContentUrl(scope.widget.widgetId, scope.widget.documentId);
                        //scope.widget.content = $sce.trustAsHtml('<img src="' + url + '" />');
                        scope.widget.content = $sce.trustAsHtml('<div class="sap-home-widget-content"></div>');
                        sapSharedCssService.setStyle('#widget-' + scope.widget.widgetId + ' .sap-home-widget-content', {
                            'background-image': 'url(' + url + ')'
                        });
                        break;
                    }
                }
            }
        };
    }

    angular.
        module('sapHome').
        directive('sapHomeWidgetDirective', [
            '$sce',
            'sapSharedCssService',
            'sapHomeWidgetsService',
            'sapHomeLayoutService',
            sapHomeWidgetDirective
        ]);

}());