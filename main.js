//Variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 35;
let timerInicial = 35;
let tiempoRegresivoId = null;

//Apuntando a documento HTML
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restantes');


let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros);

//Funciones
function contarTiempo(){
    tiempoRegresivoId = setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML = `TIME: ${timer} SECONDS`;
        if(timer == 0){
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
        }   
     },1000);
}

function bloquearTarjetas(){
    for (let i = 0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="./images/${numeros[i]}.png" alt="">`;
        tarjetaBloqueada.disabled = true;
    }
}

//Funtion Principal
function destapar(id){

    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if(tarjetasDestapadas == 1){

        //Mostrar el primer numero
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = `<img src="./images/${primerResultado}.png" alt="">`;

        //Deshabilitar primer boton
        tarjeta1.disabled = true;
    } else if(tarjetasDestapadas == 2){

        // Mostrar segundo numero
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = `<img src="./images/${segundoResultado}.png" alt="">`;

        //Deshanilitar segundo boton
        tarjeta2.disabled = true;

        //Incrementar Movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `MOVEMENTS: ${movimientos}`;

        if(primerResultado == segundoResultado){

            //Encerar contador tarjetas destapadas
            tarjetasDestapadas = 0;

            //Aumentar Aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `SUCCESS: ${aciertos}`;

           //Frases que se muestran al finalizar el juego
            if(aciertos == 8){
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = `YOU GOT: ${aciertos} SUCCESSFUL!!`
                mostrarTiempo.innerHTML = `YOUR RECORD WAS: ${timerInicial - timer} SECONDS`
                mostrarMovimientos.innerHTML = `YOU APPLIED: ${movimientos} MOVEMENTS:`
            }

        } else{

            //Mostrar momentaneamente valores y volver a tapar
            setTimeout(()=>{
                tarjeta1.innerHTML = '';
                tarjeta2.innerHTML = '';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            },475);
        }
    }
}

function resetearJuego() {
    // Detener el temporizador si está activo
    clearInterval(tiempoRegresivoId);

    // Reiniciar variables
    tarjetasDestapadas = 0;
    tarjeta1 = null;
    tarjeta2 = null;
    primerResultado = null;
    segundoResultado = null;
    movimientos = 0;
    aciertos = 0;
    temporizador = false;
    timer = timerInicial;

    // Restablecer la visualización en HTML
    mostrarMovimientos.innerHTML = `MOVEMENTS: ${movimientos}`;
    mostrarAciertos.innerHTML = `SUCCESS: ${aciertos}`;
    mostrarTiempo.innerHTML = `TIME: ${timer} SECONDS`;

    // Barajear las cartas nuevamente
    numeros = numeros.sort(() => { return Math.random() - 0.5 });

    // Desbloquear todas las tarjetas y ocultar sus imágenes
    for (let i = 0; i <= 15; i++) {
        let tarjetaReset = document.getElementById(i);
        tarjetaReset.innerHTML = '';
        tarjetaReset.disabled = false;
    }
}

