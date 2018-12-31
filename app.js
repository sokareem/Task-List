// Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');



//Load all event listeners
loadEventListeners();

//Load all event listeners
function loadEventListeners(){
  //DOM Load Event
  document.addEventListener('DOMContentLoaded', getTasks);
  //Add task event
  form.addEventListener('submit',addTask);

  // Remove task event
  taskList.addEventListener('click',removeTask);

  //Clear task event
  clearBtn.addEventListener('click',clearTasks);

  //Filter tasks event
  filter.addEventListener('keyup',filterTasks);
}

//Get Tasks from Local Storage
function getTasks(e){
  let tasks;
  //if local storage is empty
  if(localStorage.getItem('tasks') === null){
    // Make an array of tasks
    tasks = [];
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
      // Create li element
const li = document.createElement('li');
//Add element
li.className = 'collection-item';
//Create text node and append to li
li.appendChild(document.createTextNode(task));
//Create new link element
const link = document.createElement('a');
//Add class 
link.className = 'delete-item secondary-content';

// Add icon html
link.innerHTML = '<i class= "fa fa-remove"></i>';
//Append the link to li
li.appendChild(link);
// Append li to ul
taskList.appendChild(li);
  })
}// getTasks


// Add task
function addTask(e){
if(taskInput.value === ''){
  alert('Add a task');
}
else{
  // Create li element
const li = document.createElement('li');
//Add element
li.className = 'collection-item';
//Create text node and append to li
li.appendChild(document.createTextNode(taskInput.value));
//Create new link element
const link = document.createElement('a');
//Add class 
link.className = 'delete-item secondary-content';

// Add icon html
link.innerHTML = '<i class= "fa fa-remove"></i>';
//Append the link to li
li.appendChild(link);
// Append li to ul
taskList.appendChild(li);

// Store in Local Storage 
storeTaskInLocalStorage(taskInput.value);

//Clear input
taskInput.value = '';


//console.log(li);
}

  e.preventDefault();
}//Add task

//Store Task
function storeTaskInLocalStorage(task){
  let tasks;
  //if local storage is empty
  if(localStorage.getItem('tasks') === null){
    // Make an array of tasks
    tasks = [];
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove task
function removeTask(e){
  //focus target on icon by looking at parent element of classList
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm(`Are You Sure?`)){
      e.target.parentElement.parentElement.remove();

      // Remove from local storage 
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }

}//Remove Task

//Remove tasks from local storage
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  //if local storage is empty
  if(localStorage.getItem('tasks') === null){
    // Make an array of tasks
    tasks = [];
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index,1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear task
function clearTasks(e){
  //taskList.innerHTML = '';

  //OR 
  //faster function
  if(confirm(`Are you sure you want to clear`)){
    while(taskList.firstChild){
      taskList.removeChild(taskList.firstChild);
    }
  }


  // Clear from LS
  clearTasksFromLocalStorage();
}//clear tasks


//Clear Tasks from Local Storage
function clearTasksFromLocalStorage(){
  localStorage.clear();
}

//Filter Tasks
function filterTasks(e){
  // set the target element to lowercase text
  const text = e.target.value.toLowerCase();

  //query through ul
  document.querySelectorAll('.collection-item').forEach(
    function(task){
      const item = task.firstChild.textContent;
      //if item is present in the ul then display
      if(item.toLowerCase().indexOf(text) != -1){
        task.style.display = 'block';
      } else{
        task.style.display = 'none';
      }  
    });
}