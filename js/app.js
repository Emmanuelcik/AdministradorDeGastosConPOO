//Variables y selectores
const form = document.querySelector("#agregar-gasto");
const gastoListado = document.querySelector("#gastos ul");
let presupuesto;
//Eventos
eventListeners();
function eventListeners(){
    document.addEventListener("DOMContentLoaded", preguntarPresupuesto);
}
//Clases
class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
    }   
}
class Ui {

}

//Funciones

function preguntarPresupuesto() {
    const presupuestoUsuario = prompt("¿Cual es tu presupuesto?");
    if(presupuestoUsuario === "" || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0){
        window.location.reload();
    }
    presupuesto = new Presupuesto(presupuestoUsuario);
    console.log(presupuesto);
}