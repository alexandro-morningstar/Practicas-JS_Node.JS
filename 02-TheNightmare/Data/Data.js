/**
 * @author Alexandros Estrella de la Mañana <alejandro.gh98@outlook.com>
 * @link https://github.com/alexandro-morningstar GitHub
 * ____________________________________________________________
 *|                                                            |
 *|        JS para gestión del Session & Local Storage.        | 
 *| ___________________________________________________________| 
 */

/* --------------------- Session Storage --------------------- */
/**
 * Elimina ("limpia") la información en sessionStorage del registro que se editó
 * @date 2024-09-12
 */
function removeEditInfo() {
    sessionStorage.removeItem("idToModify");
    sessionStorage.removeItem("playerToModify");
    sessionStorage.removeItem("emailToModify");
};

/**
 * Revisa que exista información en edit.html, retorna falso si no hay información.
 * @date 2024-09-12
 */
function checkDataToEdit() {
    if(!sessionStorage.getItem("idToModify") && !sessionStorage.getItem("playerToModify") && !sessionStorage.getItem("emailToModify")){
        return false;
    };
};

/**
 * Almacena en sessionStorage la información del registro que se editará
 * @date 2024-09-12
 * @param { int } id
 * @param { string } player
 * @param { string } email
 */
function setEditInfo(id, player, email) {
    sessionStorage.setItem("idToModify", id);
    sessionStorage.setItem("playerToModify", player);
    sessionStorage.setItem("emailToModify", email);
};

/**
 * Elimina ("limpia") la información en sessionStorage del registro que se eliminó
 * @date 2024-08-29
 */
function removeDeleteInfo() {
    sessionStorage.removeItem("idToDelete");
    sessionStorage.removeItem("playerToDelete");
    sessionStorage.removeItem("emailToDelete");
    sessionStorage.removeItem("dateToDelete");
};

/**
 * Revisa que exista información en delete.html, retorna falso si no hay información.
 * @date 2024-08-29
 */
function checkDataToDelete() {
    if(!sessionStorage.getItem("idToDelete") && !sessionStorage.getItem("playerToDelete") && !sessionStorage.getItem("emailToDelete") && !sessionStorage.getItem("dateToDelete")) {
        return false;
    };
};

/**
 * Almacena en sessionStorage la información del registro que se eliminará
 * @date 2024-08-20
 * @param { HTMLDataElement } id (Proviene de un this.querySelector("input").value)
 * @param { Var String } player (Proviene de un objeto historial[id].player)
 * @param { Var String } email (Proviene de un objeto historial[id].mail)
 * @param { Var String } registryDate (Proviene de un objeto historial[id].date)
 */
function setDeleteInfo(id, player, email, registryDate) {
    sessionStorage.setItem("idToDelete", id);
    sessionStorage.setItem("playerToDelete", player);
    sessionStorage.setItem("emailToDelete", email);
    sessionStorage.setItem("dateToDelete", registryDate);
};

/**
 * Almacena avatar (img.src) y nombre de usuario
 * @date 2024-08-18
 * @param { HTMLElement.src } imageSource Source de la imagen extraido de un elemento HTML
 * @param { HTMLElement.value } username Value de un input recuperado de formulario HTML
 */
function saveSessionInfo(avatarSource, playername) {
    sessionStorage.setItem("avatar", avatarSource);
    sessionStorage.setItem("nickname", playername);
};

/**
 * Coloca un item de error en el sessionStorage cuando es invocado con el nombre y correo del jugador
 * @date 2024-09-12
 * @param { string } nickname
 * @param { string } email
 */
function throwError(nickname, email) {
    sessionStorage.setItem("error", `Ya existe un jugador con nombre: ${nickname} o email: ${email}`);
    return false;
};

/**
 * Comprueba que existan datos del jugador en la sesión actual de juego
 * @date 2024-08-18
 */
function checkPlayerExist() {
    if(!sessionStorage.getItem("avatar") && !sessionStorage.getItem("nickname")) {
        sessionStorage.setItem("error", "No se han enviado datos del jugador!!");
        return false;
    };
};

/* --------------------- Local Storage --------------------- */
/**
 * Obtiene un JSON String del LocalStorage y lo retorna en un array de objetos (JSON) para manipular.
 * @date 2024-08-29
 */
function getLocalStorage() {
    let history = localStorage.getItem("record");
    history = JSON.parse(history);
    return history;
};

/**
 * Recibe un Array de Objetos (JSON), lo convierte en texto plano (string) y lo almacena nuevamente en el localStorage.(lo "actualiza").
 * @date 2024-08-29
 * @param { JSON } history
 */
function setLocalStorage(history) {
    localStorage.setItem("record", JSON.stringify(history));
};

/**
 * Almacena email y hora de registro (day, dd/mm/yyyy, [12]hh:mm:ss') para el historial de jugadores
 * Cada que se llama al historial, se convierte de StringJSON a JSObject, y viceversa al terminar la función
 * @date 2024-08-18
 * @param { HTMLElement.value } email Value de un input recuperado de formulario HTML
 */
function savePlayersRecord(nickname, email) {
    let playersRecord = localStorage.getItem("record"); //Llamamos al item "record" dentro del LocalStorage
    let record;
    let date = new Date().toLocaleDateString(undefined, {year:"numeric", month:"2-digit", day:"2-digit", weekday:"long", hour:"2-digit", hour12:false, minute:"2-digit", second:"2-digit"});

    if (playersRecord == null) { //Si no existe un historial (un item llamado "record")
        record = []; //Inicializamos record como una lista vacía para usarla como historial
    } else {
        record = JSON.parse(playersRecord); //Si existe, convertimos lo que haya dentro (una cadena de texto enformato JSON) en un Objeto JavaScript
    };

    let playerEntry = { //Creamos una entrada de jugador nueva (objeto (diccionario) JS)
        player:nickname,
        mail:email,
        date:date //Hora del registro (o ultima actualizacion)
    };

    record.push(playerEntry); //Agregamos la entrada del jugador a nuestro historial (record)
    console.log(record);
    localStorage.setItem("record", JSON.stringify(record)); //Volvemos a convertir el objeto JS en un string en formato JSON para su almacenamiento
};



// IDEA: AL FINAL TRATAR DE ACOMODAR POR ETAPAS CRUD (CREATE, READ, UPDATE, DELETE) AUNQUE SE DEBA ESPECIFICAR LOCAL Y SESSION STORAGE EN CADA UNA