/**
 * @author Alexandros Estrella de la Mañana <alejandro.gh98@outlook.com>
 * @link https://github.com/alexandro-morningstar GitHub
 * ____________________________________________________________
 *|                                                            |
 *|         JS para el juego.                                  | 
 *| ___________________________________________________________| 
 */

/* --------------- Declaracion de variables globales ---------------  */


/* --------------- Funciones de eventos ---------------  */
function init() {
    return true;
}

/* --------------- Evento DOM ---------------  */
document.addEventListener("DOMContentLoaded", (e) => { //Inmediatamente despues de la carga del DOM...
    if (checkPlayerExist() == false) { //...revisamos que se hayan enviado los datos del jugador.
        window.alert("No se han enviado datos del jugador!!");
        window.location="menu.html";
    } else { //Si todo es correcto...
        init(); //...proseguimos.
    };
});