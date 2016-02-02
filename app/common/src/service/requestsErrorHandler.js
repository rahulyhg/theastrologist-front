/**
 * Created by Samy on 01/02/2016.
 */
var specificallyHandleInProgress = false;
angular.module('theastrologist.services').factory('requestsErrorHandler', ['$q', '$injector', function ($q, $injector) {

    var toastr;

    function getToaster() {
        if (!toastr) {
            toastr = $injector.get("$mdToast");
        }
        return toastr;
    }

    return {
        // --- The user's API for claiming responsiblity for requests ---
        specificallyHandled: function (specificallyHandledBlock) {
            specificallyHandleInProgress = true;
            try {
                return specificallyHandledBlock();
            } finally {
                specificallyHandleInProgress = false;
            }
        },

        // --- Response interceptor for handling errors generically ---
        responseError: function (rejection) {
            // --- Your generic error handling goes here ---
            getToaster().showSimple('Erreur d\'accès au serveur distant');
            console.error('Erreur d\'accès au serveur distant, exception : ' + rejection);

            return $q.reject(rejection);
        }
    };
}]);