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
        this.startDate = $routeParams.startDate;
        this.endDate = $routeParams.endDate;

        this.queryDataAndUpdateFrise = function () {
            that.promise = transitPeriodService(
                $routeParams.natalDate,
                that.startDate, that.endDate,
                $routeParams.latitude,
                $routeParams.longitude
            );
            that.promise.then(function (data) {
                $scope.data = data;
            });
        };

        this.queryDataAndUpdateFrise();

        this.timelines = [];
        $scope.onRangeChange = function (planet, start, end) {
            if (that.promise.$$state.status !== 0) {
                // Si pas pending
                var startDate = new Date(that.startDate);
                var endDate = new Date(that.endDate);
                if (start < startDate) {
                    // Chargement de la date avant
                    var previousStartDate = startDate.getFullYear();
                    that.startDate = $filter('isoDate')(new Date(previousStartDate - 6, startDate.getMonth(), startDate.getDay()));
                    that.endDate = $filter('isoDate')(new Date(previousStartDate, startDate.getMonth(), startDate.getDay()));
                    that.queryDataAndUpdateFrise();
                } else if (end > endDate) {
                    // Chargement de la date avant
                    var previousEndDate = endDate.getFullYear();
                    that.startDate = $filter('isoDate')(new Date(previousEndDate, endDate.getMonth(), endDate.getDay()));
                    that.endDate = $filter('isoDate')(new Date(previousEndDate + 6, endDate.getMonth(), endDate.getDay()));
                    that.queryDataAndUpdateFrise();
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
