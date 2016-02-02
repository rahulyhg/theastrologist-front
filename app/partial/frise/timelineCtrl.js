/**
 * Created by Samy on 23/10/2015.
 */
angular.module('theastrologist.controllers', []).controller('timelineCtrl', [
    '$scope', '$routeParams', 'transitPeriodService', '$filter',
    function ($scope, $routeParams, transitPeriodService, $filter) {

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

        this.promise = null;
        this.visibleStartDate = $routeParams.startDate;
        this.visibleEndDate = $routeParams.endDate;

        this.queryDataAndUpdateFrise = function (start, end) {
            that.promise = transitPeriodService(
                $routeParams.natalDate,
                start, end,
                $routeParams.latitude,
                $routeParams.longitude
            );
            that.promise.then(function (data) {
                $scope.data = data;
            });
        };

        this.queryDataAndUpdateFrise($routeParams.startDate, $routeParams.endDate);

        this.timelines = [];
        $scope.onRangeChange = function (planet, start, end) {
            if (that.promise.$$state.status !== 0) {
                // Si pas pending
                var startDate = new Date(that.visibleStartDate);
                var endDate = new Date(that.visibleEndDate);
                if (start < startDate) {
                    // Chargement de la date avant
                    that.visibleStartDate = $filter('isoDate')(new Date(startDate.getFullYear() - 6, startDate.getMonth(), startDate.getDay()));
                    that.queryDataAndUpdateFrise(that.visibleStartDate, $filter('isoDate')(startDate));
                } else if (end > endDate) {
                    // Chargement de la date avant
                    that.visibleEndDate = $filter('isoDate')(new Date(endDate.getFullYear() + 6, endDate.getMonth(), endDate.getDay()));
                    that.queryDataAndUpdateFrise($filter('isoDate')(endDate), that.visibleEndDate);
                }
            }

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
