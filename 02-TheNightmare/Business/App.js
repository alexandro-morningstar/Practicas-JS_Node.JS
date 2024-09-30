/**
 * @author Alexandros Estrella de la Mañana <alejandro.gh98@outlook.com>
 * @link https://github.com/alexandro-morningstar GitHub
 * ____________________________________________________________
 *|                                                            |
 *|         JS para comprobación de datos de entrada.          | 
 *| ___________________________________________________________| 
 */

/* --------------- Declaracion de variables globales ---------------  */
var avatars;
var avatarImg;
var avatarSuggestedName;
var inputName;
var inputEmail; //Esta variable solo se usará en un scope, pero para mantener consistencia y orden, la declaramos e inicializamos con el resto.
var submit;
var error;

/* --------------- Funciones de eventos ---------------  */
/**
 * Retorna un entero (id) si el jugador está repetido o false el jugador no está repetido.
 * @param { string } nickname
 * @param { string } email
 * @date 2024-09-07
 */
function repeatedPlayer(nickname, email) {
    let history = getLocalStorage();
    let idRepetido = 0; //Debería iniciar desde el indice 0
    for (var record of history) {
        // console.log("")
        if(record.player == nickname || record.mail == email) { //Si hay alguna coincidencia en nombre o correo...
            //return [idRepetido, record.player, record.mail]; //...devuelve la posición del id en donde se encontró la coincidencia (iteración donde se encontró)
            return `${record.player} (${record.mail}) con ID: ${idRepetido}`;
        } else { //Si no se encuentra coincidencia en este registro...
            idRepetido++; //...aumenta 1 al indice y avanza a la siguiente iteración.
        };
    };
    return false; //Si en ninguna iteración encontró coindidencias, retorna falso
};

/**
 * Comprueba toda la información del formulario para iniciar el juego
 * Que no haya nulos, que existan formatos correctos y que no existan jugadores repetidos.
 * @date 2024-09-12
 * @param { Event } e
 */
function checkInputs(e) { //Solo manejamos los datos de inputs, toda la lógica de imagenes de avatar se maneja en otras funciones!!
    e.preventDefault();
    let nicknameStringValidator = /^[a-zA-Z0-9._\s-]*$/; //true == entrada correcta
    let emailStringValidator = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; //true == entrada correcta
    let formData = new FormData(e.target); /* Creamos un objeto FormData pasando como parámetro el elemento del formulario (disponible en el objeto de evento como event.target) */
    let nickname = formData.get("nickname"); /* Como conocemos los nombres de los campos que recuperamos (name="") usamos el método get() sobre el objeto FormData para acceder a los valores */
    let email = formData.get("email");

    if (nickname!="" && email!="" && avatarImg!=undefined) { //Comprobar que no existan campos vacíos
        if (nicknameStringValidator.test(nickname)) { //Comprobar que el nickname tenga un formato correcto (True == Es correcta la entrada).
            if(emailStringValidator.test(email)) { //Comprobar que el email tenga un formato correcto (True == Es correcta la entrada).
                let isRepeated = repeatedPlayer(nickname, email); 
                if (isRepeated == false) { //Si no existe previamente un jugador con el nickname o correo especificado, guardamos el nuevo registro 
                    saveSessionInfo(avatarImg, nickname); //sessionStorage para la partida en curso (solo se puede jugar en sessiones )
                    savePlayersRecord(nickname, email); //localStorage para el registro de jugadores
                    window.location="game.html";
                    return true;
                } else { //Si ya existe un jugador con el nickname o correo proporcionado...
                    let thisIsYou = window.confirm(`Acaso usted es el mismisimo ${isRepeated}?`); //mostramos en un alert la información correspondiente al registro "repetido" y preguntamos si es ese el jugador que intenta ingresar: */
                    if (thisIsYou){ /* - Si responde SI: inicia la aventura pero recuperando la información del jugador (y estadisticas) */
                        //window.alert("Tecnicamente aqui debería lanzar el juego con la información recuperada del jugador");
                        saveSessionInfo(avatarImg, nickname);
                        window.location="game.html";
                    } else {/*- Si responde NO: mandamos mensaje de "error", porque ya existe el jugador*/
                        throwError(isRepeated[1], isRepeated[2]);
                        window.location="menu.html";
                        return false;
                    };
                }
            } else {
                error.innerText="El correo electrónico no tiene un formato válido, revísalo e intentálo de nuevo.";
                inputEmail.focus();
                return false;
            };
        } else {
            error.innerText="Solo puedes utilizar letras mayúsculas, minúsculas, números y simbolos . _ -";
            inputName.focus();
            return false;
        };
    } else {
        error.innerText="Debes llenar todos los campos del formulario";
        return false;
    };
};

/**
 * Asigna la imagen seleccionada dentro de "la zona de invocacion", además inserta el nombre sugerido en la etiqueta input con el alt de la imagen.
 * @date 2024-09-12
 */
function setAvatarInfo() {
    let invokeImg = this.querySelector("img"); //Solo generamos la referencia del elemento HTML que tiene la imagen
    invokeImg.src = avatarImg; //Especificamos que el atributo source del elemento HTML <img> será ahora el almacenado en avatarImg
    inputName.value = avatarSuggestedName; //El valor de inputName será ahora el de avatarSuggestedName(alt="" de la etiqueta imagen)
};

/**
 * Obtiene source y nickanme (almacenado en la propiedad alt="" de la etiqueta HTML) de la imagen de avatar seleccionada
 * @date 2024-09-12
 */
function getAvatarInfo() {
    avatarImg = this.querySelector("img").src; //Obtenemos el source de la imagen seleccionada
    avatarSuggestedName = this.querySelector("img").alt; //Obtenemos el texto dentro del atributo alt=""
};

/**
 * Realiza las tareas necesarias para el inicio de la página (despues de la carga del DOM)
 * Captura elementos HTML y asigna eventos, busca y limpia elementos de error en el sessionStorage.
 * @date 2024-09-12
 */
function init() {
    /* --------- Captura de elementos HTML ---------  */
    invokeZone = document.getElementById("avatar-container");
    avatars = document.getElementsByClassName("avatar-item");
    inputName = document.getElementById("nickname");
    inputEmail = document.getElementById("email");
    submit = document.getElementById("form-in");
    error = document.getElementById("error");

    /* --------- Revisión de items "error" en el SessionStorage --------- */
    if (sessionStorage.getItem("error") != null) {
        error.innerText=sessionStorage.getItem("error");
        sessionStorage.removeItem("error"); //Limpiamos, eliminando el error
    };

    /* --------- Asignación de eventos --------- */
    //Eventos de avatar
    for (let avatar of avatars) {
        avatar.addEventListener("dragstart", getAvatarInfo);
    };

    //Eventos de zona de invocación
    invokeZone.addEventListener("dragover", e => { e.preventDefault();});
    invokeZone.addEventListener("drop", setAvatarInfo);

    //Eventos de envío de formulario
    submit.addEventListener("submit", checkInputs);
};

/* --------------- Evento DOM ---------------  */
document.addEventListener("DOMContentLoaded", init);