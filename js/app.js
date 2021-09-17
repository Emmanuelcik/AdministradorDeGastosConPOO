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
        this.calcularRestante();
    }
    calcularRestante(){
        const gastado = this.gastos.reduce( (total, gasto)=> total + gasto.cantidad, 0); 
        this.restante = this.presupuesto - gastado;
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
        const validar = document.querySelector(".validar");
        if(validar){
            validar.remove();
        }
        const alerta = document.createElement("div");
        alerta.classList.add("text-center", "alert", "validar");
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
        },3000);

    }
    agregarGastoListado(gastos){
        this.limpiarHTML();//Limpia HTML PREVIO
        //iterar sobre los gastos
        gastos.forEach( (gasto)=>{
            const {cantidad, nombre, id} = gasto;

            //Crear un Li
            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between aligns-items-center";
            li.dataset.id = id;
            li.innerHTML = `
                ${nombre} <span class="badge badge-primary badge-pill">$ ${cantidad} </span>
            `;

            //Agregar boton
            const btn = document.createElement("button");
            btn.innerHTML = "Borrar &times";
            btn.classList.add("btn", "btn-danger", "borrar-gasto");
            li.append(btn);

            //Agregar al HTML
            gastoListado.append(li);
        } );
    }
    limpiarHTML() {
        while(gastoListado.firstChild){
            gastoListado.remove(gastoListado.firstChild);
        }
    }
    actualizarRestante(restante){
        document.querySelector("#restante").textContent = restante;
    }
    comprobarPresupuesto(presupuestoOBJ){
        const {presupuesto, restante} = presupuestoOBJ;
        const restanteDiv = document.querySelector(".restante");
        //Comprobar 25%
        if( (presupuesto/4) > restante){
            restanteDiv.classList.remove("alert-success", "alert-warning");
            restanteDiv.classList.add("alert-danger");
        }else if((presupuesto / 2) > restante){
            restanteDiv.classList.remove("alert-success", "alert-danger");
            restanteDiv.classList.add("alert-warning");
        }

        //Si el total es menor a 0
        if(restante <= 0 ){
            ui.impimirAlerta("El presupuesto se ha agotado", "error");
            form.querySelector("button[type='submit'").disabled = true;
        }
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
    //Imprimir los gastos
    const {gastos, restante} = presupuesto;

    ui.agregarGastoListado(gastos);
    ui.actualizarRestante(restante);
    console.log(presupuesto);
    ui.comprobarPresupuesto(presupuesto);//Mandamos toda la instancia
    form.reset();
}
