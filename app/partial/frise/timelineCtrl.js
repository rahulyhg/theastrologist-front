/**
 * Created by Samy on 23/10/2015.
 */
angular.module('theastrologist.controllers', []).controller('timelineCtrl', [
    '$scope', '$routeParams', 'transitPeriodService',
    function ($scope, $routeParams, transitPeriodService) {
        $scope.planetList = ['JUPITER', 'SATURNE', 'URANUS', 'NEPTUNE', 'PLUTON', 'NOEUD_NORD_MOYEN', 'LILITH_MOYENNE'];

        var promise = transitPeriodService($routeParams.natalDate, $routeParams.startDate, $routeParams.endDate,
            $routeParams.latitude, $routeParams.longitude);

        promise.then(function (data) {
            $scope.data = data;
        });
    }]);
