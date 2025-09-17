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
        let transiciones = prompt('Ingrese la transicion para el estado: ' + i).split(' ');
        /*let transObj = {};
        transiciones.split(',').forEach(t => {
            let [simbolo, destino] = t.split(':');
            transObj[simbolo] = parseInt(destino);
        });*/
        //tabla.push(transObj);
        tabla.push(transiciones);
        //console.log(tabla[i]);
    }
    console.log('Tabla de transiciones');
    /*console.log('    |   a(0)   |   b(1)');
    for (let i = 0; i < tabla.length; i++) {
        let fila = `${i}   |   ${tabla[i][0]}      |   ${tabla[i][1]}`;
        console.log(fila);
    }*/
    
    let encabezado = '    |';
    alfabeto.forEach(simbolo => {
        encabezado += `  ${simbolo}(${alfabeto.indexOf(simbolo)})  |`;
    });
    console.log(encabezado);

    for (let i = 0; i < tabla.length; i++) {
        let fila = `${i}   |`;
        for (let j = 0; j < alfabeto.length; j++) {
            fila += `   ${tabla[i][j]}    |`;
        }
        console.log(fila);
    }
    
    let edosFinales = prompt('Ingrese los estados finales separados por espacios').split(' ').map(Number);

    AFD.alfabeto = alfabeto;
    AFD.numSimbolos = alfabeto.length;
    AFD.numEstados = numEstados;
    AFD.tabla = tabla;
    AFD.estadosFinales = edosFinales;   
    /*
    console.log('Datos de entrada');
    console.log(''+alfabeto);
    console.log(''+numEstados)
    for(let f=0; f<tabla.length; f++){
        console.log(''+tabla[f]);
    }
    console.group(''+edosFinales);*/
}

function simboloValido(c){
    return AFD.alfabeto.includes(c);
}

function leerCadena(){
    let cadena =  prompt('Ingrese la cadena a procesar');
    console.log('cadena: ' + cadena);
    return cadena;
}

let traza=[];
function simularCadena(AFD, cadena){
    let estadoActual = 0;
   console.log('Ejecucion paso a paso: ');
    let content = document.getElementById('resultado');
    let mensjeError =  document.createElement('p');
    mensjeError.style.fontSize = '20px';
    for(let i=0; i<cadena.length; i++){
        let simbolo = cadena[i];

        if(!simboloValido(simbolo)){
            console.log('simbolo fuera del alfabeto:  ' + simbolo);
           
            mensjeError.textContent = 'simbolo fuera del alfabeto:  ' + simbolo;
            content.appendChild(mensjeError);
            return 0;
        }

        let indiceSimbolo = AFD.alfabeto.indexOf(simbolo); //Busca la posiscion del simbolo
        //console.log('Indice del simbolo: ' + indiceSimbolo);

        let transicionesEstados = AFD.tabla[estadoActual];
        //console.log('Transiscinoes para estado '+ estadoActual +' : ' + transicionesEstados);
       
        if(!transicionesEstados || indiceSimbolo >= transicionesEstados.length){
            console.log("Transicion no definida para estado: " + estadoActual + "con simbolo: " + simbolo);
            let mensjeError = document.createElement('p');
            mensjeError.textContent = "Transicion no definida para estado: " + estadoActual + "con simbolo: " + simbolo;
            content.appendChild(mensjeError);
            return 0;
        }

        let siguienteEstado = transicionesEstados[indiceSimbolo];
        if(siguienteEstado === '#' || isNaN(siguienteEstado)){
            console.log("ERROR: transicion no definida para ( estado=<" + estadoActual + ">" + ", simbolo=<" + simbolo + ">");
            let mensjeError = document.createElement('p');
            mensjeError.textContent = "ERROR: transicion no definida para ( estado=<" + estadoActual + ">" + ", simbolo=<" + simbolo + ">";
            content.appendChild(mensjeError);
            return 0;
        }

        //traza.push([estadoActual, simbolo]);
        traza.push([estadoActual, indiceSimbolo, siguienteEstado]);

        console.log(' ( ' + estadoActual + ',' + indiceSimbolo + ' ) ' + ' --> ' + siguienteEstado);
        
        estadoActual = parseInt(siguienteEstado);

        //console.log("Estado acutual sisguiente: " + estadoActual);
        ///console.log([estadoActual, simbolo]);
  
    }
    //console.log(traza);
    console.log("Estado final: " + estadoActual);

    if (AFD.estadosFinales.includes(estadoActual)) {
        return 1;
    } else {
        return 0;
    }
}


function imprimirTraza(){
    //let salida = traza.map(par => `(${par[0]},${par[1]})`).join(',');
    let salida = traza.map(par => ` ((${par[0]},${par[1]}), ${par[2]})`).join(',');

    console.log('Traza: [' + salida + ']');

    const content =  document.getElementById('resultado');
    let mostrarResultado =  document.createElement('p');
    mostrarResultado.textContent = 'Traza: [' + salida + ']';
    mostrarResultado.style.fontSize = '25px';
    content.appendChild(mostrarResultado);

}

function main(){
    leerAutomata();
    let cadena = leerCadena();
    

    const content =  document.getElementById('resultado');
    let tituloResultado = document.createElement('h2');
    tituloResultado.textContent = 'Salida';
    tituloResultado.style.margin = '10px 10px 10px 0px';
    content.appendChild(tituloResultado);




    let resultado = simularCadena(AFD, cadena);
    let mensengeAcept = document.createElement('p');
    mensengeAcept.style.fontSize = '20px';
    mensengeAcept.margin = '20px';
    if(resultado == 1){

        console.log("\nAceptada");
        mensengeAcept.textContent = 'Aceptada';
        content.appendChild(mensengeAcept);

    }else{

        console.log("\nRechazada");
        mensengeAcept.textContent = 'Rechazada';
        content.appendChild(mensengeAcept);
    }

    imprimirTraza();
}



document.getElementById('btnProbar').addEventListener('click', (event)=>{
    event.preventDefault();
    traza =[];
    const content = document.getElementById('resultado').innerHTML="";
    
    main();
});
