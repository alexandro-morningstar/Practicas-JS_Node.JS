/**
 * @author Alexandros Estrella de la Mañana <alejandro.gh98@outlook.com>
 * @link https://github.com/alexandro-morningstar GitHub
 * ________________________________________________
 *|                                                |
 *|         JS para la lógica del juego.           | 
 *| _______________________________________________| 
 *| NOTA: PRIMERO SE HARÁ TODO EN UN SOLO DOCUMENTO, LUEGO VERÉ COMO SEPARAR COSAS COMO NARRACIÓN Y DIALOGOS.
 */

/* --------------- Importación de módulos/librerías ---------------  */
import * as monsterDrawer from '../Game_Scripts/nightmare-monsters.js';
import * as narration from '../Game_Scripts/nightmare-narration.js';
import * as questions from '../Game_Scripts/nightmare-questions.js';

function getRandomNumber() {
    let min = Math.ceil(1);
    let max = Math.floor(667);
    return Math.floor(Math.random() * (max - min) + min);
    }
/* --------------- Declaracion de variables globales ---------------  */
/* ------------ Del juego ------------  */
var deaths = 0;
var morteCoin = false;
var satanaCoin = false;
var dagger = false;
var ranNumber1 = getRandomNumber();
var ranNumber2 = getRandomNumber();
var ranNumber3 = getRandomNumber();
var election = "";

/* ------------ Del documento ------------  */
var asciiImage;
var lastOptionBox;
var narrationBox;
var questionBox;
var optionBoxA;
var choiceBox;
var optionBoxB;
var deadsCounter;
var exitButton;


/* --------------- Definición y llamada de funciones ---------------  */

// Remover todos los EventListener de drop
function clearChoiceBoxListeners() {
    choiceBox.removeEventListener("drop", wakeOrStay);
    choiceBox.removeEventListener("drop", takeOrNotCoin);
    choiceBox.removeEventListener("drop", leftOrRight);
    //choiceBox.removeEventListener("drop", );
};

/**
 * Únicamente elimina las imagenes dentro de las opciones y el texto de la pregunta actual, no altera los event listener de los elementos.
 * @date 2024-10-30
 */
function clearOptionsAndQuestion() {
    questionBox.innerHTML=``;
    optionBoxA.innerHTML=``;
    optionBoxB.innerHTML=``;
};

/**
 * Unicamente inserta las imagenes dentro de las opciones, no altera los event listener de los elementos.
 * @date 2024-10-30
 */
function setYesNoOptions() {
    optionBoxA.innerHTML=questions.yes();
    optionBoxB.innerHTML=questions.no();
}

//
let dragstartOptA = () => {
    election = optionBoxA.querySelector("img").alt; //Los valores de la opción los almacenamos en el texto alternativo de las imagenes.
};
let dragstartOptB = () => {
    election = optionBoxB.querySelector("img").alt;
};
let dragoverPrevent = (event) => {
    event.preventDefault();
};

let dragEventsActivator = () => { //Agrega los eventListeners de los eventos drag(start-over)
    optionBoxA.addEventListener("dragstart", dragstartOptA);
    optionBoxB.addEventListener("dragstart", dragstartOptB);
    choiceBox.addEventListener("dragover", dragoverPrevent);
    setYesNoOptions(); //Siempre va de la mano el activar los eventos de Drag&Over y las imagenes de las opciones, entonces llamamos desde aqui.
}

let dragEventsDeactivator = () => { //Remove los eventListeners de los eventos drag(start-over)
    optionBoxA.removeEventListener("dragstart", dragstartOptA);
    optionBoxB.removeEventListener("dragstart", dragstartOptB);
    choiceBox.removeEventListener("dragover", dragoverPrevent);
    clearOptionsAndQuestion(); //Siempre va de la mano el desactivar los eventos de Drag&Over y las imagenes de las opciones, entonces llamamos desde aqui.
};


function setLastOption(lastOption) {
    lastOptionBox.innerHTML = `<span> Ultima elección del jugador - ${lastOption} </span>`;
};





