/**  ___________________
 * |                    |
 * |  purcharseData.js  |
 * | ___________________|
 * Aqui se guardan y obtienen datos de Session y Local Storage.
 * Así como funciones de control o comprobación que retornan valores a otros scripts.
 * ¿Similar a la Capa de Datos limitado al Local y Session Storage?
 */

// --------------- Inicizalización de variables ---------------
let moboExist; let cpuExist; let ramExist;
let gpuExist; let hddExist; let psuExist;

// --------------- Session Storage ---------------

//Funciones para guardar el source de la imagen y nombre de los componentes del carrito.
function saveMoBoInStorage(moboImg,moboDescription) {
    sessionStorage.setItem("moboSrc", moboImg);
    sessionStorage.setItem("moboDescription", moboDescription);
};

function saveCpuInStorage(cpuImg,cpuDescription) {
    sessionStorage.setItem("cpuSrc", cpuImg);
    sessionStorage.setItem("cpuDescription", cpuDescription);
};

function saveRamInStorage(ramImg,ramDescription) {
    sessionStorage.setItem("ramSrc", ramImg);
    sessionStorage.setItem("ramDescription", ramDescription);
};

function saveGpuInStorage(gpuImg,gpuDescription) {
    sessionStorage.setItem("gpuSrc", gpuImg);
    sessionStorage.setItem("gpuDescription", gpuDescription);
};

function saveHddInStorage(hddImg,hddDescription) {
    sessionStorage.setItem("hddSrc", hddImg);
    sessionStorage.setItem("hddDescription", hddDescription);
};

function savePsuInStorage(psuImg,psuDescription) {
    sessionStorage.setItem("psuSrc", psuImg);
    sessionStorage.setItem("psuDescription", psuDescription);
};

//Función para guardar el costo final del carrito.
let saveTotalCostInStorage = (totalCost) => { //Arrow porque sí.
    sessionStorage.setItem("total", totalCost);
};

//Función para revisar que exista la imagen de todos los componentes, si no, regresar a la pagina anterior.
function checkAllComponentsExist() {
    moboExist = sessionStorage.getItem("moboDescription");
    console.log(moboExist);
    cpuExist = sessionStorage.getItem("cpuDescription");
    console.log(cpuExist);
    ramExist = sessionStorage.getItem("ramDescription");
    console.log(ramExist);
    gpuExist = sessionStorage.getItem("gpuDescription");
    console.log(gpuExist);
    hddExist = sessionStorage.getItem("hddDescription");
    console.log(hddExist);
    psuExist = sessionStorage.getItem("psuDescription");
    console.log(psuExist);
    if (moboExist!="MoBo" && cpuExist!="CPU" && ramExist!="RAM" && gpuExist!="GPU" && hddExist!="HDD" && psuExist!="PSU") {
        return true;
    } else {
        sessionStorage.setItem("missing-data", "Tienes que llenar todos los slots del carrito de compras (:");
        location="Index";
        return false;
    }
}