/**
 * @author Alexandros Estrella de la Mañana <alejandro.gh98@outlook.com>
 * @link https://github.com/alexandro-morningstar GitHub
 * _______________________________________________
 *|                                               |
 *|      JS para confirmar edit del registro      |
 *| ______________________________________________|
 */

// var swal = require('sweetalert2')

/* --------------- Declaracion de variables globales ---------------  */
var nickname;
var email;

/* --------------- Funciones de eventos --------------- */
/**
 * Retorna True si todo es correcto, de lo cotrario devuelve una string indicando el error.
 * Solo busca reducir un poco el tamaño de la función applyModifications() y hacer más granular la lógica.
 * Comprueba que el valor del checkbox sea true y los formatos de newNickname y newEmail sean válidos.
 * @date 2024-08-30
 * @param { String } checkBoxValue
 * @param { String } newNickname
 */
function checkEditInfo(checkBoxValue, newNickname, newEmail) {
    let nicknameRegex = /^[a-zA-Z0-9._\s-]*$/; //true == entrada correcta
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; //true == entrada correcta

    if (checkBoxValue == "true") {
        if (nicknameRegex.test(newNickname)) {
            if (emailRegex.test(newEmail)) {
                return true; //Aquí se deberían de haber completado todas las validaciones.
            } else {
                return "El correo electrónico no tiene un formato válido, revísalo e intentálo de nuevo.";
            };
        } else {
            return "El nombre del jugador solo puede contener letras mayúsculas, minúsculas, números y simbolos . _ -"
        };
    } else {
        return "No haz confirmado la acción!!";
    };
};

/**
 * Captura las entradas del form para editar, comprueba que los formatos sean correctos, que se confirme la acción y aplica los cambios.
 * @date 2024-08-30
 * @param { Event } event
 */
function applyModifications(event) {
    event.preventDefault();

    /* --------- Captura de historial, datos de formulario e inicialización de variables ---------  */
    let id = sessionStorage.getItem("idToModify");
    let history = getLocalStorage();
    let formData = new FormData(event.target);
    let checkBoxValue = formData.get("confirmation");
    let newNickname = formData.get("newNickname");
    let newEmail = formData.get("newEmail");

    /* --------- Comprobar el checkbox y editar ---------  */
    let infoValidation = checkEditInfo(checkBoxValue, newNickname, newEmail);

    if (infoValidation == true) {
        sessionStorage.setItem("success", `El jugador ${newNickname} se ha editado exitosamente.`);
        let entry = history[id]; //Registro del jugador dentro del localStorage
        entry["player"] = newNickname; //Sobreescribir el nickname
        entry["mail"] = newEmail; //Sobreescribir el email
        setLocalStorage(history); //Aplicar cambios
        removeEditInfo(); //Limpiar la información del sessionStorage para no estarla arrastrando
        window.location="records.html";
    } else {
        window.alert(infoValidation);
    };
};

/**
 * Llena los campos input (editables) con su respectiva información (del jugador) extraida del actual sessionStorage
 * @date 2024-08-30
 */
function fillEdit() {
    /* --------- Llenado de los inputs --------- */
    nickname.value=sessionStorage.getItem("playerToModify");
    email.value=sessionStorage.getItem("emailToModify");
};

/**
 * Captura los elementos HTML y agrega EventListener al form. Llama a la función para llenar los campos input
 * @date 2024-08-30
 */
function init() {
    /* --------- Captura de elementos HTML --------- */
    nickname = document.getElementById("newNickname");
    email = document.getElementById("newEmail");
    modifyForm = document.getElementById("confirmModifications");

    /* --------- Asignación de eventos --------- */
    modifyForm.addEventListener("submit", applyModifications);

    /* --------- Llamada de funciones (comenzar llenado) --------- */
    fillEdit();
};

/* --------------- Evento DOM ---------------  */
document.addEventListener("DOMContentLoaded", () => {
    if (checkDataToEdit() == false) {
        window.alert("Parece que algo ha salido mal!!");
        window.location="records.html";
    } else {
        init();
    };
});