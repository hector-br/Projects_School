
/*
    const probarCadena = document.getElementById('btn');
    probarCadena.addEventListener('click', ()=>{
        let datos = [];
        let inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            console.log(input.value);
            datos.push(input.value);
        });
        console.log(datos);
        var alfabeto = datos[0];
        var numEstados = datos[1];

        console.log(transicion);
        var estadosAceptacion = datos[3];
        var cadena = datos[4];

        //main();
        console.log('Alf: ' + alfabeto);
        console.log('Num Estados: ' + numEstados);
        console.log('T: ' + transicion);
        console.log('Estado final: ' + estadoFinal);
        console.log('Cadena: ' + cadena);
    });*/
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
    const trazaStr = traza.map(([e, s]) => `(${e},${s})`).join(',');
    //console.log(`TRAZA: [${trazaStr}]`);
    if (this.estadosFinales.has(estadoActual)) {
      console.log("CADENA ACEPTADA");
      //console.log(`TRAZA: ${JSON.stringify(traza)}`);
      console.log(`TRAZA: [${trazaStr}]`);
      return 1;
    } else {
      console.log("CADENA RECHAZADA");
      //console.log(`TRAZA: ${JSON.stringify(traza)}`);
      console.log(`TRAZA: [${trazaStr}]`);

      return 0;
    }
  }
}

// Lee el autómata desde la entrada estándar
function leerAutomata() {

  //let alfabeto = prompt('Introduce el alfabeto (sin espacios, por ejemplo, ab)');

///////////
        let datos = [];
        let inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            console.log(input.value);
            datos.push(input.value);
        });
        console.log(datos);
        var alfabeto = datos[0];
        var numEstados = parseInt(datos[1]);

        console.log(numEstados);
        var aceptacionEstados = datos[3];
        var cadena = datos[4];

        //main();
        console.log('Alf: ' + alfabeto);
        console.log('Num Estados: ' + numEstados);
        //console.log('T: ' + transicion);
        console.log('Estado final: ' + aceptacionEstados);
        console.log('Cadena: ' + cadena);
    

///////////

  
  // Leer número de estados
  //let numEstados = parseInt(prompt("Introduce el número de estados"));
  
  // Leer la tabla de transiciones

  const darTransiciones = document.getElementById('t_cion');
  darTransiciones.addEventListener('click', ()=>{
      alert('EL input de transiciones esat activo');
       let tabla = [];
        for (let i = 0; i < numEstados; i++) {
            let transiciones = prompt(`Introduce las transiciones para el estado q${i} (separadas por espacio)`).split(' ');
            tabla.push(transiciones);
        }
  });
   /*   console.log('Escribe las trancisiones');
      let tabla = [];
        for (let i = 0; i < numEstados; i++) {
            let transiciones = prompt(`Introduce las transiciones para el estado q${i} (separadas por espacio)`).split(' ');
            tabla.push(transiciones);
        }
    */
  
  
  // Leer los estados de aceptación
  //let estadosAceptacion = prompt("Introduce los estados de aceptación (separados por espacio)").split(' ').map(Number);
    let estadosAceptacion = aceptacionEstados.split('').map(Number);
  // Crear el autómata
  return new Automata(alfabeto, numEstados, tabla, estadosAceptacion);
}

// Lee la cadena que se va a procesar
function leerCadena() {

  //return prompt('Introduce la cadena a procesar');
  return document.getElementById('cadena').value;
}

// Función principal
function main() {
  let automata = leerAutomata(); // Leer el autómata
  let cadena = leerCadena(); // Leer la cadena

  // Simular el autómata
  automata.simular(cadena);
}

// Ejecutar el programa
//main();



const probarCadena = document.getElementById('btn');
probarCadena.addEventListener('click', ()=>{
    main();
})