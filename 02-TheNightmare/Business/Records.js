/**
 * @author Alexandros Estrella de la Mañana <alejandro.gh98@outlook.com>
 * @link https://github.com/alexandro-morningstar GitHub
 * ________________________________________________________________________
 *|                                                                        |
 *|   JS para generar tabla de registros y acciones (delete/edit/search).  |
 *| _______________________________________________________________________|
 */

/* --------------- Declaracion de variables globales ---------------  */
var historialCompleto;
var rows;
var tbody;
var id;

/* --------------- Funciones de eventos ---------------  */
/**
 * Busca coincidencias de texto de text dentro de history
 * @date 2024-09-12
 * @param { JSON (string) } history
 * @param { String } text
 */
function dataFilter(history, text) {
    return history.filter(item => 
        item.player.toLowerCase().includes(text.toLowerCase()) ||
        item.mail.toLowerCase().includes(text.toLowerCase())
    );
};

/**
 * Barra de busqueda
 * @date 2024-09-12
 * @param { Event } e
 */
function searchRecord(e) {
    e.preventDefault();
    let formData = new FormData(e.target); //Capturar el input del form
    let searchText = formData.get("text");
    let historyCoincidences = dataFilter(historial, searchText); //Filtrar el historial
    rows = ""; //limpiar las filas actuales
    fillTable(historyCoincidences); //Pasarlo como parametro para llenar de nuevo la tabla (filltable(nuevoHistorial))
    return true;
};

/**
 * Determina y guarda en el sessionStorage la información del registro que se eliminará para mostrarla en delete.html
 * @date 2024-08-29
 */
function deleteRecord() { //La información no la obtenemos del submit de un form, si no de capturar el Id y acceder a las posiciones correspondientes de las entradas del localStorage
    id = this.querySelector("input").value; //Cada registro tiene un solo elemento "input", el cual es hidden pero contiene el correspondiente id de cada registro generado en la tabla (el id es "dinamico", se recalcula de acuerdo a la longitud actual de la tabla);

    /* Accedemos al array de objetos (historial) en la posición (id) seleccionada, y luego al valor correspondiente de cada key (.player, .mail, .date)*/
    let player = historial[id].player;
    let mail = historial[id].mail;
    let date = historial[id].date;

    /* Guardamos la información del registro a eliminar en el SessionStorage para recuperarla posterioremente en la pagina de "confirmacion"*/
    setDeleteInfo(id, player, mail, date);
};

function editRecord(e) { //Similar a deleteRecord() pero recogemos menos cosas
    //e.preventDefault();
    id = this.querySelector("input").value;

    /* Información que se va a editar */
    let player = historial[id].player;
    let mail = historial[id].mail;

    /* Guarda la información del registro que se puede editar */
    setEditInfo(id, player, mail);
    //console.log(`La información que se editará es: id->${id}, player->${player}, mail->${mail}`);
};

/**
 * Obtiene (si existe) un item "success" del sessionStorage; si existe introduce la etiqueta con el mensaje
 * despues de 5seg elimina la etiqueta y remueve el item del sessionStorage.
 * @date 2024-08-29
 */
function adviceSuccess() {
    let success = document.getElementById("success");
    let successMessage = sessionStorage.getItem("success");
    if( successMessage != null ) {
        success.innerHTML=`<p>${successMessage}</p>`;
        setTimeout(removeSuccess = () => {
            success.innerHTML=``;
            sessionStorage.removeItem("success");
        }, 5000);
    };
};

/**
 * Una vez llenada la tabla, podemos continuar con la lógica de las acciones.
 * Captura todos los elementos con clase editForm y deleteForm correspondientes a los botones de Editar y Eliminar
 * Le asigna sus respectivos eventos.
 * @date 2024-08-29
 */
