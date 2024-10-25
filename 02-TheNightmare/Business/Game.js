/**
 * @author Alexandros Estrella de la Mañana <alejandro.gh98@outlook.com>
 * @link https://github.com/alexandro-morningstar GitHub
 * ________________________________________________
 *|                                                |
 *|         JS para la lógica del juego.           | 
 *| _______________________________________________| 
 */

/* --------------- Importación de módulos/librerías ---------------  */
import * as monsterDrawer from '../Game_Scripts/nightmare-monsters.js';
import * as narration from '../Game_Scripts/nightmare-narration.js';
import * as questions from '../Game_Scripts/nightmare-questions.js';

/* --------------- Declaracion de variables globales  ---------------  */
var narrationText;
let questionText;
let a_Option;
let choice;
let b_Option;

/* --------------- Llamada de funciones ---------------  */
function intro() {
    narrationText = document.getElementById("narration");
    narrationText.innerText = narration.intro();
    narrationText.addEventListener("click", function() {
        narrationText.innerText="";
    });
    // narrationText.addEventListener("click", () => {
    //     narrationText.innerText = "";
    // });
    // setTimeout(() => {
    //     narrationText.innerText=``;
    // }, 5000);
    // return false;
};

function init() {
    /* ------------ Asginación de eventos ------------  */
    // let testInnerMonster = document.getElementById("ascii-art");
    // testInnerMonster.style.zIndex=0;
    // testInnerMonster.innerText = monsterDrawer.draw_scaryFace();
    intro();
};

/* --------------- Evento DOM ---------------  */
document.addEventListener("DOMContentLoaded", () => { //Inmediatamente despues de la carga del DOM...

    /* ------------ Captura de elementos HTML justo después de la carga del DOM (independientemente de si se encuentran datos del jugador o no) ------------  */
    // narrationText = document.getElementById("narration");
    questionText = document.getElementById("question");
    a_Option = document.getElementById("a-option");
    choice = document.getElementById("choice");
    b_Option = document.getElementById("b-option");

    //...revisamos que se hayan enviado los datos del jugador.
    if (checkPlayerExist() == false) {
        window.alert("No se han enviado datos del jugador!!");
        window.location="menu.html";
    } else { //Si todo es correcto...
        init(); //...proseguimos.
    };
});