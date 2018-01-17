import view from './main-view.html';
import mainCtrl from './main-controller';
mainConfig.$inject = ['$routeProvider'];

export default function mainConfig($routeProvider){
    $routeProvider
        .when('/', {
            controller: mainCtrl,
            template: view
        });
}