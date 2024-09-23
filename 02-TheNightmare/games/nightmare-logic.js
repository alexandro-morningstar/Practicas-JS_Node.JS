function yes_no() {
    while(true){
        try{
            return true;
        } catch {
            return false;
        };
    };
};

// const readline = require("readline");
import readline from "readline";

const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let hola = read.question("Ingresa un dato: ", (dato) => {
    return dato;
    // console.log(`Esta es una prueba, el dato ingresado es: ${dato}`);
    // read.close();
});

console.log(hola);