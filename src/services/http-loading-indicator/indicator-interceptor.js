indicatorInterceptor.$inject = ['$q', 'indicatorStatusService', '$timeout'];
export default function indicatorInterceptor($q, $status, $timeout) {
    var xhrInProgress = 0,
        delay = 100,
        inProgress = function() {
            return xhrInProgress > 0;
        },
        setStatus = function () {
            $status.setStatus(inProgress());
        };
    return {
        request: function (config) {
            xhrInProgress++;
            $timeout(setStatus, delay);
            return config;
        },
        requestError: function (rejection) {
            xhrInProgress--;
            $timeout(setStatus, delay);
            return $q.reject(rejection);
        },
        response: function (response) {
            xhrInProgress--;
            $timeout(setStatus, delay);
            return response;
        },
        responseError: function (rejection) {
            xhrInProgress--;
            $timeout(setStatus, delay);
            return $q.reject(rejection);
        }
    };
}