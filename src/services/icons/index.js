import iconsService from './icons-service';
export default angular.module('iconsModule', [])
    .service('$icons', iconsService)
    .name;