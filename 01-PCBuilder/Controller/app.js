// --------- DOM variable & objects initialization ---------
var components;
var imgSelector;
var nameSelector;
var classComponent;
var imgComponent;
var nameComponent;
var imgSlot;
var nameSlot;
var classSlot;
var trashCan;
var costSelector;
var itemCost; //Valor temporal del componente elegido
var totalCost = 0; //Aqui se va sumando el valor del costo total de los componentes
var showCost; //Aqui se guardará el elemento HTML
var checkIn;

// --------- Event Functions ---------
function collectMoBoInCart() {
    let MoBo = document.getElementById("MoBo");
    let MoBoImg = MoBo.querySelector("img");
    let MoBoImgSrc = MoBoImg.src; //source de la imagen - guardar
    let MoBoDescription = MoBo.querySelector("p");
    let MoBoDescriptionText = MoBoDescription.innerText; //guardar
    saveMoBoInStorage(MoBoImgSrc,MoBoDescriptionText); //Función definida en purcharseData.js
};

function collectCpuInCart() {
    let cpu = document.getElementById("CPU");
    let cpuImg = cpu.querySelector("img");
    let cpuImgSrc = cpuImg.src; //source de la imagen - guardar
    let cpuDescription = cpu.querySelector("p");
    let cpuDescriptionText = cpuDescription.innerText; //guardar
    saveCpuInStorage(cpuImgSrc,cpuDescriptionText); //Función definida en purcharseData.js
};

function collectRamInCart() {
    let ram = document.getElementById("RAM");
    let ramImg = ram.querySelector("img");
    let ramImgSrc = ramImg.src; //source de la imagen - guardar
    let ramDescription = ram.querySelector("p");
    let ramDescriptionText = ramDescription.innerText; //guardar
    saveRamInStorage(ramImgSrc,ramDescriptionText); //Función definida en purcharseData.js
};

function collectGpuInCart() {
    let gpu = document.getElementById("GPU");
    let gpuImg = gpu.querySelector("img");
    let gpuImgSrc = gpuImg.src; //source de la imagen - guardar
    let gpuDescription = gpu.querySelector("p");
    let gpuDescriptionText = gpuDescription.innerText; //guardar
    saveGpuInStorage(gpuImgSrc,gpuDescriptionText); //Función definida en purcharseData.js
}

function collectHddInCart() {
    let hdd = document.getElementById("HDD");
    let hddImg = hdd.querySelector("img");
    let hddImgSrc = hddImg.src; //source de la imagen - guardar
    let hddDescription = hdd.querySelector("p");
    let hddDescriptionText = hddDescription.innerText; //guardar
    saveHddInStorage(hddImgSrc,hddDescriptionText); //Función definida en purcharseData.js
}

function collectPsuInCart() {
    let psu = document.getElementById("PSU");
    let psuImg = psu.querySelector("img");
    let psuImgSrc = psuImg.src; //source de la imagen - guardar
    let psuDescription = psu.querySelector("p");
    let psuDescriptionText = psuDescription.innerText; //guardar
    savePsuInStorage(psuImgSrc,psuDescriptionText); //Función definida en purcharseData.js
}

function collectAllCartData(e) {
    collectMoBoInCart() //Motherboard
    collectCpuInCart() //CPU
    collectRamInCart() //RAM
    collectGpuInCart() //GPU
    collectHddInCart() //HDD
    collectPsuInCart() //PSU
    saveTotalCostInStorage(totalCost) //Total Cost
    if (checkAllComponentsExist == false) {
        window.alert("No haz llenado todo el carrito de compras");
        e.preventDefault();
        return false;
    }
}

function costSubtraction() {
    totalCost -= itemCost;
    showCost.innerText=totalCost;
}

function sumTotal(e) {
    totalCost += itemCost;
    showCost.innerText=totalCost;
}

/**
 * Obtiene la información de un componente seleccionado (detonado por un evento dragstart)
 * Siempre traeremos un div que puede contener <img>, <p> y/o <input>
 */
function getComponentInfo(e) {
    imgSelector = this.querySelector("img"); //Guardamos la etiqueta <img> (de la sección componentes)
    nameSelector = this.querySelector("p"); //Guardamos la etiqueta <p> (de la sección componentes)
    costSelector = this.querySelector("input");
    if (imgSelector && nameSelector && costSelector) { // Verificamos que sí exista información dentro de nuestras variables (que si exista etiqueta guardada).
        classComponent = imgSelector.className; //Guardamos el valor (nombre) del atributo class=""
        imgComponent = imgSelector.src; //Guardamos le valor del atributo src=""
        nameComponent = nameSelector.innerText; //Guardamos el valor (texto) contenido en la etiqueta <p>
        console.log(nameComponent);
        itemCost = parseInt(costSelector.value); //Guardamos el valor (en Int) contenido en el atributo value="" de la etiqueta <input>
    }
}

/**
 * Asigna los valores correspondientes de un componente seleccionado (con info obtenida después de un evento dragstart)
 * a su espacio en la sección de carrito, comparando con los classname que sea del tipo correcto de componente para evitar repeticiones
 */
