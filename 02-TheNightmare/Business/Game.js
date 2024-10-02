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
const narrationText = document.getElementById("narration");
let questionText;
let a_Option;
let choice;
let b_Option;

/* --------------- Llamada de funciones ---------------  */
function intro() {
    narrationText.innerText = narration.intro();
    narrationText.addEventListener("click", () => {
        narrationText.innerText = "";
    }); // AQUI NOS QUEDAMOS!-------------------------------------------------------
    // setTimeout(() => {
    //     narrationText.innerText=``;
    // }, 5000);
    //return false;
};

function init() {
    /* ------------ Captura de elementos HTML ------------  */
    //narrationText = document.getElementById("narration");
    questionText = document.getElementById("question");
    a_Option = document.getElementById("a-option");
    choice = document.getElementById("choice");
    b_Option = document.getElementById("b-option");

    /* ------------ Asginación de eventos ------------  */
    // narrationText.addEventListener("click", )

    // let testInnerMonster = document.getElementById("ascii-art");
    // testInnerMonster.style.zIndex=0;
    // testInnerMonster.innerText = monsterDrawer.draw_fleshFace();
    intro();
};

/* --------------- Evento DOM ---------------  */
document.addEventListener("DOMContentLoaded", () => { //Inmediatamente despues de la carga del DOM...
    if (checkPlayerExist() == false) { //...revisamos que se hayan enviado los datos del jugador.
        window.alert("No se han enviado datos del jugador!!");
        window.location="menu.html";
    } else { //Si todo es correcto...
        init(); //...proseguimos.
    };
});