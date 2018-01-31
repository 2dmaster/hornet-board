indicatorStatusService.$inject = [];
export default function indicatorStatusService() {
    var indicatorStatus = {
        active: false
    };
    indicatorStatus.setStatus = function (status) {
        indicatorStatus.active = status;
    };
    indicatorStatus.getStatus = function () {
        return indicatorStatus.active;
    };
    return indicatorStatus;
}