//-------------------------- INICIO: Bloque de muertes --------------------------
function death01() {
    asciiImage.removeEventListener("click", death01); //Remover el evento click que nos trajo aquí.

    asciiImage.innerText=``; // Limpiar el arte ASCII.
    asciiImage.setAttribute("style", "z-index: 0;"); //Devolver el z-index al fondo.
    
    narrationBox.innerHTML = narration._death01(); //Insertar narración "final"

    deaths += 1; // Una vez entrado aquí ya se contabiliza la muerte.

    narrationBox.addEventListener("click", fromTheDeath);
};
//-------------------------- FINAL: Bloque de muertes --------------------------

//-------------------------- INICIO: Bloque de Pasillo - Izquierda o Derecha --------------------------
function leftOrRight() {
    if(election != undefined || election != null || election != "") {
        dragEventsDeactivator(); //Si ya viene un valor válido en election entonces se pueden desactivar las casillas de opciones, de elección y remover las imagenes de las tarjetas.
        if (election == "yes") { //Para no trabajar con más variables y meter más referencias, "yes" será "izquierda"
            setLastOption("Dirección: Izquierda");
            asciiImage.innerText = monsterDrawer.draw_skullURD(); // Se dibuja el arte ascii
            asciiImage.setAttribute("style", "z-index: 5;"); // Se cambia el z-index hasta el frente.
            asciiImage.addEventListener("click", death01); // REMOVER EN LA SIGUIENTE FUNCION
        } else { // "No", será derecha.
            return false;
        };
    } else { return false }; //No sucede nada hasta que el jugador realiza un acción válida.
};

let addDropEventLeftOrRight = () => {// Función intermedia de control.
    clearChoiceBoxListeners(); //Limpiamos todos los listeners posibles de drop antes de asignar el nuevo.
    choiceBox.addEventListener("drop", leftOrRight);// Asigna el listener de drop para este caso.
};

function corridor() {
    narrationBox.removeEventListener("click", corridor); //Remover el evento click que nos trajo aquí.

    narrationBox.innerHTML=narration._a04();
    questionBox.innerHTML=questions._qa02();

    dragEventsActivator();

    addDropEventLeftOrRight();
};
//-------------------------- FINAL: Bloque de Pasillo - Izquierda o Derecha --------------------------

//-------------------------- Referencia visual: Bloque de lógica --------------------------
function takeOrNotCoin() {
    if (election != undefined || election != null || election != "") {
        dragEventsDeactivator(); //Si ya viene un valor válido en election entonces se pueden desactivar las casillas de opciones, de elección y remover las imagenes de las tarjetas.
        if (election == "yes") {
            setLastOption("Tomaste: Modena Morte");
            morteCoin = true;
            narrationBox.innerHTML=narration._morteCoinTrue();
            narrationBox.addEventListener("click", corridor); //REMOVER EN LA SIGUIENTE FUNCION
        } else {
            setLastOption("Ignoraste: Modena Morte");
            narrationBox.innerHTML=narration._morteCoinFalse();
            narrationBox.addEventListener("click", corridor); //REMOVER EN LA SIGUIENTE FUNCION
        };
    } else {return false}; //No sucede nada hasta que el jugador realiza un acción válida.
};

let addDropEventMorteCoin = () => { 
    clearChoiceBoxListeners(); //Limpiamos todos los listeners posibles de drop antes de asignar el nuevo.
    choiceBox.addEventListener("drop", takeOrNotCoin);
};

function wakeUp() {
    setLastOption("Levantarse de la cama: sí."); //Registramos la ultima opción.
    narrationBox.innerHTML=narration._a02();

    narrationBox.addEventListener("click", () => {
        narrationBox.innerHTML=narration._a03();
        questionBox.innerHTML=questions._qa01();

        setYesNoOptions();
        dragEventsActivator();

        addDropEventMorteCoin();
    });
};

//-------------------------- Referencia visual: Bloque de lógica --------------------------
function stayInBed() {
    //Aqui va la lógica para la opción de quedarse acostado.
    return false;
};

//-------------------------- INICIO: Bloque INICIO DEL JUEGO: Levantase o quedarse acostado --------------------------
function wakeOrStay() { // El evento de drop significa que ya se ha tomado una decisión y podemos continuar.
    if (election != undefined || election != null || election != "") {
        dragEventsDeactivator(); //Si ya viene un valor válido en election entonces ya podemos desactivar las casillas de opciones y elección (puede interferir desactivar el over antes de tiempo?)
        clearOptionsAndQuestion();
        if (election == "yes") {
            wakeUp(); //Continua el juego
        }
        else {
            stayInBed();
        };
    } else {return false}; //No sucede nada hasta que el jugador realiza un acción válida.
};

