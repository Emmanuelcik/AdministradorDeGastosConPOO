//Variables y selectores
const form = document.querySelector("#agregar-gasto");
const gastoListado = document.querySelector("#gastos ul");
let presupuesto;
//Eventos
eventListeners();
function eventListeners(){
    document.addEventListener("DOMContentLoaded", preguntarPresupuesto);
    form.addEventListener("submit", agregarGasto);
}
//Clases
class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }
    nuevoGasto(gasto){
        this.gastos = [...this.gastos, gasto];
        console.log(this.gastos);
    }
}
class Ui {
    insertarPresupuesto(cantidad){
        const {presupuesto, restante} = cantidad;
        const total = document.querySelector("#total");
        total.textContent = presupuesto;
        document.querySelector("#restante").textContent = restante;
    }

    impimirAlerta(mensaje, tipo){
        //Crear la alerta
        const alerta = document.createElement("div");
        alerta.classList.add("text-center", "alert");
        if(tipo === "error"){
            alerta.classList.add("alert-danger");
        }else if (tipo === "success"){
            alerta.classList.add("alert-success");
        }

        alerta.textContent = mensaje;

        //Insertar en el HTML
        const div = document.querySelector(".primario").insertBefore(alerta, form);

        setTimeout( ()=>{
            div.remove();
        },3000)

    }
}
//instanciar 
const ui = new Ui();
//Funciones

function preguntarPresupuesto() {
    const presupuestoUsuario = prompt("¿Cual es tu presupuesto?");
    if(presupuestoUsuario === "" || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0){
        window.location.reload();
    }
    presupuesto = new Presupuesto(presupuestoUsuario);
    ui.insertarPresupuesto(presupuesto);
}

function agregarGasto(e){
    e.preventDefault();

    //Leer los datos del formulario
    const nombre = document.querySelector("#gasto").value;
    const cantidad = Number(document.querySelector("#cantidad").value);


    if(nombre === "" || cantidad === ""){
        ui.impimirAlerta("Los campos son obligatorios", "error");
        return;
    }else if(cantidad <= 0 || isNaN(cantidad)){
        ui.impimirAlerta("Cantidad no valida", "error");
        return;
    }

    //Generar el objeto con el gasto
    const gasto = {
        nombre,
        cantidad,
        id: Date().now,
    }
    presupuesto.nuevoGasto(gasto);
    ui.impimirAlerta("Gasto Agregado", "success");
    form.reset();
}