import './scss/base.scss';
import config from './config.js';
import run from './run.js';
import httpIndicator from './services/http-loading-indicator';
import bluetoothModule from './services/bluetooth'
import main from './modules/main';

var hornetBoard = angular.module('hornetBoard', [
    'ui.router',
    'LocalStorageModule',
    'rzModule',
    bluetoothModule,
    httpIndicator,
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