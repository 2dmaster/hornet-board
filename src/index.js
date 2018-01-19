import './scss/base.scss';
import config from './config.js';
import run from './run.js';
import httpIndicator from './services/http-loading-indicator';
import bluetoothModule from './services/bluetooth'
import main from './modules/main';
import iconsModule from './services/icons';

var hornetBoard = angular.module('hornetBoard', [
    'ngRoute',
    bluetoothModule,
    httpIndicator,
    iconsModule,
    main
]),
    appBootstrap = function () {
        deferredBootstrapper.bootstrap({
            element: document,
            module: 'hornetBoard'
        });
    };

hornetBoard
    .config(config)
    .run(run);

if (window.cordova){
    document.addEventListener('deviceready', appBootstrap);
} else {
    appBootstrap();
}