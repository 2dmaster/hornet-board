controlsService.$inject= ['$commands'];
export default function controlsService($commands) {
    return {
        trunk:{
            name:'trunk',
            title:'Trunk lights',
            device:$commands.TRUNK,
            command:$commands.ON,
            active:false
        },
        lights:{
            name:'lights',
            title:'Head lights',
            device:$commands.LIGHT_BOTH,
            command:$commands.LIGHTS_ON,
            active:false
        },
        audio:{
            name:'audio',
            title:'Audio system',
            device:$commands.AMP,
            command:$commands.ON,
            active:false
        },
        ambient:{
            name:'ambient',
            title:'Ambient light',
            device:$commands.ILLUMINATION,
            command:$commands.ON,
            active:false
        }
    }
}