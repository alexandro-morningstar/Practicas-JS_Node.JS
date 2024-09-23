/**
 * @author Alexandros Estrella de la Mañana <alejandro.gh98@outlook.com>
 * @link https://github.com/alexandro-morningstar GitHub
 * ____________________________________________________________
 *|                                                            |
 *|          JS para las animaciones del Index.html            | 
 *| ___________________________________________________________| 
 */

/* --------------- Declaracion de variables globales ---------------  */
var toChange;
var japText;
var espText;
var glitchTimeout;

/* --------------- Captura de elementos HTML ---------------  */
toChange = document.getElementsByClassName("to-change"); //Almaceno todos los elementos HTML que tengan la clase "to-change"

/* --------------- Funciones de eventos ---------------  */
/**
 * Activa la animación de Glitch al elemento HTML que desencadenó el evento
 * @date 2024-08-15
 * @param { Event object } e
 */
function changeToSpanish(e){
    clearTimeout(glitchTimeout); //Limpiamos cualquier tiempo de espera existente

    japText = this.getElementsByClassName("jap-text")[0]; //Almacenar solo el primer elemento con clase "jap-text" dentro del contexto en el que se desencadena este evento
    espText = this.getElementsByClassName("esp-text")[0];
    
    japText.classList.add("glitch"); //Agregamos la clase "glitch" al elemento para que adquiera la animación definida en CSS

    glitchTimeout = setTimeout(glitchTemp = () => {
        japText.classList.remove("glitch"); //Retirará la clase glitch
        japText.style.opacity = "0"; //Ocultará el titulo en japonés
        espText.style.opacity = "1"; //Mostrará el titulo en español
    }, 500); //Todo lo anterior, despues de que nuestro cursor haya estado 1seg en el contenedor con id="titulo"
};

/**
 * Regresa los parámetros de opacidad originales de los elementos HTML con class="jap-text" y class="esp-text"
 * (del ultimo elemento HTML que activó el evento anterior "changeToSpanish")
 * @date 2024-08-15
 * @param { Event object } e
 */
function changeToJapanese(e){
    clearTimeout(glitchTimeout); //Limpiamos de nuevo cualquier tiempo de espera existente
    japText.style.opacity = "1"; //Volvemos a mostrar el titulo en japonés
    espText.style.opacity = "0"; //Volvemos a ocultar el titulo en español
};


/* --------------- Asginación de eventos ---------------  */
document.addEventListener("DOMContentLoaded", init = () => {
    for (let item of toChange) { //Agregar los eventos a todos los elementos HTML en toChange
        item.addEventListener("mouseover", changeToSpanish);
        item.addEventListener("mouseout", changeToJapanese);
    };
});