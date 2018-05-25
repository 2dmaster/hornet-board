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
        },
        // audio:{
        //     name:'audio',
        //     title:'Audio system',
        //     device:$commands.AMP,
        //     command:$commands.ON,
        //     active:false
        // },
        // ambient:{
        //     name:'ambient',
        //     title:'Ambient light',
        //     device:$commands.ILLUMINATION,
        //     command:$commands.ON,
        //     active:false
        // }
    }
}