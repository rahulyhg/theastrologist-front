/**
 * Created by Samy on 30/01/2016.
 */
angular.module('theastrologist.services').factory('httpLoaderInterceptor', ['$rootScope', function($rootScope) {
    // Active request count
    var requestCount = 0;

    function startRequest(config) {
        // If no request ongoing, then broadcast start event
        if( !requestCount ) {
            $rootScope.$broadcast('httpLoaderStart');
        }

        requestCount++;
        return config;
    }

    function endRequest(arg) {
        // No request ongoing, so make sure we don’t go to negative count
        if( !requestCount )
            return;

        requestCount--;
        // If it was last ongoing request, broadcast event
        if( !requestCount ) {
            $rootScope.$broadcast('httpLoaderEnd');
        }

        return arg;
    }

    // Return interceptor configuration object
    return {
        'request': startRequest,
        'requestError': endRequest,
        'response': endRequest,
        'responseError': endRequest
    };
}]);
