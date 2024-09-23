/**
 * @author Alexandros Estrella de la Mañana <alejandro.gh98@outlook.com>
 * @link https://github.com/alexandro-morningstar GitHub
 * ____________________________________________________________
 *|                                                            |
 *|     JS para ir al menú después de la "barra de carga"      |
 *| ___________________________________________________________| 
 */

/* --------------- Asginación de eventos ---------------  */
document.addEventListener("DOMContentLoaded", init = () => {
    /* --------------- Funciones de eventos ---------------  */
    setTimeout(nextPage = () => {
        window.location.href = "menu.html";
    }, 3000);
});