let addDropEventWakeOrStay = () => { // Función intermedia de control.
    clearChoiceBoxListeners(); //Limpia todos los listeners posibles de drop antes de asignar el nuevo.
    choiceBox.addEventListener("drop", wakeOrStay); // Asigna el listener de drop para este caso.
};

/**
 * Inicio de juego
 * @date 2024-10-30
 */
function theNightmare() {
    narrationBox.removeEventListener("click", theNightmare); //Si vengo de "otra vida", desactivo el listener de click que me trajo aquí.

    dragEventsDeactivator() //Desactivo todo (imagenes y eventos Drag&Drop)

    narrationBox.innerHTML = narration.intro();
    narrationBox.addEventListener("click", () => {
        narrationBox.innerHTML=narration._n01(); // Insertamos el texto para narrar y preguntar (en caso de ser necesario), como la pregunta exije un sí o no, insertamos el yes-no general.
        questionBox.innerHTML=questions._q01();
        
        dragEventsActivator() //Activamos las cajas de opciones con listeners Drag&Over y colocamos las imagenes en las tarjetas.

        addDropEventWakeOrStay(); //Llamamos a la función que asigna el evento Drop.
    });
};
//-------------------------- FINAL: Bloque INICIO DEL JUEGO: Levantase o quedarse acostado --------------------------

//-------------------------- INICIO: Bloque de renacimiento --------------------------
function fromTheDeath(){ // Función intermedia de control, cuando morimos llegamos aquí para limpiar todo antes de iniciar la siguiente vida
    narrationBox.removeEventListener("click", fromTheDeath); // Limpiamos el ultimo EventListener

    dragEventsDeactivator(); //Para que no aparezcan de nuevo las opciones en las tarjetas de opciones.

    /* Volvemos a inicializar las variables del juego. ¿Volver a inicializar los elementos html recapturandolos? */
    morteCoin = false;
    satanaCoin = false;
    dagger = false;
    ranNumber1 = getRandomNumber();
    ranNumber2 = getRandomNumber();
    ranNumber3 = getRandomNumber();

    election = ""; // Resetear la elección.

    narrationBox.innerText = `× ¿De nuevo? ×
    - Click aquí para continuar -`;

    deadsCounter.innerText=`Muertes: ${deaths}`; //Actualizar contador de muertes.
    narrationBox.addEventListener("click", theNightmare);
};
//-------------------------- FINAL: Bloque de renacimiento --------------------------

//-------------------------- INICIO: Bloque DOM: DOM Listener y carga de elementos HTML --------------------------
/**
 * Captura todos los elementos HTML necesarios para interactuar con el juego.
 * Activa el botón para salir del juego.
 * Asigna el valor actual del numero de muertes con la variable global.
 * Llama a la función que inicia el juego (theNightmare)
 * @date 2024-10-30
 */
function init() {
    // --------- Captura de elementos HTML ---------
    asciiImage = document.getElementById("ascii-art");
    lastOptionBox = document.getElementById("lastOption");
    narrationBox = document.getElementById("narration");
    questionBox = document.getElementById("question");
    optionBoxA = document.getElementById("a-option");
    choiceBox = document.getElementById("choice");
    optionBoxB = document.getElementById("b-option");
    deadsCounter = document.getElementById("deads");
    exitButton = document.getElementById("exit");

    exitButton.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log("se oprimió el botón de submit");
    });

    deadsCounter.innerText=`Muertes: ${deaths}`;

    theNightmare();
};

/* --------------- Evento DOM ---------------  */
document.addEventListener("DOMContentLoaded", () => { //Inmediatamente despues de la carga del DOM...
    //...revisamos que se hayan enviado los datos del jugador.
    if (checkPlayerExist() == false) {
        window.alert("No se han enviado datos del jugador!!");
        window.location="menu.html";
    } else { //Si todo es correcto...
        init(); //...proseguimos.
    };
});
//-------------------------- FINAL: Bloque DOM: DOM Listener y carga de elementos HTML --------------------------

// TERMINAR DE DELIMITAR LOS BLOQUES CON COMENTARIOS Y AGREGAR DOCUMENTACION A TODAS LAS FUNCIONES.!!