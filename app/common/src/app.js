'use strict';


// Declare app level module which depends on filters, and services
angular.module('theastrologist', [
    'ngRoute',
    'ngMaterial',
    'ngAnimate',
    'ngAria',
    'theastrologist.filters',
    'theastrologist.services',
    'theastrologist.directives',
    'theastrologist.controllers'
]).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/timeline/:natalDate/:startDate/:endDate/:latitude/:longitude', {
        templateUrl: '../../partial/frise/timeline.html',
        controller: 'timelineCtrl'
    });
    $routeProvider.otherwise({redirectTo: '/timeline'});
}]).config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('httpLoaderInterceptor');
    $httpProvider.interceptors.push('requestsErrorHandler');
}]);

angular.module('theastrologist.filters', []);
angular.module('theastrologist.services', []);
angular.module('theastrologist.directives', ['smDateTimeRangePicker']);
angular.module('theastrologist.controllers', []);
