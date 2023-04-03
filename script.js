let arrToDo = [];
let taskList = document.getElementById("taskList");
let taskInput = document.getElementById("taskInput")
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
    renderTaskList();
  }
}
let renderTaskList = () =>{
    taskList.innerHTML = "";
    arrToDo.forEach((tarea, index) => {
        const taskLi = document.createElement("li");
        if (tarea.completado) {
            taskLi.innerHTML = `<del>${tarea.nombre} (${tarea.tiempoCreacion.toLocaleString()} - ${tarea.tiempoCompletado.toLocaleString()})</del>`;
        } 
        else{
            taskLi.innerHTML = `${tarea.nombre} (${tarea.tiempoCreacion.toLocaleString()})`;
        }
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tarea.completado;
        checkbox.onchange = () => toggleTask(index);
        taskLi.insertBefore(checkbox, taskLi.firstChild);
        taskList.appendChild(taskLi);
    });
}
let toggleTask = (i) => {
    arrToDo[i].completado = !arrToDo[i].completado;
    arrToDo[i].tiempoCompletado = new Date();
    renderTaskList();
}