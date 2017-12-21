bluetoothApiService.$inject = ['$q'];
export default function bluetoothApiService($q) {
    var service = {};

    service.connect = function (macAddress) {
        return $q(function (resolve, reject) {
            bluetoothSerial.connect(macAddress, resolve, reject);
        });
    };

    service.connectInsecure = function (macAddress) {
        return $q(function (resolve, reject) {
            bluetoothSerial.connectInsecure(macAddress, resolve, reject);
        });
    };

    service.disconnect = function () {
        return $q(function (resolve, reject) {
            bluetoothSerial.disconnect(resolve, reject)
        });
    };

    service.read = function () {
        return $q(function (resolve, reject) {
            bluetoothSerial.read(resolve, reject)
        });
    };

    service.readUntil = function (delimeter) {
        return $q(function (resolve, reject) {
            bluetoothSerial.readUntil(delimeter, resolve, reject)
        });
    };

    service.write = function (data) {
        return $q(function (resolve, reject) {
            bluetoothSerial.write(data, resolve, reject)
        });
    };

    service.available = function () {
        return $q(function (resolve, reject) {
            bluetoothSerial.available(data, resolve, reject)
        });
    };

    service.subscribe = function (delimeter, $scope) {
        var
            success = function (data) {
                $scope.$apply(function (scope) {
                    scope.$emit('$bluetooth-data', data);
                })
            },
            error = function (error) {
                $scope.$apply(function (scope) {
                    scope.$emit('$bluetooth-data', error);
                })
            };
        return $q(function (resolve) {
            resolve(bluetoothSerial.subscribe(delimeter, success, error))
        })
    };
    service.subscribeRawData = function ($scope) {
        var
            success = function (data) {
                $scope.$apply(function (scope) {
                    scope.$emit('$bluetooth-raw-data', data);
                })
            },
            error = function (error) {
                $scope.$apply(function (scope) {
                    scope.$emit('$bluetooth-raw-data', error);
                })
            };
        return $q(function (resolve) {
            resolve(bluetoothSerial.subscribeRawData(success, error))
        })
    };

    service.unsubscribe = function ($scope) {
        var
            success = function (data) {
                $scope.$apply(function (scope) {
                    scope.$emit('$bluetooth-data-unsubscribe', data);
                })
            },
            error = function (error) {
                $scope.$apply(function (scope) {
                    scope.$emit('$bluetooth-data-unsubscribe', error);
                })
            };
        return $q(function (resolve) {
            resolve(bluetoothSerial.unsubscribe(success, error))
        })
    };

    service.unsubscribeRawData = function ($scope) {
        var
            success = function (data) {
                $scope.$apply(function (scope) {
                    scope.$emit('$bluetooth-raw-data-unsubscribe', data);
                })
            },
            error = function (error) {
                $scope.$apply(function (scope) {
                    scope.$emit('$bluetooth-raw-data-unsubscribe', error);
                })
            };
        return $q(function (resolve) {
            resolve(bluetoothSerial.unsubscribeRawData(success, error))
        })
    };

    service.clearBuffer = function () {
        return $q(function (resolve, reject) {
            bluetoothSerial.clear(resolve, reject)
        });
    };

    service.getBoundedDevices = function () {
        return $q(function (resolve, reject) {
            bluetoothSerial.list(resolve, reject)
        });
    };

    service.isConnected = function () {
        return $q(function (resolve, reject) {
            bluetoothSerial.isConnected(resolve, reject)
        });
    };

    service.isEnabled = function () {
        return $q(function (resolve, reject) {
            bluetoothSerial.isEnabled(resolve, reject)
        });
    };

    service.getRSSI = function () {
        return $q(function (resolve, reject) {
            bluetoothSerial.readRSSI(resolve, reject)
        });
    };

    service.getDeviceBluetoothSettings = function () {
        return $q(function (resolve, reject) {
            bluetoothSerial.showBluetoothSettings(resolve, reject)
        });
    };

    service.enable = function () {
        return $q(function (resolve, reject) {
            bluetoothSerial.enable(resolve, reject)
        });
    };

    service.discoverUnpaired = function () {
        return $q(function (resolve, reject) {
            bluetoothSerial.discoverUnpaired(resolve, reject)
        });
    };
    service.setName = function (name) {
        bluetoothSerial.setName(name)
    };

    service.setDiscoverable = function (duration) {
        bluetoothSerial.setDiscoverable(duration)
    };

    service.setDeviceDiscoveredListener = function (callback) {
        bluetoothSerial.setDeviceDiscoveredListener(callback)
    };

    service.clearDeviceDiscoveredListener = function () {
        bluetoothSerial.setDeviceDiscoveredListener()
    };

    return service;
}