/**
 * Created by i070970 on 9/1/14.
 */
(function () {
    'use strict';

    function sapSharedCssFactory($document, $log) {

        var stylesheet,
            rules,
            appendRule,
            resetRule,
            sapSharedCssService;

        function createRule(style) {
            var key,
                rule = [];
            if (typeof style === 'object') {
                for (key in style) {
                    if (style.hasOwnProperty(key)) {
                        rule.push([key, style[key]].join(': '));
                    }
                }
                style = rule.join('; ');
            }
            return style;
        }

        function addRule(selector, rule) {
            try {
                stylesheet.addRule(selector, rule, -1);
            } catch (e) {
                $log.error(e.toString());
            }
        }

        function insertRule(selector, rule) {
            try {
                stylesheet.insertRule([selector, ' {', rule, '}'].join(''), rules.length);
            } catch (e) {
                $log.error(e.toString());
            }
        }

        function createStyleElement() {
            stylesheet = angular.element('<style id="sap-one-experience-style" type="text/css"></style>')[0];
            $document.find('head').append(stylesheet);
            stylesheet = stylesheet.sheet;
            rules = stylesheet.cssRules || stylesheet.rules;
            appendRule = stylesheet.insertRule ? insertRule : addRule;
            resetRule = stylesheet.deleteRule || stylesheet.removeRule;
        }

        function setStyle(selector, style) {
            var i, l;
            selector = selector.toLowerCase();
            // Create style element if needed
            if (!stylesheet) {
                createStyleElement();
            }
            // Try to update existing rule
            for (i = 0, l = rules.length; i < l; i++) {
                if (rules[i].selectorText.toLowerCase() === selector) {
                    rules[i].style.cssText += createRule(style);
                    break;
                }
            }
            // Create new rule if it does not exists yet
            if (i === l) {
                appendRule(selector, createRule(style));
            }
        }

        function resetStyle(selector) {
            var i, l;
            if (rules && rules.length) {
                for (i = 0, l = rules.length; i < l; i++) {
                    if (rules[i].selectorText.toLowerCase() === selector) {
                        resetRule.call(stylesheet, i);
                    }
                }
            }
        }

        sapSharedCssService = {
            setStyle: setStyle,
            resetStyle: resetStyle
        };

        return sapSharedCssService;
    }

    angular.
        module('sapShared').
        factory('sapSharedCssService', [
            '$document',
            '$log',
            sapSharedCssFactory
        ]);

}());