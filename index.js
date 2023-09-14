console.log('aa gya me');



// add new  tasks in todo database
function createTodo() {
  const title = document.getElementById("title");
  const description = document.getElementById("description");

  if (title.value && description.value) {
    fetch(`http://localhost:5000/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title.value,
        description: description.value,
      }),
    })
      .then((res) => res.json())
      .then((newTodo) => {
        console.log("Todo Created ✅");
        makeTodoCard(newTodo);

        // clear title and description on successful creation
        title.value = "";
        description.value = "";
      });
  } else {
    alert("Title and description are required");
  }
}


// update  todos
function editTodo(id) {
  const newTitle = prompt("Enter new title");
  const newDescription = prompt("Enter new description");

  if (newTitle || newTitle) {
    const updated = {};

    if (newTitle) {
      updated.title = newTitle;
    }

    if (newDescription) {
      updated.description = newDescription;
    }
     
    updated.id = id;
    fetch(`http://localhost:5000/todos/:id`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updated),
    })
      .then((res) => res.json())
      .then((updatedTodo) => {
        console.log(id);
        updateTodoInDom(updatedTodo);
      });
  } else {
    alert("One of Title, description is required");
  }
}


// get all todos and showing on  display
function parseResponce(todos){
  todos.forEach((todo) => {
    makeTodoCard(todo);
  });
  }

function callBack(resp){
   resp.json().then(parseResponce);
}

function getTodos() {
fetch(`http://localhost:5000/todos`, {
 method: "GET",
}).then(callBack)
}


// delete todos

function deleteTodo(id) {

  const value = {
  id: id
  }
  fetch(`http://localhost:5000/todos/:id`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  })
    .then((res) => res.json())
    .then(() => {
      console.log("Todo Deleted ✅");
      deleteTodoFromDom(id);
    });
}

// function getTodos() {
//   const todoList = document.getElementById("todo-list");
//   // Clear todos to remove any stale data
//   todoList.innerHTML = "";

//   fetch(`http://localhost:5000/todos`, {
//     method: "GET",
//   })
//     .then((res) => res.json())
//     .then((todos) => {
//       console.log(todos)
//     });
// }

// Create Todo Card and Append it to div with class todo-list
function makeTodoCard({ title, description, id }) {
  // create div with todo-item class
  const todoItem = document.createElement("div");
  todoItem.classList.add("todo-item");
  todoItem.id = id;

  // create title and description <span> elements
  const todoItemTitle = document.createElement("span");
  const todoItemDescription = document.createElement("span");

  // add classes to title and description <span> elements
  todoItemTitle.classList.add("todo-item-title");
  todoItemDescription.classList.add("todo-item-description");

  // Add value to title and description <span> elements
  todoItemTitle.innerText = title;
  todoItemDescription.innerText = description;

  const todoItemActions = document.createElement("div");
  todoItemActions.classList.add("todo-item-actions");

  // create Edit button and add the class and text
  const todoEdit = document.createElement("button");
  todoEdit.classList.add("todo-edit");
  todoEdit.innerText = "Edit";

  // add click listener to Edit Button
  todoEdit.addEventListener("click", () => editTodo(id));

  // create Delete button and add the class and text
  const todoDelete = document.createElement("button");
  todoDelete.classList.add("todo-delete");
  todoDelete.innerText = "Delete";

  // add click listener to Delete Button
  todoDelete.addEventListener("click", () => deleteTodo(id));

  // append (push) to respective nodes
  todoItemActions.appendChild(todoEdit);
  todoItemActions.appendChild(todoDelete);

  todoItem.appendChild(todoItemTitle);
  todoItem.appendChild(todoItemDescription);
  todoItem.appendChild(todoItemActions);

  // push todo-item to todo-list
  const todoList = document.getElementById("todo-list");
  todoList.appendChild(todoItem);
}


function updateTodoInDom({ id, title, description }) {
  // identify the deleted to with id ( which is set in makeTodoCard )
  const todoItem = document.getElementById(id);

  // update title
  const todoItemTitle = todoItem.querySelector("span.todo-item-title");
  todoItemTitle.innerText = title;

  // update description
  const todoItemDescription = todoItem.querySelector(
    "span.todo-item-description"
  );
  todoItemDescription.innerText = description;
}


function deleteTodoFromDom(id) {
  // identify the deleted to with id ( which is set in makeTodoCard )
  const todoItem = document.getElementById(id);

  // get the todo list
  const todoList = document.getElementById("todo-list");

  // remove the respective todo
  todoList.removeChild(todoItem);
}
