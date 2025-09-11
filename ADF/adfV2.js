// Estructura que representa un autómata
class Automata {
  constructor(alfabeto, numEstados, tabla, estadosFinales) {
    this.alfabeto = alfabeto;
    this.numSimbolos = alfabeto.length;
    this.numEstados = numEstados;
    this.tabla = tabla;
    this.estadosFinales = new Set(estadosFinales); // Convertir los estados de aceptación a un conjunto para facilitar la búsqueda
  }
  
  // Verifica si el símbolo pertenece al alfabeto
  esSimboloValido(c) {
    return this.alfabeto.includes(c);
  }

  // Función para simular el autómata con una cadena de entrada
  simular(cadena) {
  let estadoActual = 0;
  let traza = [];

  for (let i = 0; i < cadena.length; i++) {
    let simbolo = cadena[i];

    if (!this.esSimboloValido(simbolo)) {
      console.error(`Símbolo inválido: '${simbolo}' no pertenece al alfabeto`);
      return 0;
    }

    let indiceSimbolo = this.alfabeto.indexOf(simbolo);
    let transicionesEstado = this.tabla[estadoActual];

    if (!transicionesEstado || indiceSimbolo >= transicionesEstado.length) {
      console.error(`Transición no definida para estado ${estadoActual} con símbolo '${simbolo}'`);
      return 0;
    }

    let siguienteEstado = transicionesEstado[indiceSimbolo];

    if (siguienteEstado === '#' || isNaN(siguienteEstado)) {
      console.error(`Transición inválida: estado=${estadoActual}, símbolo='${simbolo}'`);
      return 0;
    }

    traza.push([estadoActual, simbolo]);
    estadoActual = parseInt(siguienteEstado);
  }

  if (this.estadosFinales.has(estadoActual)) {
    console.log("CADENA ACEPTADA");
    console.log(`TRAZA: ${JSON.stringify(traza)}`);
    return 1;
  } else {
    console.log("CADENA RECHAZADA");
    console.log(`TRAZA: ${JSON.stringify(traza)}`);
    return 0;
  }
}

}

// Lee el autómata desde la entrada estándar
function leerAutomata() {

  // Leer alfabeto
  let alfabeto = prompt('Introduce el alfabeto (sin espacios, por ejemplo, ab)');
  
  // Leer número de estados
  let numEstados = parseInt(prompt("Introduce el número de estados"));
  
  // Leer la tabla de transiciones
      console.log('Escribe las trancisiones');
      let tabla = [];
        for (let i = 0; i < numEstados; i++) {
            let transiciones = prompt(`Introduce las transiciones para el estado q${i} (separadas por espacio)`).split(' ');
            tabla.push(transiciones);
        }

  
  
  // Leer los estados de aceptación
  let estadosAceptacion = prompt("Introduce los estados de aceptación (separados por espacio)").split(' ').map(Number);
  
  // Crear el autómata
  return new Automata(alfabeto, numEstados, tabla, estadosAceptacion);
}

// Lee la cadena que se va a procesar
function leerCadena() {
  return prompt('Introduce la cadena a procesar');
}

// Función principal
function main() {
  let automata = leerAutomata(); // Leer el autómata
  let cadena = leerCadena(); // Leer la cadena

  // Simular el autómata
  automata.simular(cadena);
}

// Ejecutar el programa
main();

