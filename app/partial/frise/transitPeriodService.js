/**
 * Created by Samy on 24/10/2015.
 */
angular.module('theastrologist.services')
    .factory('transitPeriodService', [
        '$http', '$log', '$q', 'cacheService',
        function ($http, $log, $q, cacheService) {
            var urlPrefix = 'http://rest-theastrologist.193b.starter-ca-central-1.openshiftapps.com/rest';

            var constructUri = function (natalDate, latitude, longitude, startDate, endDate) {

                return natalDate + '/' +
                    latitude + '/' +
                    longitude + '/' +
                    'transitperiod/' +
                    startDate + '/' +
                    endDate;
            };

            return function (natalDate, latitude, longitude, startDate, endDate) {
                var deferred = $q.defer();
                if (natalDate && startDate && endDate && latitude && longitude) {
                    var uri = constructUri(natalDate, latitude, longitude, startDate, endDate);
                    return cacheService.getData(
                        uri,
                        function () {
                            var def = $q.defer();
                            $http({
                                method: 'GET',
                                url: urlPrefix + '/' + uri,
                                crossDomain: true
                            }).then(function (response) {
                                def.resolve(response.data);
                            }, function (msg, code) {
                                def.reject(msg);
                                $log.error(msg, code);
                            });
                            return def.promise;
                        }
                    );
                } else {
                    deferred.reject("Error with arguments - natalDate: " + natalDate + ", startDate: " + startDate +
                        "endDate: " + ", endDate: " + endDate + ", latitude: " + latitude + ", longitude: " + longitude);
                    return deferred.promise;
                }
            };
        }]);