/**
 * Created by Samy on 31/12/2015.
 */

angular.module('theastrologist.services')
    .factory('geolocService', ['$http', '$log', '$q', 'cacheService', function ($http, $log, $q, cacheService) {
        //var urlPrefix = 'http://localhost:9090/theastrologist/rest';
        const urlPrefix = 'https://maps.googleapis.com/maps/api/geocode/json';
        const API_KEY = 'AIzaSyC0K_Vy082RPyf4huiNSj1I84k-xPxszM8';

        var constructUri = function (searchText) {
            return '?address=' + searchText + '&key=' + API_KEY;
        };

        return function (searchText) {
            var deferred = $q.defer();
            if (searchText) {
                var uri = constructUri(searchText);
                return cacheService.getData(
                    uri,
                    function () {
                        var def = $q.defer();
                        $http({
                            method: 'GET',
                            url: urlPrefix + uri,
                            crossDomain: true
                        }).success(function (data) {
                            def.resolve(data);
                        }).error(function (msg, code) {
                            def.reject(msg);
                            $log.error(msg, code);
                        });
                        return def.promise;
                    }
                );
            } else {
                deferred.reject("Error with arguments - searchText: " + searchText);
                return deferred.promise;
            }
        };
    }]);