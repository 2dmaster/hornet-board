mainCtrl.$inject = ['$scope', '$bluetooth', 'indicatorStatusService', '$icons'];
export default function mainCtrl($scope, $bluetooth, $loading, $icons){
    $scope.mainMenuVisible = false;
    $scope.toggleMainMenu = function () {
        $scope.mainMenuVisible = !$scope.mainMenuVisible
    };

    $scope.ON = 1;
    $scope.OFF = 20;
    $scope.LIGHTS_OFF = 0;
    $scope.LIGHTS_INTENSITY = 255;
    $scope.STROBE = 999;
    // end common constants

    // device config
    $scope.AMP = 4;
    $scope.ILLUMINATION = 8;
    $scope.TRUNK = 5;
    $scope.LIGHT_L = 6;
    $scope.LIGHT_R = 9;
    $scope.LIGHT_BOTH = 11;
    $scope.DELIMITER = ';';
    $scope.strobe = false;
    $scope.dimmer = function (val) {
        $scope.send($scope.LIGHT_BOTH+$scope.DELIMITER+val+$scope.DELIMITER);
    };
    $scope.controls = {
        trunk:{
            name:'trunk',
            title:'Trunk lights',
            device:$scope.TRUNK,
            command:$scope.ON,
            active:false,
            action:function (control) {
                if (control.active){
                    control.command = $scope.OFF;
                } else {
                    control.command = $scope.ON;
                }
                $scope.send(control.device+$scope.DELIMITER+control.command+$scope.DELIMITER);
                // console.log(control.device+$scope.DELIMITER+control.command+$scope.DELIMITER);
                control.active = !control.active;
            }
        },
        lights:{
            name:'lights',
            title:'Head lights',
            device:$scope.LIGHT_BOTH,
            command:$scope.LIGHTS_INTENSITY,
            active:false,
            action:function (control) {
                if (control.active){
                    control.command = $scope.LIGHTS_OFF;
                } else {
                    if ($scope.strobe){
                        control.command = 999;
                    } else {
                        control.command = $scope.LIGHTS_INTENSITY;
                    }
                }
                $scope.send(control.device+$scope.DELIMITER+control.command+$scope.DELIMITER);
                // console.log(control.device+$scope.DELIMITER+control.command+$scope.DELIMITER);
                control.active = !control.active;
            }
        },
        audio:{
            name:'audio',
            title:'Audio system',
            device:$scope.AMP,
            command:$scope.ON,
            active:false,
            action:function (control) {
                if (control.active){
                    control.command = $scope.OFF;
                } else {
                    control.command = $scope.ON;
                }
                $scope.send(control.device+$scope.DELIMITER+control.command+$scope.DELIMITER);
                // console.log(control.device+$scope.DELIMITER+control.command+$scope.DELIMITER);
                control.active = !control.active;
            }
        },
        ambient:{
            name:'ambient',
            title:'Ambient light',
            device:$scope.ILLUMINATION,
            command:$scope.ON,
            active:false,
            action:function (control) {
                if (control.active){
                    control.command = $scope.OFF;
                } else {
                    control.command = $scope.ON;
                }
                $scope.send(control.device+$scope.DELIMITER+control.command+$scope.DELIMITER);
                // console.log(control.device+$scope.DELIMITER+control.command+$scope.DELIMITER);
                control.active = !control.active;
            },
        }
    };
       $bluetooth.isEnabled()
           .then($bluetooth.getBoundedDevices, function (err) {
               $bluetooth.enable()
                   .then($bluetooth.getBoundedDevices)
                   .then(function (devices) {
                       return $scope.devices = devices;
                   })
           }).then(function (devices) {
               return $scope.devices = devices;
           });

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
