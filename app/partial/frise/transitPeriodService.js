/**
 * Created by Samy on 24/10/2015.
 */
angular.module('theastrologist.services')
    .factory('transitPeriodService', ['$http', '$log', '$q', function ($http, $log, $q) {
        //var urlPrefix = 'http://localhost:9090/theastrologist/rest';
        var urlPrefix = 'https://rest-theastrologist.rhcloud.com/rest';

        var constructUrl = function (natalDate, startDate, endDate, latitude, longitude) {

            return urlPrefix + '/transitperiod/' +
                natalDate + '/' +
                startDate + '/' +
                endDate + '/' +
                latitude + '/' +
                longitude;
        };

        return function (natalDate, startDate, endDate, latitude, longitude) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: constructUrl(natalDate, startDate, endDate, latitude, longitude),
                crossDomain: true
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (msg, code) {
                deferred.reject(msg);
                $log.error(msg, code);
            });
            return deferred.promise;
        };
    }]);