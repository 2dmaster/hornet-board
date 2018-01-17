config.$inject = ['$routeProvider','localStorageServiceProvider'];
export default function config($routeProvider, localStorageServiceProvider) {
    $routeProvider.otherwise('/');
    localStorageServiceProvider
        .setPrefix('hornet-board')
        .setStorageType('sessionStorage');
}