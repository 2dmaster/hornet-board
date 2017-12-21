import bluetoothApiService from './bluetooth-api-service';
export default angular.module('bluetoothModule', [])
    .service('$bluetooth', bluetoothApiService)
    .name;