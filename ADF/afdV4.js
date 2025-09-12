// 🧩 Estructura del autómata
const Automata = {
    alfabeto: [],
    numEstados: 0,
    tabla: [],
    finales: [],
    cadena: ""
};

// 📥 Módulo 1: leerAutomata()
// Lee el alfabeto, número de estados, tabla de transiciones y estados finales
function leerAutomata() {
    Automata.alfabeto = prompt("Ingresa el alfabeto sin espacios (ej: ab)").split('');
    Automata.numEstados = parseInt(prompt("Ingresa el número de estados"));

    // Leer tabla de transiciones
    for (let i = 0; i < Automata.numEstados; i++) {
        let fila = prompt(`Transiciones para estado ${i} (ej: 1 2 o # 2)`).split(' ');
        let transiciones = fila.map(val => val === '#' ? null : parseInt(val));
        Automata.tabla.push(transiciones);
    }

    // Leer estados finales
    let finales = prompt("Estados de aceptación separados por espacio (ej: 1 2)").split(' ');
    Automata.finales = finales.filter(e => e !== '').map(Number);
}

// 📥 Módulo 2: leerCadena()
// Lee la cadena a procesar
function leerCadena() {
    Automata.cadena = prompt("Ingresa la cadena a procesar (ej: abb)");
}

// 🔄 Módulo 3: simular()
// Procesa la cadena y construye la traza
function simular() {
    let estadoActual = 0;
    let traza = [];

    for (let i = 0; i < Automata.cadena.length; i++) {
        let simbolo = Automata.cadena[i];
        let idx = Automata.alfabeto.indexOf(simbolo);

        if (idx === -1) {
            console.log(`ERROR: símbolo fuera del alfabeto: ${simbolo}`);
            return;
        }

        let siguienteEstado = Automata.tabla[estadoActual][idx];
        if (siguienteEstado === null || siguienteEstado === undefined) {
            console.log(`ERROR: transición no definida para (estado=${estadoActual}, símbolo=${simbolo})`);
            return;
        }

        traza.push(`(e${estadoActual},${simbolo})`);
        estadoActual = siguienteEstado;
    }

    // Verificar aceptación
    if (Automata.finales.includes(estadoActual)) {
        console.log("ACEPTADA");
    } else {
        console.log("RECHAZADA");
    }

    // Imprimir traza
    console.log("TRAZA: [" + traza.join(',') + "]");
}

// 🧪 Módulo 4: ejecución principal
function main() {
    leerAutomata();   // Módulo 1
    leerCadena();     // Módulo 2
    simular();        // Módulo 3
}

main(); // Ejecutar todo
