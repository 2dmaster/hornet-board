import view from './main-view.html';
import mainCtrl from './main-controller';
mainConfig.$inject = ['$stateProvider'];

export default function mainConfig($stateProvider){
    $stateProvider
        .state('main', {
            url: '/',
            controller: mainCtrl,
            template: view,
            data:{
                className:'main'
            }
        });
}