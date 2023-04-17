let arrToDo = [];
let taskList = document.getElementById("taskList");
let taskInput = document.getElementById("taskInput");



function enviarForm(evento){
    evento.preventDefault();
    agregarTarea();
}
document.getElementById("formTareas").addEventListener("submit", enviarForm);


function agregarTarea() {
  if (taskInput.value !== "") {
    const tarea = {
      nombre: taskInput.value,
      tiempoCreacion: new Date(),
      completado: false,
      tiempoCompletado: null
    };
    arrToDo.push(tarea);
    taskInput.value = "";
    mostrarTaskList();
  }
}
let mostrarTaskList = () =>{
    taskList.innerHTML = "";
    arrToDo.forEach((tarea, index) => {
        const taskLi = document.createElement("li");
        if (tarea.completado) {
            taskLi.innerHTML = ` <del>${tarea.nombre}</del>`;
        } 
        else{
            taskLi.innerHTML = ` ${tarea.nombre}`;
        }
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tarea.completado;
        checkbox.onchange = () => cambiarCompletado(index);
        taskLi.insertBefore(checkbox, taskLi.firstChild);
        
        const botonBorrar = document.createElement("button");
        botonBorrar.innerText = "Borrar";
        botonBorrar.onclick = () => deleteTask(index);

        const botonEditar = document.createElement("button");
        botonEditar.innerText = "Editar";
        botonEditar.onclick = () => editTask(index);
        
        
        taskLi.appendChild(botonBorrar);
        taskLi.appendChild(botonEditar);
        taskList.appendChild(taskLi);
    });
}
let cambiarCompletado = (i) => {
    if(arrToDo[i].completado == false){
        arrToDo[i].tiempoCompletado = new Date();   
    } else{
        arrToDo[i].tiempoCompletado = null;
    }
    arrToDo[i].completado = !arrToDo[i].completado;
    mostrarTaskList();
}
function calculateFastest(){
    let nombre = "Ninguna de las tareas fue completada";
    let mDif = -1;
    arrToDo.forEach((tarea) => {
        if(tarea.completado){
            aDif = tarea.tiempoCompletado - tarea.completado;
            if(aDif < mDif || mDif == -1){
                mDif = aDif;
                nombre = tarea.nombre;
            }
        }
    });
    tareaRapida = document.getElementById("fastestTask");
    tareaRapida.innerHTML = nombre;
}
let deleteTask = (index) => {
    arrToDo.splice(index, 1);
    mostrarTaskList();
}
let editTask = (index) => {
    let newName = prompt("Enter new task name:"); 
    if(newName != null){
        arrToDo[index].nombre = newName;
        mostrarTaskList();
    }
}

let borrarTodo=()=>{
    arrToDo = [];
    tareaRapida = document.getElementById("fastestTask");
    tareaRapida.innerHTML = "";
    mostrarTaskList();
   
}


