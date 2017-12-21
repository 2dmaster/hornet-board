config.$inject = ['$stateProvider', '$urlRouterProvider','localStorageServiceProvider'];
export default function config($stateProvider, $urlRouterProvider, localStorageServiceProvider) {
    $urlRouterProvider.otherwise('/');
    localStorageServiceProvider
        .setPrefix('hornet-board')
        .setStorageType('sessionStorage');
}