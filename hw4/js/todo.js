var TASKCOUNT = 0;

function changeIcon(element, icon, oldColor, newColor){
  element.innerHTML = ""+ icon;
  element.classList.remove(oldColor);
  element.classList.add(newColor);
}

function prependElement(task, listId) {
  var tasklist = document.getElementById(listId);
  var firstChild = tasklist.childNodes[0];
  tasklist.insertBefore(task, firstChild); // inserting before all older tasks
}

function saveTask() {
  // add the value of the input field to the todolist
  var todo = document.getElementById("taskField");

  // if there's the text field is empty, do nothing
  if (todo.value === "") {
    return;
  }
  console.log("adding new task: " + todo.value);
  // todolist = document.getElementById("todolist");

  // create a task element
  var task = document.createElement("DIV");
  task.classList.add("task");
  task.classList.add("draggable-element");
  TASKCOUNT +=1;
  task.id = "task"+TASKCOUNT;

  /*jshint multistr: true */
  task.innerHTML = '<div class="row">\
  <span class="col s1"><i class="material-icons left">drag_handle</i></span>\
  <div class="col s10">' + todo.value + '</div>\
  <div class="col s1"> \
    <a class="btn btn-floating green" onclick="taskComplete(this);"><i class="material-icons right">done</i></a>\
  </div>\
  </div>\
  <div class="divider"></div>';
  // var divider = document.createElement("DIV");
  // divider.classList.add("divider");

  // insert task into document
  prependElement(task, "todolist");
  // tasklist.insertBefore(divider, firstChild);
  todo.value=""; // resetting the form
  $('.draggable-element').arrangeable();
}

function taskComplete(a){
  // alert(this);
  var iconElem = a.firstChild;
  changeIcon(iconElem, "undo", "green", "red");

  var taskElement = a.parentElement.parentElement.parentElement;
  a.onclick = function(){
    // console.log("testing");
    changeIcon(iconElem, "done", "red", "green"); // change icon
    iconElem.parentElement.setAttribute("onclick", "javascript:taskComplete(this)");
    prependElement(taskElement, "todolist");
  };

  // var doneTasks = document.getElementById("donelist");
  // doneTasks.appendChild(taskElement);
  prependElement(taskElement, "donelist");
}
