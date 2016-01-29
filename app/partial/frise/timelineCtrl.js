/**
 * Created by Samy on 23/10/2015.
 */
angular.module('theastrologist.controllers', []).controller('timelineCtrl', [
    '$scope', '$routeParams', 'transitPeriodService',
    function ($scope, $routeParams, transitPeriodService) {

        var that = this;
        $scope.planetList = [
            'NOEUD_NORD_MOYEN',
            'PLUTON',
            'NEPTUNE',
            'URANUS',
            'SATURNE',
            'JUPITER',
            'LILITH_MOYENNE'
        ];

        function updateData(startDate, endDate) {
            transitPeriodService(
                $routeParams.natalDate,
                startDate, endDate,
                $routeParams.latitude,
                $routeParams.longitude
            ).then(function (data) {
                $scope.data = data;
            });
        }

        updateData($routeParams.startDate, $routeParams.endDate);

        this.timelines = [];
        $scope.onRangeChange = function (planet, start, end) {

            for (loopPlanet in that.timelines) {
                if (planet != loopPlanet) {
                    var line = that.timelines[loopPlanet];
                    line.setWindow(start, end, {animation: false});
                }
            }
        };

        $scope.registerTimeline = function (planet, timeline) {
            that.timelines[planet] = timeline;
            timeline.on('rangechange', function (properties) {
                $scope.onRangeChange(planet, properties.start, properties.end);
            });
        };
    }]);
