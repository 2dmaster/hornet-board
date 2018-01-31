utilsService.$inject= ['$commands'];
export default function utilsService($commands) {
    return {
        delimit: function (val) {
            return $commands.DELIMITER+val+$commands.DELIMITER;
        }
    }
}