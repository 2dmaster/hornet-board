commandsService.$inject= [];
export default function commandsService() {
    return {
        ON: 1,
        OFF: 20,
        LIGHTS_ON: 255,
        LIGHTS_OFF: 0,
        STROBE: 999,
        // end common constants

        // device config
        AMP: 4,
        ILLUMINATION: 8,
        TRUNK: 5,
        LIGHT_L: 6,
        LIGHT_R: 9,
        LIGHT_BOTH: 11,
        DELIMITER: ';',
    }
}