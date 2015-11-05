/**
 * Created by Samy on 23/10/2015.
 */
angular.module('theastrologist.controllers', []).controller('timelineCtrl', [
    '$scope', '$routeParams', 'transitPeriodService',
    function ($scope, $routeParams, transitPeriodService) {
        var self = this;

        var planetList = ['JUPITER', 'SATURNE', 'URANUS', 'NEPTUNE', 'PLUTON', 'NOEUD_NORD_MOYEN', 'LILITH_MOYENNE'];

        var orders = {
            CONJONCTION: 0,
            OPPOSITION: 1,
            TRIGONE: 1,
            CARRE: 2,
            SEXTILE: 2
        };

        angular.element(document).ready(function () {
            // Configuration for the Timeline
            var options = {};
            items = new vis.DataSet([{id: 12048, content: 'tutu', start: '2013-06-01', end: '2013-06-10'}]);

            var planetGroups = new vis.DataSet([
                {id: 'NOEUD_NORD_MOYEN', content: 'Noeud nord', value: 1},
                {id: 'PLUTON', content: 'Pluton', value: 2},
                {id: 'NEPTUNE', content: 'Neptune', value: 3},
                {id: 'URANUS', content: 'Uranus', value: 4},
                {id: 'SATURNE', content: 'Saturne', value: 5},
                {id: 'JUPITER', content: 'Jupiter', value: 6},
                {id: 'LILITH_MOYENNE', content: 'Lune noire moyenne', value: 7}
            ]);


            var promise = transitPeriodService($routeParams.natalDate, $routeParams.startDate, $routeParams.endDate,
                $routeParams.latitude, $routeParams.longitude);

            promise.then(function (data) {
                fillPlanetPeriods(data);
                fillHousePeriods(data);

                // DOM element where the Timeline will be attached
                var container = document.getElementById('visualization');

                // Create a Timeline
                var timeline = new vis.Timeline(container);
                timeline.setOptions({
                    orientation: {axis: 'both', item: 'top'},
                    order: function (a, b) {
                        return a.order - b.order;
                    }
                });
                timeline.setGroups(planetGroups);
                timeline.setItems(items);
            });
        });

        var fillPlanetPeriods = function (data) {
            angular.forEach(planetList, function (value, index) {
                var planet = value;
                var period = data.planetPeriods[planet];

                // Create a DataSet (allows two way data-binding)
                $.map(period, function (value, index) {
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
            });
        };

        var fillHousePeriods = function (data) {
            angular.forEach(planetList, function (value, index) {
                var planet = value;
                var period = data.housePeriods[planet];

                // Create a DataSet (allows two way data-binding)
                $.map(period, function (value, index) {
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
            });
        };
    }]);
