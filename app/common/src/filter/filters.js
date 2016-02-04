'use strict';

/* Filters */

angular.module('theastrologist.filters')
    .filter('isoDate', ['$filter', function ($filter) {
        return function (date) {
            return $filter('date')(date, 'yyyy-MM-dd');
        };
    }])
    .filter('isoDateTime', ['$filter', function ($filter) {
        return function (date, time) {
            return $filter('isoDate')(date) + 'T' + time;
        };
    }])
    .filter('isoTime', ['$filter', function ($filter) {
        return function (date) {
            return $filter('date')(date, 'HH:mm');
        };
    }]);
