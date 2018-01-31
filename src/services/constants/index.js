import commandsService from './commands-service';
import controlsService from './controls-service';
import utilsService from './utils-service';
export default angular.module('constantsModule', [])
    .service('$utils', utilsService)
    .service('$commands', commandsService)
    .service('$controls', controlsService)
    .name;