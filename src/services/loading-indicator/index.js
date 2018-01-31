import indicatorStatusService from './indicator-status-service';
export default angular.module('loadingIndicator', [])
    .service('$loading', indicatorStatusService)
    .name;