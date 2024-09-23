/**
 * @author Alexandros Estrella de la Mañana <alejandro.gh98@outlook.com>
 * @link https://github.com/alexandro-morningstar GitHub
 * _______________________________________________
 *|                                               |
 *|      JS para confirmar delete de jugador      |
 *| ______________________________________________|
 */

/* --------------- Declaracion de variables globales ---------------  */
var tbody;
var player;
var mail;
var date;

/* --------------- Funciones de eventos ---------------  */
/**
 * Obtiene el historial completo, el valor del checkbox y el Id actual en el sessionStorage.
 * Si el valor del checkbox es true, elimina el registro y retorna a records.html con un mensaje de éxito.
 * Si es false, manda una alerta, no permite la acción pero mantiene la pagina actual.
 * @date 2024-08-29
 * @param { Event } e
 */
function deleteAction(e) {
    e.preventDefault();//Prevenimos el default del submit para gestionar todas las acciones desde aqui 

    /* --------- Captura de elementos HTML e inicialización de variables ---------  */
    let id = sessionStorage.getItem("idToDelete"); //Contiene la referencia para eliminar el registro del SessionStorage
    let history = getLocalStorage();
    let formData = new FormData(e.target); //Capturamos los datos del form que detonó el evento
    //let checkBoxValue = Object.fromEntries(formData.entries()); //Convertimos a objeto simple las entradas, en este caso solo obtenemos una (el valor o null del switch check box)
    let checkBoxValue = formData.get("confirmation");

    /* --------- Comprobar el checkbox y eliminar ---------  */
    if (checkBoxValue == "true") {//SI se marca el switch, es true
        sessionStorage.setItem("success", `El jugador ${player} con email ${mail} ha sido desterrado satisactorialmente.`);
        history.splice(parseInt(id), 1); //Elimina, dentro de un array de objetos, desde la posición indicada (id), un elemento.
        setLocalStorage(history); //Aplicar cambios
        removeDeleteInfo(); //Limpiamos la info.
        window.location="records.html";
    } else {
        window.alert("No haz confirmado la acción!!");
    };
};

/**
 * Asigna el principal (y único evento) de esta página (solo busca hacer más granular la lógica).
 * @date 2024-08-29
 */
function init() {
    /* --------- Captura de elementos HTML ---------  */
    let deleteConfirmation = document.getElementById("confirmDelete");

    /* --------- Asignación de eventos ---------  */
    deleteConfirmation.addEventListener("submit", deleteAction);
};

/**
 * Llenamos la tabla al obtener la ultima actualización del sessionStorage realizada por setDeleteInfo()
 * @date 2024-08-29
 */
function fillDelete() {
    /* --------- Captura de elementos HTML ---------  */
    tbody = document.getElementById("table-records");

    /* --------- Llenado de la tabla ---------  */
    player = sessionStorage.getItem("playerToDelete");
    mail = sessionStorage.getItem("emailToDelete");
    date = sessionStorage.getItem("dateToDelete");
    let row = `<tr>
                    <td>${player}</td>
                    <td>${mail}</td>
                    <td>${date}</td>
                </tr>`;
    tbody.innerHTML=row;

    init(); //Al final de llenado de la pagina proseguimos con el resto de tareas.
};


/* --------------- Evento DOM ---------------  */
document.addEventListener("DOMContentLoaded", () => { //Inmediatamente despues de la carga del DOM...
    if (checkDataToDelete() == false) { //...revisamos que se hayan enviado los datos del jugador.
        window.alert("Parece que algo ha salido mal!!");
        window.location="records.html";
    } else { //Si todo es correcto...
        fillDelete(); //...proseguimos.
    };
});