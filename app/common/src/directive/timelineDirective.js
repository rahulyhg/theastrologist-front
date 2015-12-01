'use strict';

/* Directives */


angular.module('theastrologist.directives').
directive('timeline', [function () {
    const options = {
        orientation: {axis: 'top', item: 'top'}
    };
    var orders = {
        CONJONCTION: 0,
        OPPOSITION: 1,
        TRIGONE: 1,
        CARRE: 2,
        SEXTILE: 2
    };

    var fillPlanetPeriods = function (periods, items, planet) {
        angular.forEach(periods, function (value, index) {
            var el = {
                id: planet + '-' + index,
                content: value.aspect + ' ' + value.natalPlanet,
                start: value.startDate,
                end: value.endDate,
                group: planet,
                order: orders[value.aspect]
            };
            items.add(el);
        });
    };

    var fillHousePeriods = function (periods, items, planet) {
        angular.forEach(periods, function (value, index) {
            var el = {
                id: planet + '-' + value.natalHouse + '-' + index,
                content: value.natalHouse,
                start: value.startDate,
                end: value.endDate,
                group: planet,
                type: 'background',
                className: value.natalHouse
            };
            items.add(el);
        });
    };

    return {
        restrict: 'E',
        replace: true,
        scope: {
            planet: '@',
            data: '='
        },
        template: '<div><span>{{planet}}</span></div>',
        compile: function (element, attribut) {
            return function (scope, elm, attr) {
                scope.$watchGroup(['planet', 'data'], function (newValues, oldValues, scope) {
                    var planet = newValues[0];
                    var data = newValues[1];
                    if (planet && data) {
                        var planetPeriods = data.planetPeriods[planet];
                        var housePeriods = data.housePeriods[planet];

                        var items = new vis.DataSet();
                        fillPlanetPeriods(planetPeriods, items, planet);
                        fillHousePeriods(housePeriods, items, planet);

                        var localFrise = new vis.Timeline(elm[0]);
                        localFrise.setOptions(options);
                        localFrise.setItems(items);
                    }
                });
            };
        }
    };
}]);
