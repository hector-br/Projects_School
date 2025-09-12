// Estructura del AFD
const AFD = {
    alfabeto:[],
    numSimbolos:0,
    numEstados:0,
    tabla:[],
    estadosFinales:[]
}


function leerAutomata(){

    let alfabeto = prompt('Ingresa el afabeto sin espacios').split('');
    let numEstados = parseInt(prompt('Ingresa el numero de estados'));

    let tabla = [];
    for(let i=0; i<numEstados; i++){
        let transiciones = prompt('Ingrese la transicion para el estado: ' + i);
        let transObj = {};
        transiciones.split(',').forEach(t => {
            let [simbolo, destino] = t.split(':');
            transObj[simbolo] = parseInt(destino);
        });
        tabla.push(transObj);
    }

    let edosFinales = prompt('Ingrese los estados finales separados por espacios').split('');

    AFD.alfabeto = alfabeto;
    AFD.numSimbolos = alfabeto.length;
    AFD.numEstados = 5;
    AFD.tabla = tabla;
    AFD.estadosFinales = edosFinales;
    
}

function leerCadena(){
    return prompt('Ingrese la cadena a procesar');
}

function simularCadena(AFD, cadena){
    let estadoActual = 0;
    let traza=[];

    for(let i=0; i<cadena.length; i++){
        let simbolo = cadena[i];

        if(!simularCadena(simbolo)){
            console.log('Simbolo invalido: ' + ' no pertenece al alfabeto');
            return 0;
        }

        let indiceSimbolo = AFD.alfabeto.indexOf(simbolo);
        let TransicionesDeEstado = AFD.tabla[estadoActual];
    }

}
document.getElementById('btnProbar').addEventListener('click', ()=>{
  alert(AFD.numEstados);
});