function init() {
    adviceSuccess();

    /* --------- Captura de elementos HTML ---------  */
    let searchForm = document.getElementById("searchForm");
    let clearSearch = document.getElementById("clearSearch");
    let editForms = document.getElementsByClassName("editForm");
    let deleteForms = document.getElementsByClassName("deleteForm");

    /* --------- Asignación de eventos ---------  */
    searchForm.addEventListener("submit", searchRecord);

    clearSearch.addEventListener("click", fillPage);

    for (let editForm of editForms) { //Evento para botones "Editar"
        editForm.addEventListener("submit", editRecord);
    };

    for (let deleteForm of deleteForms) { //Evento para botones "Eliminar"
        deleteForm.addEventListener("submit", deleteRecord);
    };
};

/**
 * Solicita la información actualizada del historial, recorre los registros y realiza el llenado de la tabla (acumulando e insertando o sobreescribiendo HTML).
 * @param { Object } currentHistorial
 * @date 2024-09-04
 */
function fillTable(currentHistorial) {
    console.log(currentHistorial);
    let id = 0;
    for (var record of currentHistorial) {
        if (rows != null) {
            rows = `<tr>
                                <td>${record.player}</td>
                                <td>${record.mail}</td>
                                <td>${record.date}</td>
                                <td class="table-actions">
                                    <form class="editForm" action="edit.html">
                                        <button class="btn btn-outline-warning" role="submit" type="submit">
                                            Editar <i class="fa-regular fa-pen-to-square"></i>
                                        </button>
                                        <input type="hidden" value="${id}"></input>
                                    </form>
                                    <form class="deleteForm" action="delete.html" >
                                        <button class="btn btn-outline-danger" role="submit" type="submit">
                                            Eliminar <i class="fa-solid fa-delete-left"></i>
                                        </button>
                                        <input type="hidden" value="${id}"></input>
                                    </form>
                                </td>
                            </tr>` + rows;
        } else {
            rows = `<tr>
                        <td>${record.player}</td>
                        <td>${record.mail}</td>
                        <td>${record.date}</td>
                        <td class="table-actions">
                            <form class="editForm" action="edit.html">
                                <button class="btn btn-outline-warning" role="submit" type="submit">
                                    Editar <i class="fa-regular fa-pen-to-square"></i>
                                </button>
                                <input type="hidden" value="${id}"></input>
                            </form>
                            <form class="deleteForm" action="delete.html" >
                                <button class="btn btn-outline-danger deleteButton" role="submit" type="submit">
                                    Eliminar <i class="fa-solid fa-delete-left"></i>
                                </button>
                                <input type="hidden" value="${id}"></input>
                            </form>
                        </td>
                    </tr>`
        };
        id++;
    };
    tbody.innerHTML=rows;

    init(); //Al final de llenado de la pagina proseguimos con el resto de tareas.
    console.log(getLocalStorage());
};

/**
 * Si se comprobó que existen jugadores en el historial, llama al llenado de la tabla. (solo es para haces mas granular la lógica).
 * @date 2024-08-29
 */
function fillPage() {
    /* --------- Captura de elementos HTML ---------  */
    tbody = document.getElementById("table-records");

    /* --------- Obtenemos historial completo en la primer carga de la página ---------  */
    historialCompleto = getLocalStorage();
    
    /* --------- Llamada de funciones ---------  */
    rows = ""; //Siempre antes de cada llenado, limpiamos la tabla.
    fillTable(historialCompleto);
};

/**
 * Inserta HTML anunciando que no existen jugadores en el historial (localStorage)
 * @date 2024-08-29
 */
function adviceNullRecord() {
    let advice = document.getElementById("adviceNullRecord");
    advice.innerHTML="<h2>Vaya! Parece que aún nadie ha jugado.</h2> <hr>"
};

/**
 * Comprueba que exista contenido en el localStorage para anunciar que no existen registros o iniciar el llenado de la tabla de registros.
 * @date 2024-08-29
 */
function checkRecords() {
    historial = getLocalStorage()
    if (historial == null || historial.length == 0) {
        adviceNullRecord();
    } else {
        fillPage();
    }
};

/* --------------- Evento DOM ---------------  */
document.addEventListener("DOMContentLoaded", checkRecords);