import './indicator.scss';
import indicatorStatusService from './indicator-status-service';
import indicatorInterceptor from './indicator-interceptor';
import httpIndicator from './indicator-directive';
import config from './indicator-config';
export default angular.module('httpLoadingIndicator', [])
    .service('indicatorStatusService', indicatorStatusService)
    .service('indicatorInterceptor', indicatorInterceptor)
    .directive('httpIndicator', httpIndicator)
    .config(config)
    .name;