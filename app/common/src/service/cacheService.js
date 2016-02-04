/**
 * Created by Samy on 27/10/2015.
 */

'use strict';
angular.module('theastrologist.services').service('cacheService', ['$q', function ($q) {
    this.cache = {};

    this.getData = function (id, loadFunction, transformFunction, errorFunction, forceReload) {
        var deferred = $q.defer();
        var that = this;

        if (!forceReload && that.cache[id]) {
            deferred.resolve(that.cache[id]);
        } else {
            $q.when(loadFunction()).then(
                function (data) {
                    if (transformFunction) {
                        data = transformFunction(data, that.cache[id]);
                    }
                    that.cache[id] = data;

                    deferred.resolve(data);
                }, function (error) {
                    var data = null;
                    if (errorFunction) {
                        data = errorFunction(error, that.cache[id]);
                    }

                    if (data) {
                        if (transformFunction) {
                            data = transformFunction(data, that.cache[id]);
                        }
                        that.cache[id] = data;
                        deferred.resolve(data);
                    } else {
                        deferred.reject(error);
                    }
                }
            );
        }
        return deferred.promise;
    };

    this.getCachedData = function (id) {
        return this.cache[id];
    };

    this.setCachedData = function (id, data) {
        this.cache[id] = data;
    };

    this.removeCachedData = function (id) {
        delete this.cache[id];
    };
}]);
