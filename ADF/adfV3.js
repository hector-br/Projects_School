// Estructura del AFD
const AFD = {
    alfabeto:[],
    numSimbolos:0,
    numEstados:0,
    tabla:[],
    estadosFinales:[]
}


function leerAutomata(){

    let alfabeto = prompt('Ingresa el afabeto sin espacios');
    let numEstados = parseInt(prompt('Ingresa el numero de estados'));

    let tabla = [];
    for(let i=0; i<numEstados; i++){
        let transiciones = prompt('Ingrese la transicion para el estado: ' + i).split(' ');
        /*let transObj = {};
        transiciones.split(',').forEach(t => {
            let [simbolo, destino] = t.split(':');
            transObj[simbolo] = parseInt(destino);
        });*/
        //tabla.push(transObj);
        tabla.push(transiciones);
    }

    let edosFinales = prompt('Ingrese los estados finales separados por espacios').split(' ').map(Number);

    AFD.alfabeto = alfabeto;
    AFD.numSimbolos = alfabeto.length;
    AFD.numEstados = numEstados;
    AFD.tabla = tabla;
    AFD.estadosFinales = edosFinales;    
}

function simboloValido(c){
    return AFD.alfabeto.includes(c);
}

function leerCadena(){
    return prompt('Ingrese la cadena a procesar');
}
let traza=[];
function simularCadena(AFD, cadena){
    let estadoActual = 0;
   

    for(let i=0; i<cadena.length; i++){
        let simbolo = cadena[i];

        if(!simboloValido(simbolo)){
            console.log('Simbolo invalido: ' + simbolo + ' no pertenece al alfabeto');
            return 0;
        }

        let indiceSimbolo = AFD.alfabeto.indexOf(simbolo);
        let transicionesEstados = AFD.tabla[estadoActual];

        if(!transicionesEstados || indiceSimbolo >= transicionesEstados.length){
            console.log("Transicion no definida para estado: " + estadoActual + "con simbolo: " + simbolo);
            return 0;
        }

        let siguienteEstado = transicionesEstados[indiceSimbolo];
        if(siguienteEstado === '#' || isNaN(siguienteEstado)){
            console.log("Transicion invalida: para estado =  " + estadoActual + ", simbolo " + simbolo);
            return 0;
        }

        traza.push([estadoActual, simbolo]);
        estadoActual = parseInt(siguienteEstado);
    }

    if (AFD.estadosFinales.includes(estadoActual)) {
        return 1;
    } else {
        return 0;
    }
}


function imprimirTraza(){
    let salida = traza.map(par => `(e${par[0]},${par[1]})`).join(',');
    let nuevoContent = document.createElement('p');
    nuevoContent.textContent = 'Traza: [' + salida + ']';

    let container = document.getElementById('section');
    container.appendChild(nuevoContent);

    console.log('Traza: [' + salida + ']');

}

function main(){
    leerAutomata();
    let cadena = leerCadena();
    
    let resultado = simularCadena(AFD, cadena);
    console.log('Resultado: ' + resultado);
    if(resultado == 1){
        console.log("Aceptada");
    }else{
        console.log("Rechazada");
    }
    imprimirTraza();
}



document.getElementById('btnProbar').addEventListener('click', (event)=>{
    event.preventDefault();
    main();
});
