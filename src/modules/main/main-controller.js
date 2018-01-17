mainCtrl.$inject = ['$scope', '$state', '$bluetooth', 'indicatorStatusService', '$icons'];
export default function mainCtrl($scope, $state, $bluetooth, $loading, $icons){
    $scope.currentExtras = null;
    $scope.mainMenuVisible = false;
    $scope.selectExtras = function (extras) {
        if (!$scope.currentExtras && extras && $scope.currentExtras != extras){
            $scope.currentExtras = extras;
            $scope.currentExtras.visible = true;
        } else if ($scope.currentExtras){
            $scope.currentExtras.visible = !$scope.currentExtras.visible;
        }
    };
    $scope.toggleMainMenu = function () {
        $scope.mainMenuVisible = !$scope.mainMenuVisible
    };
    $scope.controls = [
        {
            name:'Lights',
            active:false,
            icon:$icons.LIGHTS,
            action:function (control) {
                if (control.active){
                    $scope.send($scope.LIGHT_BOTH+';'+0+';');
                } else {
                    $scope.send($scope.LIGHT_BOTH+';'+255+';');
                }
                control.active = !control.active;
            },
            extras:{
                visible:false,
                controls:[
                    {
                        name:'both',
                        config:{
                            value: 0,
                            options: {
                                floor: 0,
                                ceil: 255,
                                step: 1,
                                id: 'both',
                                onChange: function(id, newVal) {
                                    $scope.send($scope.LIGHT_BOTH+';'+newVal+';');
                                },
                            }
                        }
                    },
                    {
                        name:'left',
                        config:{
                            value: 0,
                            options: {
                                floor: 0,
                                ceil: 255,
                                step: 1,
                                id: 'light-l',
                                onChange: function(id, newVal) {
                                    $scope.send($scope.LIGHT_L+';'+newVal+';');
                                },
                            }
                        }
                    },
                    {
                        name:'right',
                        config:{
                            value: 0,
                            options: {
                                floor: 0,
                                ceil: 255,
                                step: 1,
                                id: 'light-l',
                                onChange: function(id, newVal) {
                                    $scope.send($scope.LIGHT_R+';'+newVal+';');
                                },
                            }
                        }
                    },
                    {
                        name:'strobe',
                        command:''
                    }
                ]
            }
        },
        {
            name:'AMP',
            active:false,
            icon:$icons.AMP,
            action:function (control) {
                if (control.active){
                    $scope.send($scope.AMP+';'+$scope.OFF+';');
                } else {
                    $scope.send($scope.AMP+';'+$scope.ON+';');
                }
                control.active = !control.active;
            },
        },
        {
            name:'ILU',
            active:false,
            icon:$icons.ILU,
            action:function (control) {
                if (control.active){
                    $scope.send($scope.ILLUMINATION+';'+$scope.OFF+';');
                } else {
                    $scope.send($scope.ILLUMINATION+';'+$scope.ON+';');
                }
                control.active = !control.active;
            },
        }
    ];

    $scope.ON = 1;
    $scope.OFF = 20;
    // end common constants

    // device config
    $scope.AMP = 4;
    $scope.ILLUMINATION = 5;
    $scope.LIGHT_L = 6;
    $scope.LIGHT_R = 9;
    $scope.LIGHT_BOTH = 11;


       // $bluetooth.isEnabled()
       //     .then($bluetooth.getBoundedDevices, function (err) {
       //         $bluetooth.enable()
       //             .then($bluetooth.getBoundedDevices)
       //             .then(function (devices) {
       //                 return $scope.devices = devices;
       //             })
       //     }).then(function (devices) {
       //         return $scope.devices = devices;
       //     });

       $scope.openPort = function() {
           $loading.setStatus(true);
           return $bluetooth.subscribe('\n', $scope).then(function () {
               $loading.setStatus(false);
               return $scope.$on('$bluetooth-data', function (e, data) {
                   $scope.bluetoothData = data;
               })
           });
       };

       /*
           unsubscribes from any Bluetooth serial listener and changes the button:
       */
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


       $scope.manageConnection= function(address, $index) {

           // connect() will get called only if isConnected() (below)
           // returns failure. In other words, if not connected, then connect:
           var connect = function () {
               // if not connected, do this:
               // clear the screen and display an attempt to connect
               $loading.setStatus(true);
               $bluetooth.connect(address)
                   .then($scope.openPort, function (err) {
                       $loading.setStatus(false);
                   })
                   .then(function () {
                       $loading.setStatus(false);
                       $scope.devices[$index].active = !$scope.devices[$index].active;
                   });
           };

           // disconnect() will get called only if isConnected() (below)
           // returns success  In other words, if  connected, then disconnect:
           var disconnect = function () {
               $loading.setStatus(true);
               $bluetooth.disconnect()
                   .then($scope.closePort, function (err) {
                       $loading.setStatus(false);
                   })
                   .then(function () {
                       $loading.setStatus(false);
                       $scope.devices[$index].active = !$scope.devices[$index].active;
                   })
           };
           $bluetooth.isConnected().then(disconnect, connect);
       };

}
