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
var morteCoin = false;
var satanaCoin = false;
var dagger = false;
var ranNumber1 = getRandomNumber();
var ranNumber2 = getRandomNumber();
var ranNumber3 = getRandomNumber();

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
var election;

/* --------------- Llamada de funciones ---------------  */
function setLastOption(lastOption) {
    lastOptionBox.innerHTML = `<span> Ultima elección del jugador - ${lastOption} </span>`;
};

function clearOptionsAndQuestion() {
    questionBox.innerHTML=``;
    optionBoxA.innerHTML=``;
    optionBoxB.innerHTML=``;
};


function setYesNoOptions() {
    optionBoxA.innerHTML=questions.yes();
    optionBoxB.innerHTML=questions.no();
}

function corridor() {
    console.log("Entramos a la fase del corredor");
    narrationBox.innerHTML=narration._a04();
    questionBox.innerHTML=questions._qa02();
    setYesNoOptions();

    choiceBox.addEventListener("drop", () => {
        if (election != undefined || election != null) {
            if (election == "yes") { //Para no trabajar con más variables y meter más referencias, "yes" será "izquierda"
                asciiImage.setAttribute("style", "z-index: 5;") // --------- AQUI NOS QUEDAMOS AGREGAR EL ASCII Y MOVER EL Z INDEX -----------------------------------
            } else { //"no" será derecha.
                
            };
        } else { return false }; //No sucede nada hasta que el jugador realiza un acción válida.
    });

};

function wakeUp() {
    setLastOption("Levantarse de la cama: sí."); //Registramos la ultima opción.
    clearOptionsAndQuestion();
    narrationBox.innerHTML=narration._a02();

    narrationBox.addEventListener("click", () => {
        narrationBox.innerHTML=narration._a03();
        questionBox.innerHTML=questions._qa01();
        setYesNoOptions();

        choiceBox.addEventListener("drop", () => {
            //Aqui va la lögica para la opción de tomar la moneda
            if (election != undefined || election != null) {
                if (election == "yes") { //Si la opción fue "si"...
                    setLastOption("Tomaste: Modena Morte");
                    morteCoin = true;
                    clearOptionsAndQuestion();
                    narrationBox.innerHTML=narration._morteCoinTrue();
                    narrationBox.addEventListener("click", corridor);
                    
                } else { //Si la opción fue "no"...
                    setLastOption("Ignoraste: Modena Morte");
                    clearOptionsAndQuestion();
                    narrationBox.innerHTML=narration._morteCoinFalse();
                    narrationBox.addEventListener("click", corridor);
                };
            } else { return false }; //No sucede nada hasta que el jugador realiza un acción válida.
        });
    });
};

function stayInBed() {
    //Aqui va la lógica para la opción de quedarse acostado.
    return false;
};

function theNightmare() { // Inicio del juego tal cual
    narrationBox.innerHTML = narration.intro();
    narrationBox.addEventListener("click", () => {

        // Insertamos el texto para narrar y preguntar (en caso de ser necesario), como la pregunta exije un sí o no, insertamos el yes-no general.
        narrationBox.innerHTML=narration._n01();
        questionBox.innerHTML=questions._q01();
        setYesNoOptions();
        
        //Activamos una única vez las cajas de las opciones con los listeners.
        optionBoxA.addEventListener("dragstart", () => {
            election = optionBoxA.querySelector("img").alt; //Los valores de la opción los almacenamos en el texto alternativo de las imagenes.
            console.log(election);
        });
    
        optionBoxB.addEventListener("dragstart", () => {
            election = optionBoxB.querySelector("img").alt;
            console.log(election);
        });
    
        choiceBox.addEventListener("dragover", event => {event.preventDefault();
        });
        
        choiceBox.addEventListener("drop", () => { // El evento de drop significa que ya se ha tomado una decisión y podemos continuar.
            //currentElection = election; //Para prevenir obtener un valor anterior al de la ejecución actual.
            if (election != undefined || election != null) { //Si se hizo un drop de un objeto válido de evalúa la elección del jugador.
                if (election == "yes") { //Si la opción fue "si"...
                    wakeUp();
                } else { //Si la opción fue "no"...
                    stayInBed();
                };
            } else { return false }; //No sucede nada hasta que el jugador realiza un acción válida.
        });
    });
};

function init() {
    //Captura de elementos HTML
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

    //console.log("Entramos al init");
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