function setComponentInfo(e) {
    imgSlot = this.querySelector("img"); //Guardamos la etiqueta <img> (de la sección carrito)
    nameSlot = this.querySelector("p"); //Guardamos la etiqueta <p> (de la sección carrito)
    let srcImgSlot = imgSlot.src; //Variable que almacena en tiempo real el source de la imagen del slot (carrito) (antes de setear el nuevo valor)
    if (imgSlot && nameSlot && (srcImgSlot.endsWith("html"))) { //Comprobamos que si existan y si no hay ya alguna imagen (si no termina en html, significa que ya hay un producto)
        classSlot = imgSlot.className; //Guardamos el nombre de la clase del slot para saber si es el slot del componente a guardar
        if (classComponent == classSlot) { //Si el classname del componente es el mismo que el del slot, entonces se guarda (setea/asigna) la nueva información
            imgSlot.src=imgComponent; //El valor del atributo src de la etiqueta <img> en el slot, se sustituye por la traida por el componente            nameSlot.innerText=nameComponent; //El valor (texto) de la etiqueta <p> en el slot, se sustituye por la traida por el componente.
            nameSlot.innerText=nameComponent;
            sumTotal(); // ########### NOTA: Solamente si ya se seteo la nueva info, se hace la suma del costo total ###########
        } else { //Si no coinciden los classname, no deja guardar
            window.alert("Solamente puedes poner componentes en su respectiva caja.");
            return false;
        }
    } else {
        window.alert("Ya hay un componente en este slot!")
    }
}

/**
 * dropComponent, más que eliminar, reasigna los slots a sus valores por defecto
 * asignando el nombre de la clase al valor de la etiqueta <p> que coincide es el mismo texto del componente
 * y "borrando" el nombre del src="" de la imagen del slot, para que de nuevo esté vacía.
 */
function dropComponent(e) {
    /* Recuperamos el elemento e info actual del elemento HTML que deseamos eliminar
    El nombre del ID (ID de los slots del carrito) es lo que en ese momento contiene la variable classComponent (se ejecuta durante el dragstart del item en el cart) */
    let toDrop = document.getElementById(classComponent);
    
    //Obtenemos los elementos a los que setearemos sus valores (manualmente) que tenían por defecto
    let resetImgElement = toDrop.querySelector("img"); //Seleccionamos la etiqueta <img> del elemento contenido en toDrop
    let resetPElement = toDrop.querySelector("p"); //Seleccionamos la etiqueta <p> del elemento contenido en toDrop
    let getClassNameElement = resetImgElement.className; //El nombre de la clase coincide con el texto que debería tener por defecto

    //Seteamos ("Reseteamos") los valores.
    resetImgElement.src=""; //El source de la imagen lo dejamos vacío, para que ya no tenga imagen.
    resetPElement.innerText=getClassNameElement; //El texto de <p> se setea con el classname, que da la casualidad que es el mismo que debería tener por defecto
    costSubtraction(); //Restamos el valor del producto que dropeamos del costo total
}

// --------- DOM objects loading ---------
/**
 * Eventos de Drag&Drop
 * @date 2024-08-01
 * @param { EventObject } e
 */
function init(e) {
    // ------ HTML elements capture ------
    components = document.getElementsByClassName("component"); //Seleccionamos todos los elementos HTML con class='component'
    SelectedComponents = document.getElementsByClassName("componentInCart"); //Seleccionamos todos los elementos HTML con class="componentInCart"
    trashCan = document.getElementById("trash"); //Elemento HTML que servirá como "bote de basura" al realizar un drop dentro de él.
    showCost = document.getElementById("totalCost");
    checkIn = document.getElementById("confirm");

    // ------ Check for error items in Session Storage ------
    if (sessionStorage.getItem("missing-data")!=null) {
        let error = document.getElementById("error");
        error.innerText=sessionStorage.getItem("missing-data");
        sessionStorage.removeItem("missing-data");
    }
    // ------ Drag and Drop Events ------

    //Agregar componentes al carrito
    for (let component of components) { //Recorremos todos los elementos HTML con class="component"
        component.addEventListener("dragstart", getComponentInfo); //Si ocurre un evento "dragstart", llamamos a la función que obtiene la información del objeto que empezamos a mover
    }

    for (let slot of SelectedComponents) { //Recorremos todos los elementos HTML con class="componentInCart"
        slot.addEventListener("dragover", e => { e.preventDefault(); }); //Agregamos listener de evento "dragover" y le asignamos la función de preventDefault() para que permita el drop
        slot.addEventListener("drop", setComponentInfo); //Al soltar (evento "drop") se llama la función setComponentInfo

        /*Sí iniciamos un evento "dragstart" desde un elemento HTML perteneciente a la zona de carrito
        llamamos de nuevo a getComponentInfo para actualizar la info de las variables con el componente actual
        esta información recupara de nuevo nos sirve como referencia para eliminar un componente*/
        slot.addEventListener("dragstart", getComponentInfo);
    }

    //Eliminar componentes del carrito
    trashCan.addEventListener("dragover", e => { e.preventDefault(); });
    trashCan.addEventListener("drop", dropComponent); //Cuando soltamos un componente del carrito al "bote de basura", llamamos a dropComponent

    //Juntar toda la info para guardarla en el Session Storage y cambiar de pagina
    checkIn.addEventListener("submit", collectAllCartData);
}

// --------------- DOM Listener ---------------

document.addEventListener("DOMContentLoaded", init);