mainCtrl.$inject = ['$scope', '$bluetooth', '$loading', '$commands', '$controls', '$utils'];
export default function mainCtrl($scope, $bluetooth, $loading, $commands, $controls, $utils){
    $scope.mainMenuVisible = false;


    $scope.toggleMainMenu = function () {
        $scope.mainMenuVisible = !$scope.mainMenuVisible
    };

    $scope.getDeviceState = function () {
        return JSON.parse(localStorage.getItem('deviceState')) || null
    };

    $scope.setDeviceState = function () {
        localStorage.setItem('deviceState', JSON.stringify($scope.deviceState));
    };

    $scope.assignActions = function (controls) {
        for (var key in controls) {
            if (controls.hasOwnProperty(key)){
                controls[key].action = $scope.controlAction
            }
        }
    };

    $scope.initDeviceState = function () {
        $scope.deviceState = $scope.getDeviceState() ||
            {
                controls : $controls,
                bluetooth:{
                    address : null,
                    $index: null
                }
            };
        $scope.assignActions($scope.deviceState.controls);
    };

    $scope.processControl = function (control) {
        // $scope.send(control.device+$utils.delimit(control.command));
        console.log(control.device+$utils.delimit(control.command));
    };

    $scope.controlAction = function (name) {
        var control = $scope.deviceState.controls[name];
        control.active ? control.command = $commands.OFF : control.command = $commands.ON;
        $scope.processControl(control);
        control.active = !control.active;
        $scope.setDeviceState();
    };

    $scope.handleDestroy = function () {
        $bluetooth.isConnected().then($scope.disconnectBluetooth($scope.deviceState.bluetooth.$index))
    };

    // $bluetooth.isEnabled()
    //     .then($bluetooth.getBoundedDevices, function (err) {
    //         $bluetooth.enable()
    //             .then($bluetooth.getBoundedDevices)
    //             .then(function (devices) {
    //                 return $scope.devices = devices;
    //             })
    //     }).then(function (devices) {
    //     return $scope.devices = devices;
    // });

    $scope.devices = [
        {
            name:'test',
            address: '905445::056:00',
            active:true
        },
        {
            name:'test',
            address: '905445::056:00',
            active:true
        },
        {
            name:'test',
            address: '905445::056:00',
            active:false
        }
    ];

    $scope.openPort = function() {
        $loading.setStatus(true);
        return $bluetooth.subscribe('\n', $scope).then(function () {
            $loading.setStatus(false);
            return $scope.$on('$bluetooth-data', function (e, data) {
                $scope.bluetoothData = data;
            })
        });
    };

    $scope.closePort = function() {
        $loading.setStatus(true);
        return $bluetooth.unsubscribe($scope).then(function(){
            $loading.setStatus(false);
            return $scope.$on('$bluetooth-data-unsubscribe', function (e, data) {
                $scope.bluetoothData = data;
            })
        });
    };

    $scope.send = function (text) {
        $bluetooth.write(text).then(function (success) {
            $scope.test = success;
        }, function (err) {
            $scope.test = err;
        });
    };

    $scope.connectBluetooth = function (address, $index) {
        $loading.setStatus(true);
        $scope.deviceState.bluetooth.address = address;
        $scope.deviceState.bluetooth.$index = $index;
        $scope.setDeviceState();
        $bluetooth.connect(address)
            .then($scope.openPort, function (err) {
                $loading.setStatus(false);
            })
            .then(function () {
                $loading.setStatus(false);
                $scope.devices[$index].active = !$scope.devices[$index].active;
            });
    };

    $scope.disconnectBluetooth = function ($index) {
        $loading.setStatus(true);
        $scope.deviceState.bluetooth.address = null;
        $scope.deviceState.bluetooth.$index = null;
        $scope.setDeviceState();
        $bluetooth.disconnect()
            .then($scope.closePort, function (err) {
                $loading.setStatus(false);
            })
            .then(function () {
                $loading.setStatus(false);
                $scope.devices[$index].active = !$scope.devices[$index].active;
            })
    };

    $scope.manageConnection= function(address, $index) {
        $bluetooth.isConnected().then(
            function () {
                $scope.disconnectBluetooth($index);
            },
            function () {
                $scope.connectBluetooth(address, $index);
            }
        );
    };
    $scope.$on('$destroy', $scope.handleDestroy);
    $scope.initDeviceState();
}
