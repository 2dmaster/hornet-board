mainCtrl.$inject = ['$scope', '$state', '$bluetooth', 'indicatorStatusService', '$sce'];
export default function mainCtrl($scope, $state, $bluetooth, $loading, $sce){
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
            icon:$sce.trustAsHtml(`
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
<g>
	<g>
		<path d="M384,140.804c-63.522,0-115.2,51.678-115.2,115.2s51.678,115.2,115.2,115.2c14.14,0,25.6-11.46,25.6-25.6v-179.2    C409.6,152.265,398.14,140.804,384,140.804z M384,345.604c-49.485,0-89.6-40.115-89.6-89.6s40.115-89.6,89.6-89.6V345.604z" style="fill: rgb(255, 255, 255);"></path>
	</g>
</g>
<g>
	<g>
		<path d="M128,140.804c-14.14,0-25.6,11.46-25.6,25.6v179.2c0,14.14,11.46,25.6,25.6,25.6c63.522,0,115.2-51.678,115.2-115.2    S191.522,140.804,128,140.804z M128,345.604v-179.2c49.485,0,89.6,40.115,89.6,89.6S177.485,345.604,128,345.604z" style="fill: rgb(255, 255, 255);"></path>
	</g>
</g>
<g>
	<g>
		<path d="M499.2,243.204H448c-7.074,0-12.8,5.726-12.8,12.8c0,7.074,5.726,12.8,12.8,12.8h51.2c7.074,0,12.8-5.726,12.8-12.8    C512,248.93,506.274,243.204,499.2,243.204z" style="fill: rgb(255, 255, 255);"></path>
	</g>
</g>
<g>
	<g>
		<path d="M495.454,93.359c-5.001-5.001-13.099-5.001-18.099,0l-38.4,38.4c-5.001,5-5.001,13.099,0,18.099    c2.492,2.5,5.768,3.746,9.045,3.746s6.554-1.246,9.054-3.746l38.4-38.4C500.454,106.458,500.454,98.359,495.454,93.359z" style="fill: rgb(255, 255, 255);"></path>
	</g>
</g>
<g>
	<g>
		<path d="M495.445,400.55l-38.391-38.4c-2.5-2.5-5.777-3.746-9.054-3.746s-6.554,1.246-9.054,3.746    c-5.001,5.001-5.001,13.099,0,18.099l38.4,38.4c5.001,5.001,13.099,5.001,18.099,0    C500.446,413.649,500.446,405.551,495.445,400.55z" style="fill: rgb(255, 255, 255);"></path>
	</g>
</g>
<g>
	<g>
		<path d="M64,243.204H12.8c-7.074,0-12.8,5.726-12.8,12.8c0,7.074,5.726,12.8,12.8,12.8H64c7.074,0,12.8-5.726,12.8-12.8    C76.8,248.93,71.074,243.204,64,243.204z" style="fill: rgb(255, 255, 255);"></path>
	</g>
</g>
<g>
	<g>
		<path d="M73.054,131.759l-38.4-38.409c-5.001-5.001-13.099-5.001-18.099,0c-5.001,5.001-5.001,13.099,0,18.099l38.4,38.4    c2.492,2.509,5.769,3.755,9.045,3.755s6.554-1.246,9.054-3.746C78.054,144.858,78.054,136.759,73.054,131.759z" style="fill: rgb(255, 255, 255);"></path>
	</g>
</g>
<g>
	<g>
		<path d="M73.045,362.15c-2.492-2.5-5.769-3.746-9.045-3.746s-6.554,1.246-9.054,3.746l-38.4,38.4    c-5.001,5.001-5.001,13.099,0,18.099c5.001,5.001,13.099,5.001,18.099,0l38.4-38.4C78.046,375.249,78.046,367.151,73.045,362.15z" style="fill: rgb(255, 255, 255);"></path>
	</g>
</g>
</svg>
            `),
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
                        name:'Both',
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
                        name:'Left',
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
                        name:'Right',
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
                    }
                ]
            }
        },
        {
            name:'AMP',
            active:false,
            icon:$sce.trustAsHtml(`
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 23.744 23.744" style="enable-background:new 0 0 23.744 23.744;" xml:space="preserve">
<g>
	<path style="fill: rgb(255, 255, 255);" d="M14.863,11.64c0,1.834-1.487,3.321-3.321,3.321s-3.321-1.487-3.321-3.321s1.487-3.321,3.321-3.321   S14.863,9.806,14.863,11.64z M23.743,19.926c0,1.831-1.485,3.315-3.316,3.315c-1.28,0-2.378-0.733-2.931-1.794   c-1.136,0.566-2.413,0.893-3.769,0.893H9.206c-1.104,0-2.154-0.217-3.12-0.601c-0.593,0.903-1.611,1.502-2.771,1.502   C1.483,23.241,0,21.757,0,19.926c0-1.126,0.564-2.117,1.424-2.717c-0.441-1.024-0.686-2.151-0.686-3.336V9.35   c0-1.034,0.195-2.023,0.535-2.937C0.503,5.806,0,4.876,0,3.819c0-1.832,1.483-3.316,3.315-3.316c0.981,0,1.853,0.435,2.46,1.109   c1.05-0.466,2.208-0.729,3.432-0.729h4.522c1.451,0,2.815,0.365,4.011,1.009c0.6-0.837,1.577-1.389,2.688-1.389   c1.831,0,3.316,1.484,3.316,3.317c0,1.334-0.796,2.479-1.933,3.003c0.251,0.798,0.385,1.646,0.385,2.527v4.523   c0,1.048-0.201,2.048-0.55,2.975C22.874,17.336,23.744,18.526,23.743,19.926z M19.284,3.409c0,0.763,0.619,1.384,1.383,1.384   s1.384-0.621,1.384-1.384c0-0.764-0.62-1.383-1.384-1.383C19.903,2.026,19.284,2.646,19.284,3.409z M1.525,3.409   c0,0.763,0.618,1.384,1.383,1.384c0.764,0,1.383-0.621,1.383-1.384c0-0.764-0.619-1.383-1.383-1.383   C2.144,2.026,1.525,2.646,1.525,3.409z M4.528,20.286c0-0.764-0.62-1.384-1.384-1.384s-1.382,0.62-1.382,1.384   c0,0.765,0.618,1.383,1.382,1.383C3.907,21.669,4.527,21.051,4.528,20.286z M19.276,11.611c0-4.313-3.497-7.808-7.809-7.808   S3.66,7.299,3.66,11.611s3.495,7.808,7.807,7.808S19.275,15.923,19.276,11.611z M22.051,20.286c0-0.764-0.62-1.384-1.384-1.384   s-1.383,0.62-1.383,1.384c0,0.765,0.619,1.383,1.383,1.383S22.051,21.051,22.051,20.286z"></path>
</g>
</svg>
            `),
            action:function (control) {
                if (control.active){
                    $scope.send($scope.AMP+';'+$scope.OFF+';');
                } else {
                    $scope.send($scope.AMP+';'+$scope.ON+';');
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
