'use strict';


// Declare app level module which depends on filters, and services
angular.module('theastrologist', [
    'ngRoute',
    'ngMaterial',
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
}]);

angular.module('theastrologist.controllers', []);
angular.module('theastrologist.services', []);
angular.module('theastrologist.directives', []);
angular.module('theastrologist.filters', []);
