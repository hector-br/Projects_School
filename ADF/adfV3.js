// Estructura del ADF
const ADF = {
    alfabeto:"",
    numSimbolos:"",
    numEstados:"",
    tabla:[],
    estadosFinales:""
}


function leerAutomata(){

    /*let btnProbarCadena = document.getElementById('btnProbar');
    btnProbarCadena.addEventListener('click', ()=>{
   
        let alfabeto = document.getElementById('alfabeto');
        let numEstados = document.getElementById('num_estados');
        let edosFinales = document.getElementById('edos_finales');
   
        return (alfabeto, numEstados, tabla, edosFinales);
    });*/

    let alfabeto = prompt('Ingresa el afabeto sin espacios');
    let numEstados = parseInt(prompt('Ingresa el numero de estados'));

    let tabla = [];
    for(let i=0; i<numEstados; i++){
        let trancisiones = prompt('Ingrese la transicion para el estado: ' + i);
        tabla.push(trancisiones);
    }

    let edosFinales = prompt('Ingrese los estados finales separados por espacios');

    return(alfabeto, numEstados, tabla, edosFinales);
    
}

function leerCadena(){
    return prompt('Ingrese la cadena a procesar');
}

function simularCadena(ADF, cadena){
    let estadoActual = 0;
    let traza=[];

    for(let i=0; i<cadena.length; i++){
        let simbolo = cadena[i];

        if(!simularCadena(simbolo)){
            console.log('Simbolo invalido: ' + ' no pertenece al alfabeto');
            return 0;
        }

        let indiceSimbolo = ADF.alfabeto.indexOf(simbolo);
        let TransicionesDeEstado = ADF.tabla[estadoActual];
    }

    simboloValido(c){
        return ADF.alfabeto.includes(c);
    }
}
