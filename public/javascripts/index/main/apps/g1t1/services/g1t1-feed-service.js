/**
 * Created in SAP Labs Israel.
 * Author: Vadim Tomnikov (i070970)
 * Date: 10/25/14
 * Time: 1:34
 */
(function () {
    'use strict';

    function sapG1t1FeedService($rootScope, sapSharedI18nService) {

        var originalResponse,
            translatedResponse;

        originalResponse = {
            master: {
                title: 'Products'
            },
            details: {
                title: 'Product'
            },
            items: [{
                title: 'Bread',
                description: 'Whole grain bread',
                fromDate: (new Date('Jan 1, 1992')).getTime(),
                price: 2.5,
                currency: 'USD',
                supplier: [
                    {key: 'name', value: 'Exotic Liquids'},
                    {key: 'street', value: 'NE 228th'},
                    {key: 'city', value: 'Sammamish'},
                    {key: 'zip', value: '98074'},
                    {key: 'country', value: 'USA'}
                ],
                category: [
                    {key: 'id', value: '0'},
                    {key: 'name', value: 'Food'}
                ]
            }, {
                title: 'Milk',
                description: 'Low fat milk',
                fromDate: (new Date('Oct 1, 1995')).getTime(),
                price: 3.5,
                currency: 'USD',
                supplier: [
                    {key: 'name', value: 'Exotic Liquids'},
                    {key: 'street', value: 'NE 228th'},
                    {key: 'city', value: 'Sammamish'},
                    {key: 'zip', value: '98074'},
                    {key: 'country', value: 'USA'}
                ],
                category: [
                    {key: 'id', value: '0'},
                    {key: 'name', value: 'Food'}
                ]
            }, {
                title: 'Vint Soda',
                description: 'Americana Variety - Mix of 6 flavors',
                fromDate: (new Date('Oct 1, 2000')).getTime(),
                price: 20.9,
                currency: 'USD',
                supplier: [
                    {key: 'name', value: 'Exotic Liquids'},
                    {key: 'street', value: 'NE 228th'},
                    {key: 'city', value: 'Sammamish'},
                    {key: 'zip', value: '98074'},
                    {key: 'country', value: 'USA'}
                ],
                category: [
                    {key: 'id', value: '0'},
                    {key: 'name', value: 'Food'}
                ]
            }, {
                title: 'Havina Cola',
                description: 'The Original Key Lime Cola',
                fromDate: (new Date('Oct 1, 2005')).getTime(),
                price: 19.9,
                currency: 'USD',
                supplier: [
                    {key: 'name', value: 'Exotic Liquids'},
                    {key: 'street', value: 'NE 228th'},
                    {key: 'city', value: 'Sammamish'},
                    {key: 'zip', value: '98074'},
                    {key: 'country', value: 'USA'}
                ],
                category: [
                    {key: 'id', value: '0'},
                    {key: 'name', value: 'Food'}
                ]
            }, {
                title: 'Fruit Punch',
                description: 'Mango flavor, 8.3 Ounce Cans (Pack of 24)',
                fromDate: (new Date('Jan 5, 2003')).getTime(),
                price: 22.9,
                currency: 'USD',
                supplier: [
                    {key: 'name', value: 'Exotic Liquids'},
                    {key: 'street', value: 'NE 228th'},
                    {key: 'city', value: 'Sammamish'},
                    {key: 'zip', value: '98074'},
                    {key: 'country', value: 'USA'}
                ],
                category: [
                    {key: 'id', value: '0'},
                    {key: 'name', value: 'Food'}
                ]
            }, {
                title: 'Cranberry Juice',
                description: '16-Ounce Plastic Bottles (Pack of 12)',
                fromDate: (new Date('Aug 4, 2006')).getTime(),
                price: 22.8,
                currency: 'USD',
                supplier: [
                    {key: 'name', value: 'Exotic Liquids'},
                    {key: 'street', value: 'NE 228th'},
                    {key: 'city', value: 'Sammamish'},
                    {key: 'zip', value: '98074'},
                    {key: 'country', value: 'USA'}
                ],
                category: [
                    {key: 'id', value: '0'},
                    {key: 'name', value: 'Food'}
                ]
            }, {
                title: 'Pink Lemonade',
                description: '36 Ounce Cans (Pack of 3)',
                fromDate: (new Date('Nov 5, 2006')).getTime(),
                price: 18.8,
                currency: 'USD',
                supplier: [
                    {key: 'name', value: 'Exotic Liquids'},
                    {key: 'street', value: 'NE 228th'},
                    {key: 'city', value: 'Sammamish'},
                    {key: 'zip', value: '98074'},
                    {key: 'country', value: 'USA'}
                ],
                category: [
                    {key: 'id', value: '0'},
                    {key: 'name', value: 'Food'}
                ]
            }, {
                title: 'DVD Player',
                description: '1080P Upconversion DVD Player',
                fromDate: (new Date('Nov 15, 2006')).getTime(),
                price: 35.88,
                currency: 'USD',
                supplier: [
                    {key: 'name', value: 'House Electronics'},
                    {key: 'street', value: 'NE 228th'},
                    {key: 'city', value: 'Sammamish'},
                    {key: 'zip', value: '98074'},
                    {key: 'country', value: 'USA'}
                ],
                category: [
                    {key: 'id', value: '1'},
                    {key: 'name', value: 'Household Appliances'}
                ]
            }, {
                title: 'LCD HDTV',
                description: '42 inch 1080p LCD with Built-in Blu-ray Disc Player',
                fromDate: (new Date('May 8, 2008')).getTime(),
                price: 1088.8,
                currency: 'USD',
                supplier: [
                    {key: 'name', value: 'House Electronics'},
                    {key: 'street', value: 'NE 228th'},
                    {key: 'city', value: 'Sammamish'},
                    {key: 'zip', value: '98074'},
                    {key: 'country', value: 'USA'}
                ],
                category: [
                    {key: 'id', value: '1'},
                    {key: 'name', value: 'Household Appliances'}
                ]
            }]
        };

        translatedResponse = angular.copy(originalResponse);

        function formatDate(timestamp) {
            var date = new Date(timestamp),
                format = sapSharedI18nService.translate('dateFormat'),
                M = sapSharedI18nService.translate('months')[date.getMonth()],
                d = date.getDate(),
                Y = date.getFullYear();

            /*jslint regexp: true*/
            return format.
                replace('M', M).
                replace('d', d).
                replace('Y', Y).
                replace(/[HmS].*[HmS]/gm, '');
        }

        function walk(source) {
            var key;

            function tryToTranslate(value, key, obj) {
                switch (typeof value) {
                case 'object':
                    walk(value);
                    break;
                case 'string':
                    obj[key] = sapSharedI18nService.translate(value, 'g1t1');
                    break;
                case 'number':
                    if (key === 'price') {
                        obj[key] = Number((value * sapSharedI18nService.translate('rate', 'g1t1')).toFixed(2));
                    } else if (key === 'fromDate') {
                        obj[key] = formatDate(value);
                    }
                    break;
                }
            }

            if (angular.isArray(source)) {
                source.forEach(tryToTranslate);
            } else if (angular.isObject(source)) {
                for (key in source) {
                    if (source.hasOwnProperty(key) && key[0] !== '$') {
                        tryToTranslate(source[key], key, source);
                    }
                }
            }
        }

        function translateResponse() {
            angular.copy(originalResponse, translatedResponse);
            walk(translatedResponse);
        }

        translateResponse();
        $rootScope.$on('sapSharedI18nService.localeChanged', translateResponse);

        this.getData = function () {
            return translatedResponse;
        };

    }

    angular.
        module('sapG1t1').
        service('sapG1t1FeedService', [
            '$rootScope',
            'sapSharedI18nService',
            sapG1t1FeedService
        ]);
}());