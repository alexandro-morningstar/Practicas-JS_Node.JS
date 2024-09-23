/**  _______________
 * |                |
 * |  purcharse.js  |
 * | _______________|
 */

// --------------- Declaración de variables globales ---------------
let backToShop;


// --------------- Funciones de eventos ---------------

let setMobo = () => { //Se usará ArrowFunction porque es bastante concreta y pequeña la lógica para setear info a estas alturas (y porque sí)
    let moboSlot = document.getElementById("MoBo");
    let moboImg = moboSlot.querySelector("img");
    let moboDescription = moboSlot.querySelector("p");
    moboImg.src = sessionStorage.getItem("moboSrc");
    moboDescription.innerText = sessionStorage.getItem("moboDescription");
};
let setCpu = () => {
    let cpuSlot = document.getElementById("CPU");
    let cpuImg = cpuSlot.querySelector("img");
    let cpuDescription = cpuSlot.querySelector("p");
    cpuImg.src = sessionStorage.getItem("cpuSrc");
    cpuDescription.innerText = sessionStorage.getItem("cpuDescription");
};

let setRam = () => {
    let ramSlot = document.getElementById("RAM");
    let ramImg = ramSlot.querySelector("img");
    let ramDescription = ramSlot.querySelector("p");
    ramImg.src = sessionStorage.getItem("ramSrc");
    ramDescription.innerText = sessionStorage.getItem("ramDescription");
};

let setGpu = () => {
    let gpuSlot = document.getElementById("GPU");
    let gpuImg = gpuSlot.querySelector("img");
    let gpuDescription = gpuSlot.querySelector("p");
    gpuImg.src = sessionStorage.getItem("gpuSrc");
    gpuDescription.innerText = sessionStorage.getItem("gpuDescription");
};

let setHdd = () => {
    let hddSlot = document.getElementById("HDD");
    let hddImg = hddSlot.querySelector("img");
    let hddDescription = hddSlot.querySelector("p");
    hddImg.src = sessionStorage.getItem("hddSrc");
    hddDescription.innerText = sessionStorage.getItem("hddDescription");
};

let setPsu = () => {
    let psuSlot = document.getElementById("PSU");
    let psuImg = psuSlot.querySelector("img");
    let psuDescription = psuSlot.querySelector("p");
    psuImg.src = sessionStorage.getItem("psuSrc");
    psuDescription.innerText = sessionStorage.getItem("psuDescription");
};

let setFinalCost = () => {
    let costSlot = document.getElementById("totalCost");
    costSlot.innerText = `Total: \$${sessionStorage.getItem("total")}`;
    // let cost = costSlot.querySelector("h2");
    // cost.innerText=sessionStorage.getItem("total");
};

function initializePage() {
    // Inicialización de variables y captura de objetos HTML
    backToShop = document.getElementById("back");

    //Seteamos información de los componetnes traidos desde Index.html por el SessionStorage
    setMobo();
    setCpu();
    setRam();
    setGpu();
    setHdd();
    setPsu();
    setFinalCost();

    //--------------- Inicio de carga de eventos ---------------

    //Cuando se realiza un click sobre el botón "regresar" borra el SessionStorage y redirecciona a Index.html
    // NOTA PARA EL INSTRUCTOR: Sí era posible (y ya sé como realizarlo) volver a cargar todos los objetos dentro de cada slot del carrito de compras al regresar, pero ya era mucho tiempo ): perdón
    backToShop.addEventListener("click", eraseSessionStorage = (e) => {sessionStorage.clear(); location="index.html";});
}

// --------------- Comprobamos la recepción de todos los componentes. ---------------
if (checkAllComponentsExist() == false) {
    alert("No se ha llenado el carrito de compras"); //Mandamos una alerta en la misma pagina
    location="index.html"; //Redirigimos al inicio (ya se habrá generado el mensaje de error en currencyExist())
} else {
    document.addEventListener("DOMContentLoaded", initializePage);
};