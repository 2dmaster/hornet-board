mainCtrl.$inject = ['$scope', '$state', '$bluetooth', 'indicatorStatusService'];
export default function mainCtrl($scope, $state, $bluetooth, $loading){
    $scope.control ={
        extras:false
    };
    $scope.toggleControl = function () {
        $scope.control.extras = !$scope.control.extras;
    };
 var
     ON = '1',
     OFF = '2',
    // end common constants

    // device config
     AMP = '4',
     ILLUMINATION = '5',
     LIGHT_L = '6',
     LIGHT_R = 9,
     LIGHT_BOTH = '11';


    $scope.bothSlider = {
        value: 0,
        options: {
            floor: 0,
            ceil: 255,
            step: 1,
            id: 'slider-id1',
            onChange: function(id, newVal) {
                // $scope.send(LIGHT_BOTH+';'+newVal+';');
                    // .then(function () {
                    //     $scope.send(newVal);
                    // }, function (err) {
                    //     console.log(err);
                    // })
            },
        }
    };

    // $scope.leftSlider = {
    //     value: 0,
    //     options: {
    //         floor: 0,
    //         ceil: 255,
    //         step: 1,
    //         id: 'slider-id2',
    //         onChange: function(id, newVal) {
    //             $scope.send(LIGHT_L+';'+newVal+';');
    //
    //                 // .then(function () {
    //                 //     $scope.send(newVal);
    //                 // }, function (err) {
    //                 //     console.log(err);
    //                 // })
    //         },
    //     }
    // };
    //
    // $scope.rightSlider = {
    //     value: 0,
    //     options: {
    //         floor: 0,
    //         ceil: 255,
    //         step: 1,
    //         id: 'slider-id3',
    //         onChange: function(id, newVal) {
    //             $scope.send(LIGHT_R+';'+newVal+';')
    //                 // .then(function () {
    //                 //     $scope.send(newVal);
    //                 // }, function (err) {
    //                 //     console.log(err);
    //                 // })
    //         },
    //     }
    // };
 //    $bluetooth.isEnabled()
 //        .then($bluetooth.getBoundedDevices, function (err) {
 //            $bluetooth.enable()
 //                .then($bluetooth.getBoundedDevices)
 //                .then(function (devices) {
 //                    return $scope.devices = devices;
 //                })
 //        }).then(function (devices) {
 //            return $scope.devices = devices;
 //        });
 //
 //    $scope.openPort = function() {
 //        $loading.setStatus(true);
 //        return $bluetooth.subscribe('\n', $scope).then(function () {
 //            $loading.setStatus(false);
 //            return $scope.$on('$bluetooth-data', function (e, data) {
 //                $scope.bluetoothData = data;
 //            })
 //        });
 //    };
 //
 //    /*
 //        unsubscribes from any Bluetooth serial listener and changes the button:
 //    */
 //    $scope.closePort = function() {
 //        $loading.setStatus(true);
 //        return $bluetooth.unsubscribe($scope).then(function(){
 //            $loading.setStatus(false);
 //            return $scope.$on('$bluetooth-data-unsubscribe', function (e, data) {
 //                $scope.bluetoothData = data;
 //            })
 //        });
 //    };
 //
 //    $scope.send = function (text) {
 //        $bluetooth.write(text).then(function (success) {
 //            $scope.test = success;
 //        }, function (err) {
 //            $scope.test = err;
 //        });
 //    };
 //
 //
 //    $scope.manageConnection= function(address, $index) {
 //
 //        // connect() will get called only if isConnected() (below)
 //        // returns failure. In other words, if not connected, then connect:
 //        var connect = function () {
 //            // if not connected, do this:
 //            // clear the screen and display an attempt to connect
 //            $loading.setStatus(true);
 //            $bluetooth.connect(address)
 //                .then($scope.openPort, function (err) {
 //                    $loading.setStatus(false);
 //                })
 //                .then(function () {
 //                    $loading.setStatus(false);
 //                    $scope.devices[$index].active = !$scope.devices[$index].active;
 //                });
 //        };
 //
 //        // disconnect() will get called only if isConnected() (below)
 //        // returns success  In other words, if  connected, then disconnect:
 //        var disconnect = function () {
 //            $loading.setStatus(true);
 //            $bluetooth.disconnect()
 //                .then($scope.closePort, function (err) {
 //                    $loading.setStatus(false);
 //                })
 //                .then(function () {
 //                    $loading.setStatus(false);
 //                    $scope.devices[$index].active = !$scope.devices[$index].active;
 //                })
 //        };
 //        $bluetooth.isConnected().then(disconnect, connect);
 //    };

}
