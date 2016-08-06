'use strict';

/* Directives */

angular.module('theastrologist.directives').directive('timeline', [function () {
    var OPTIONS = {
        orientation: {axis: 'top', item: 'top'},
        zoomMin: 1000 * 60 * 60 * 24 * 31 * 6,         // Un mois en millisecondes
        zoomMax: 1000 * 60 * 60 * 24 * 31 * 12 * 4, // 2 ans
        throttleRedraw: 50
    };

    var GROUPS = new vis.DataSet([
        {"content": "Conjonctions", "id": "conj", "value": 1, className: 'aspect-group-conj'},
        {"content": "Opp. / Trigones", "id": "princ", "value": 2, className: 'aspect-group-princ'},
        {"content": "Carrés / Sextiles", "id": "second", "value": 3, className: 'aspect-group-second'}
    ]);

    var ASPECT_GROUPS = {
        CONJONCTION: {groupId: 'conj', groupItemClass: 'item-conjonction'},
        OPPOSITION: {groupId: 'princ', groupItemClass: 'item-negatif'},
        TRIGONE: {groupId: 'princ', groupItemClass: 'item-positif'},
        CARRE: {groupId: 'second', groupItemClass: 'item-negatif'},
        SEXTILE: {groupId: 'second', groupItemClass: 'item-positif'}
    };

    var ASPECT_ORDERS = {
        CONJONCTION: 0,
        OPPOSITION: 1,
        TRIGONE: 1,
        CARRE: 2,
        SEXTILE: 2
    };

    var fillPlanetPeriods = function (periods, items, planet, scope) {
        var $parent = scope.$parent;

        angular.forEach(periods, function (value, index) {
            var aspectObject = ASPECT_GROUPS[value.aspect];

            var existingPrefix = planet + '-' + value.aspect + '-' + value.natalPlanet + '-';

            var id = getExisting(value, existingPrefix, $parent, items);

            if (id) {
                var el = {
                    id: id,
                    content: value.natalPlanet,
                    start: value.startDate,
                    end: value.endDate,
                    group: aspectObject.groupId,
                    order: ASPECT_ORDERS[value.aspect],
                    className: aspectObject.groupItemClass
                };
                items.add(el);
            }
        });
    };

    function getExisting(value, existingPrefix, $parent, items) {
        var lastQueriedEndDate = $parent.lastQueriedEndDate;
        var lastQueriedStartDate = $parent.lastQueriedStartDate;

        var visibleEndDate = $parent.visibleEndDate;
        var visibleStartDate = $parent.visibleStartDate;

        var startDate = value.startDate;
        var endDate = value.endDate;

        var future = new Date($parent.lastQueriedStartDate) > new Date($parent.visibleStartDate);

        var existing;

        if (value.endDate == lastQueriedEndDate && !future) {
            // Cas où on scroll vers le passé, on cherche les "first"
            existing = items.get(existingPrefix + 'first');
            if (existing) {
                endDate = existing.end;
            }
        } else if (value.startDate == lastQueriedStartDate && future) {
            // Cas où on scroll vers le futur, on cherche les "last"
            existing = items.get(existingPrefix + 'last');
            if (existing) {
                startDate = existing.start;
            }
        }

        var id = null;

        if (existing) {
            var lastId = existing.id;
            items.remove(lastId);
            existing.id = existingPrefix + startDate;
            existing.start = startDate;
            existing.end = endDate;
            items.update(existing);
        } else {
            if (value.startDate == visibleStartDate) {
                id = existingPrefix + 'first';
            } else {
                if (value.endDate == visibleEndDate) {
                    id = existingPrefix + 'last';
                } else {
                    id = existingPrefix + value.startDate;
                }
            }
        }
        return id;
    }

    var fillHousePeriods = function (periods, items, planet, scope) {
        var $parent = scope.$parent;

        angular.forEach(periods, function (value, index) {
            var existingPrefix = planet + '-' + value.natalHouse + '-';

            var id = getExisting(value, existingPrefix, $parent, items);

            if (id) {
                var el = {
                    id: id,
                    content: value.natalHouse,
                    start: value.startDate,
                    end: value.endDate,
                    type: 'background',
                    className: value.natalHouse
                };
                items.add(el);
            }
        });
    };

    return {
        restrict: 'E',
        replace: true,
        scope: {
            planet: '@',
            data: '='
        },
        template: '<md-card id="{{planet}}-viz">' +
        '   <md-card-content>' +
        '       <h2 class="md-title">{{planet}}</h2>' +
        '       <div class="planet-timeline"></div>' +
        '   </md-card-content>' +
        '</md-card>',
        link: function (scope, elm, attr) {
            scope.element = elm;
            scope.$watchGroup(['planet', 'data'], function (newValues, oldValues, scope) {
                var planet = newValues[0];
                var data = newValues[1];
                if (planet && data) {
                    var planetPeriods = data.planetPeriods[planet];
                    var housePeriods = data.housePeriods[planet];

                    if (!scope.localFrise) {
                        var items = new vis.DataSet();
                        fillPlanetPeriods(planetPeriods, items, planet, scope);
                        fillHousePeriods(housePeriods, items, planet, scope);
                        //var myElement = document.querySelector('#' + planet + '-viz .planet-timeline');
                        //var myElement = document.querySelector('.planet-timeline');
                        var myElement = scope.element.find('div')[0];
                        if (myElement) {
                            var localFrise = new vis.Timeline(myElement);
                            localFrise.setOptions(OPTIONS);
                            localFrise.setGroups(GROUPS);
                            localFrise.setItems(items);
                            var $parent = scope.$parent;
                            if($parent.registerTimeline) {
                                $parent.registerTimeline(planet, localFrise);
                                var window = localFrise.getWindow();
                                $parent.onRangeChange(localFrise, window.start, window.end);
                                scope.localFrise = localFrise;
                                scope.items = items;
                            }
                        }
                    } else {
                        // Si la frise existe déjà on met juste à jour avec des nouveaux éléments
                        fillPlanetPeriods(planetPeriods, scope.items, planet, scope);
                        fillHousePeriods(housePeriods, scope.items, planet, scope);
                    }
                }
            });
        }
    };
}]);
