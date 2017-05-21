/**
 * Created by Samy on 27/10/2015.
 */
'use strict';

/* Directives */


angular.module('theastrologist.directives')
    .controller('themePickerController', [
        '$scope', '$location', '$filter', '$q', 'geolocService',
        function ($scope, $location, $filter, $q, geolocService) {
            var that = this;

            this.updateFrise = function (natalDate) {
                $scope.showme = false;
                var currentDate = new Date();
                var currentYear = currentDate.getFullYear();
                var minDate = new Date(currentYear - 3, currentDate.getMonth(), currentDate.getDay());
                var maxDate = new Date(currentYear + 3, currentDate.getMonth(), currentDate.getDay());

                //var filteredNatalDate = $filter('isoDateTime')(natalDate, time);
                // Passer de "2017-03-28 13:14" à "2017-03-28T13:14"
                var filteredNatalDate = natalDate.split(' ').join('T');
                var filteredMinDate = $filter('isoDate')(minDate);
                var filteredMaxDate = $filter('isoDate')(maxDate);

                var path = '/timeline/'
                    + filteredNatalDate + '/'
                    + that.selectedItem.latitude + '/'
                    + that.selectedItem.longitude + '/'
                    + filteredMinDate + '/'
                    + filteredMaxDate;
                $location.path(path);
            };

            this.search = function (searchText) {
                var deferred = $q.defer();
                if (searchText) {
                    geolocService(searchText).then(
                        function (response) {
                            var results = [];
                            var rep;
                            var data = response.data;
                            if(data) {
                                for (var i = 0; rep = data.results[i]; i++) {
                                    var result = {
                                        display: rep.formatted_address,
                                        latitude: rep.geometry.location.lat,
                                        longitude: rep.geometry.location.lng
                                    };
                                    results.push(result)
                                }
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
