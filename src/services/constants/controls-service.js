controlsService.$inject= ['$commands'];
export default function controlsService($commands) {
    return {
        doorLock:{
            name:'doorLock',
            title:'Дверь',
            device:$commands.DOOR_LOCK,
            command:$commands.ON,
            active:false
        },
        buzzer:{
            name:'buzzer',
            title:'Сирена',
            device:$commands.BUZZER,
            command:$commands.ON,
            active:false
        }
    }
}