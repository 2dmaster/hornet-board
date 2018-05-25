commandsService.$inject= [];
export default function commandsService() {
    return {
        ON: 1,
        OFF: 20,
        // end common constants

        // device config
        BUZZER: 4,
        DOOR_LOCK: 5,
        DELIMITER: ';',
    }
}