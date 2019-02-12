/***********
 * Obtener elementos DOM necesarios
 *
 *
 */
const txtId = document.getElementById('Id');
const txtName = document.getElementById('Tarea');
const ddAssignee = document.getElementById('Assignee');
const cbDone = document.getElementById('cbDone');
const btnCreate = document.getElementById('btnCreate');
let table = document.querySelector('table');
let today;
let tasks;

/** Verificar si localStorage tiene datos y crear tabla en dado caso */
if (localStorage.length > 0) {
  //GenerateTable();
}
GenerateId();
GenerateTable();

/************
 * Funciones principales
 *
 * Funcion para el boton */
document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();

  if (txtName.value === '' || txtName.value.length > 100) {
    alert('Task name must have more than 0 and less than 100 characters');
  } else {
    DelayButton();
    /**Capturo los datos en variables */
    let status = cbDone.checked ? 'Done' : 'Pending';
    today = new Date();
    var taskDate =
      today.toDateString() +
      ' ' +
      today.getHours().toString() +
      ':' +
      today.getMinutes().toString();
    var taskId = txtId.value;
    var taskName = txtName.value;
    var taskAssignee = ddAssignee.value;
    var taskStatus = status;

    saveInLocalStorage(taskId, taskName, taskAssignee, taskStatus, taskDate);

    GenerateId();
    /**Limpiar inputs */
    ClearInputs();
    GenerateTable(true);
  }
});

function createDeleteFunction() {
  //console.log(document.getElementsByClassName('link'));
  document.getElementById('tasks-table').addEventListener('click', function(e) {
    e.preventDefault();

    if (e.target.parentElement.classList.contains('link')) {
      let tasks = getTasksFromLocalStorage();
      const fila = e.target.parentElement.parentElement.parentElement;
      //console.log(fila);
      fila.remove();

      let taskId = fila.children[0].textContent.toString().trim();
      let taskIndex;

      tasks.forEach(item => {
        if (item.id === taskId) {
          //console.log(item.id, taskId, tasks.indexOf(item));
          taskIndex = tasks.indexOf(item);
        }
      });
      //console.log(tasks[taskIndex]);
      tasks.splice(taskIndex, 1);
      //console.log(taskId, taskIndex);
      localStorage.clear();
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  });
}

/**Generar tabla MI */

function GenerateTable(isCreated) {
  const tasksList = getTasksFromLocalStorage();
  let tasksTable = document.querySelector('#tasks-table');
  let tasksTableBody = tasksTable.children[1];

  //console.log(tasksTableBody);

  if (
    tasksTableBody.children[0].textContent !== '--' &&
    tasksList.length !== 0
  ) {
    console.log(tasksTableBody.children[0]);

    createDeleteFunction();
    if (isCreated) {
      tasksTableBodyArray = Array.from(tasksTableBody.children);
      //console.log(tasksTableBody);
      tasksTableBodyArray.forEach(item => {
        item.remove();
      });
    } else {
      tasksTableBody.children[0].remove();
    }
  } else {
    console.log(tasksList);
    tasksTableBody.innerHTML = `<tr><td>--</td><td>--</td><td>--</td><td>--</td><td>--</td></tr>`;
  }

  let totalRows = tasksList.length;
  for (let i = 0; i < totalRows; i++) {
    let task = tasksList[i];
    // Creates rows
    let fila = document.createElement('tr');
    fila.innerHTML = `<td><a class ="link"><i class ="fa fa-trash fa-sm"></i></a>${
      task.id
    }</td>
                       <td>${task.name}</td>
                       <td>${task.assignee}</td>
                       <td>${task.status}</td>
                       <td>${task.date}</td>`;
    //console.log(tasksTableBody);
    tasksTableBody.appendChild(fila);
    //console.log(tasksTableBody);
  }
  tasksTable.appendChild(tasksTableBody);
}

/**Buscar por nombre */
document.querySelector('#search').addEventListener('keyup', function(e) {
  e.preventDefault();

  let tasks = getTasksFromLocalStorage();
  function isName(element) {
    const nameSearch = document.querySelector('#search').value;
    return element.name.includes(nameSearch);
  }

  let result = tasks.filter(isName);
  //console.log(result);
  //debugger;
  GenerateTable();
});

/**Sort by date */
function SortByCreationDate() {
  const ids = JSON.parse(localStorage.getItem('ids'));
}

/***********
 * Funciones complementarias
 *
 *
// * Generar los ids para las tareas */
function GenerateId() {
  today = new Date();
  var randomId =
    Math.floor(Math.random() * 20 + 1) +
    today.getSeconds() +
    '-' +
    today.getFullYear() +
    '-' +
    today.getMilliseconds();
  txtId.value = randomId;
}

function saveInLocalStorage(id, name, assignee, stat, date) {
  let newTask;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  newTask = {
    id: id,
    name: name,
    assignee: assignee,
    status: stat,
    date: date,
  };
  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  //console.log(tasks);
  return tasks;
}

/**PAra limpiar valores de los inputs */
function ClearInputs() {
  txtName.value = '';
  cbDone.removeAttribute('checked');
}

/** */

/**************
 * Otros
 */

function DelayButton() {
  const submitButton = document.querySelector('#btnCreate');
  submitButton.disabled = true;
  submitButton.textContent = 'Wait...';
  setTimeout(function() {
    submitButton.disabled = false;
    submitButton.textContent = 'Create task';
  }, 2000);
}
