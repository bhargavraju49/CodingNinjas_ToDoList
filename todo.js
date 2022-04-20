(function(){
    let tasks = [];
const taskList = document.getElementById("list");
const addTaskInput = document.getElementById("add");
const tasksCounter = document.getElementById("tasks-counter");

async function fetchTodo(){
    //get req
    // fetch('https://jsonplaceholder.typicode.com/todos')  //return dummy promise
    // .then(function(response){
    //     console.log(response)
    //     return response.json();          // converting response to json returns another promise
    // })
    // .then(function(data){
    //     // fetched data
    //     tasks = data.slice(0,10);
    //     console.log(data)
    //     renderList();
    // })
    // .catch(function(error){
    //     console.log(error)
    // })
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        tasks = data.slice(0,10);
        renderList();
    }
    catch(error){
        console.log(error);
    }


}

function addTaskDom (task) {
    const li = document.createElement('li');

    li.innerHTML = '<input type="checkbox" id="'+task.id+'" data-id="'+task.id+'" class="custom-checkbox"><label for="'+task.id+'">'+task.title+'</label><img src="trash-can-solid.svg" class="delete" data-id="'+task.id+'" />';
    taskList.append(li);
}

function renderList() {
    taskList.innerHTML = '';
    for (let i = 0 ; i< tasks.length ; i++)
    {
        addTaskDom(tasks[i]);
    };

    tasksCounter.innerHTML = tasks.length;
}

function toggleTask(taskId) {
    const task = tasks.filter(function(task){
        return task.id === Number(taskId)
    })


    if (task.length > 0) {
        const currentTask = task[0];
        currentTask.completed = !currentTask.completed;
        showNotification("toggle completed")
    }
    else{
        showNotification("Could not toggle the task")
    }
    
}

function deleteTask(taskId) {
    const newTasks = tasks.filter(function(task){
        return task.id !== Number(taskId)
    })

    tasks = newTasks
    renderList();
    showNotification("Task deleted sucessfully");
}

function addTask(task) {
  if (task) {
    tasks.push(task);
    renderList();
    showNotification("Task added sucessfully");
  }
  else {
    showNotification("Task cannot be added");

  }
}

function showNotification(text) {
    alert(text);
}

function handleInputKeypress(e) {
    console.log(e.key)
  if (e.key === "Enter") {
    const text = e.target.value;

    if (!text || text.length === 0) {
      showNotification("Task can not be empty");
    }
    else {
        const task = {
            title: text,
            id: Date.now().toString(),
            completed: false
          };
      
          e.target.value = "";
          addTask(task);
    }

    
  }
}

function handleClickListner(e) {
    const target = e.target;
    
    if (target.className === 'delete'){
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;
    }
    else if (target.className === 'custom-checkbox'){
        const taskId = target.id;
        toggleTask(taskId);
        return;
    }
}


function initialiseApp() {
    fetchTodo();
    addTaskInput.addEventListener("keyup", handleInputKeypress);
    document.addEventListener('click',handleClickListner);
}

initialiseApp();
})()