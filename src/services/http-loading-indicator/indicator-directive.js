import view from './indicator-view.html';
httpIndicator.$inject = ['indicatorStatusService'];
export default function httpIndicator($status) {
    return {
        restrict: 'E',
        template: view,
        replace: true,
        link: function (scope) {
            scope.$status = $status
        }
    }
}