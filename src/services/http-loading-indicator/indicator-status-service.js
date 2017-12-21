export default function indicatorStatusService() {
    var indicatorStatus = {};
    indicatorStatus.setStatus = function (status) {
        indicatorStatus.isActive = status;
    };
    indicatorStatus.getStatus = function () {
        return indicatorStatus.isActive;
    };
    return indicatorStatus;
}