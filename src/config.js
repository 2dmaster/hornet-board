config.$inject = ['$routeProvider'];
export default function config($routeProvider) {
    $routeProvider.otherwise('/');
}