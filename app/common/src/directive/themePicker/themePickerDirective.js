/**
 * Created by Samy on 27/10/2015.
 */
'use strict';

/* Directives */


angular.module('theastrologist.directives')
    .controller('themePickerController', ['$scope', '$location', '$filter', '$q', 'geolocService', '$mdpDatePicker', '$mdpTimePicker',
        function ($scope, $location, $filter, $q, geolocService, $mdpDatePicker, $mdpTimePicker) {
            var that = this;
            var dateFilter = $filter('date');

            var filterDate = function (date) {
                return dateFilter(date, 'yyyy-MM-dd');
            };

            var filterTime = function (time) {
                return dateFilter(time, 'HH:mm');
            };

            var filterNatalDate = function (natalDate, time) {
                return filterDate(natalDate, 'yyyy-MM-dd') + 'T' + time;
            };

            this.showTimePicker = function(ev) {
                $mdpTimePicker(ev, $scope.currentDate).then(function(selectedTime) {
                    $scope.time = filterTime(selectedTime);
                });
            };

            this.updateFrise = function (natalDate, time) {
                $scope.showme = false;
                var currentDate = new Date();
                var currentYear = currentDate.getFullYear();
                var minDate = new Date(currentYear - 3, currentDate.getMonth(), currentDate.getDay());
                var maxDate = new Date(currentYear + 3, currentDate.getMonth(), currentDate.getDay());
                var path = '/timeline/'
                    + filterNatalDate(natalDate, time) + '/'
                    + filterDate(minDate) + '/'
                    + filterDate(maxDate) + '/'
                    + that.selectedItem.latitude + '/'
                    + that.selectedItem.longitude;
                $location.path(path);
            };

            this.search = function (searchText) {
                var deferred = $q.defer();
                if (searchText) {
                    geolocService(searchText).then(
                        function (data) {
                            var results = [];
                            var rep;
                            for (var i = 0; rep = data.results[i]; i++) {
                                var result = {
                                    display: rep.formatted_address,
                                    latitude: rep.geometry.location.lat,
                                    longitude: rep.geometry.location.lng
                                };
                                results.push(result)
                            }
                            deferred.resolve(results);
                        }
                    );
                    return deferred.promise;
                } else {
                    return null;
                }
            };
        }])
    .directive('themePicker', [function () {

        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'common/src/directive/themePicker/themepicker.html'
        };
    }]);
