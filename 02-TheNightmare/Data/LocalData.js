/**
 * @author Alexandros Estrella de la Mañana <alejandro.gh98@outlook.com>
 * @link https://github.com/alexandro-morningstar GitHub
 * ____________________________________________________________
 *|                                                            |
 *|       JS para acceder al sistema de archivos local.        | 
 *| ___________________________________________________________| 
 */

/* --------------- Declaracion de variables globales ---------------  */
// Módulos para interactuar con el sistema de archivos local
const { rejects } = require("assert"); //¿Se generó solo?
const filesystem = require("fs");
const { type } = require("os"); //¿Se generó solo?
const path = require("path");
const pathToImages = path.join(__dirname, "../UI/Img/") //Ruta al directorio de imagenes
const imgExt = [".png"]; //Extensiones que buscaremos
var images = [];

/* --------------- Node.JS ---------------  */
/* ------ Llamada de funciones (es un ejemplo, al final se llamará esto desde App.js) ------  */
function sendImagesToSessionStorage(images) {
    for (let i=0; i < images.length; i++) {
        sessionStorage.setItem(`img${i}`, images[i].value);
        console.log(i);
    }
}

getImgList(pathToImages)
    .then(imageFiles => { //Si la llamada fue exitosa...
        for(image of imageFiles) {
            images.push(image);
        }
        console.log("Lista de imagenes global", images);

        sendImagesToSessionStorage(images);
    })
    .catch(error => { //Si se generó un error durante la llamada...
        console.error(error);
    });


/* ------ Declaración de funciones ------  */
function getImgList(directoryPath) {
    return new Promise ((resolve, reject) => { //Promise es como un Try, definimos el parametro por si se cumple o por si no
        filesystem.readdir(directoryPath, (error, files) => { //Con el modulo fs (renombrado: filesystem) intentamos leer el directorio
            if(error) { //Si ocurre un error...
                reject(`Ha ocurrido un error al intentar leer el directorio: ${error.message}`);
                return;
            } else {
                let imageFiles = files.filter(file => { //variable temporal, donde se guardarán las imagenes
                    let ext = path.extname(file).toLowerCase(); //convertimos todo a minusculas para hacer mas sencilla la manipulacion
                    return imgExt.includes(ext); //retornamos lo que coincida con las extensiones especificadas
                });
                resolve(imageFiles) //guardamos las imagenes
            };
        });
    });
};

document.addEventListener("DOMContentLoaded", getImgList);