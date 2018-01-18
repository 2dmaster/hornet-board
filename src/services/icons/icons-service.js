iconsService.$inject = ['$sce'];
export default function iconsService($sce) {
    var icons = {};
    icons.AMP = $sce.trustAsHtml('');
    icons.ILU = $sce.trustAsHtml('');
    icons.LIGHTS = $sce.trustAsHtml('');
    return icons;
}