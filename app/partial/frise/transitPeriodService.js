/**
 * Created by Samy on 24/10/2015.
 */
angular.module('theastrologist.services')
    .factory('transitPeriodService', [
        '$http', '$log', '$q', 'cacheService',
        function ($http, $log, $q, cacheService) {
        //var urlPrefix = 'http://localhost:9090/theastrologist/rest/transitperiod';
        var urlPrefix = 'https://rest-theastrologist.rhcloud.com/rest/transitperiod';

        var constructUri = function (natalDate, startDate, endDate, latitude, longitude) {

            return natalDate + '/' +
                startDate + '/' +
                endDate + '/' +
                latitude + '/' +
                longitude;
        };

        return function (natalDate, startDate, endDate, latitude, longitude) {
            var deferred = $q.defer();
            if (natalDate && startDate && endDate && latitude && longitude) {
                var uri = constructUri(natalDate, startDate, endDate, latitude, longitude);
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