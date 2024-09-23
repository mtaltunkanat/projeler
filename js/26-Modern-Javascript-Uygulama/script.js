const textInputDOM = document.getElementById("todo-input");
const btnAddTodoDOM = document.getElementById("add-todo");
const todosDOM = document.querySelector("#todos");
const btnClearDOM = document.querySelector("#clear");

class Storage {
  static addTodoStorage(todoArr) {
    let storage = localStorage.setItem("todo", JSON.stringify(todoArr));
    return storage;
  }
  //! bu sayfa oop uygulamadan modern javascript e uyarlanmıştır
  
  static getStorage() {
    let storage = localStorage.getItem("todo") === null
      ? []
      : JSON.parse(localStorage.getItem("todo"));
    return storage;
  }
}

let todoArr = Storage.getStorage()

/* const {...rest} = todoArr; //rest sol spread sağ anlamazsan boşver
console.log(rest);
 */

btnAddTodoDOM.addEventListener("click", (e) => {
  e.preventDefault();
  let id = todoArr.length + 1;
  let title = textInputDOM.value;
  const todo = new Todo(id, title); // rest ile bunları alabilirdik
  todoArr = [...todoArr, todo]; //? spread operatörü kullanılıyor arrayleri birleştiriyoruz
  console.log(todoArr);
  //todoArr.push(todo);
  todoArr.reverse();// listeyi tersine çevirmekte kullanıldı
  UI.alert("Todo Eklendi!");
  UI.clearInput();
  UI.displayTodos();
  //* add to local storage
  Storage.addTodoStorage(todoArr);
})

class Todo {
  constructor(id, title) {
    this.id = id;
    this.title = title;
  }
}

class UI {

  static displayTodos() { //her bir elemanı döndüren method
    let result = "";

    if (todoArr.length === 0) {
      todosDOM.innerHTML = "Liste Boş!";
    } else {

      todoArr.map((item) => { //map yada find yazarsak döner yada forEach yazarsak döner dediğim çalışır anlamında
        result += `
     <li class="flex justify-between border border-2 px-4 py-3
 flex items-center justify-between font-bold">

     <span>${item.title}</span>
     <Button class="text-red-400 remove"data-id="${item.id}">sil</Button>
 </li>
     `;
      });

      todosDOM.innerHTML = result;
    }
  }
 
  static clearInput() {
    textInputDOM.value = "";
  }

  static removeTodo() {
    todosDOM.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove")) {
        e.target.parentElement.remove();
        let btnId = e.target.dataset.id;
        UI.removeArrayTodo(btnId);
      }
    });
  }

  static removeArrayTodo(id) {
    todoArr = todoArr.filter((item) => item.id !== +id); //elemanların id sini seçiyor silinecek olanların seçtiklerimiz dışındaki idleri geri gönderiyormuş yazının yanındaki "sil" yazısı
    Storage.addTodoStorage(todoArr);
    UI.displayTodos();
    UI.alert("Todo Silindi!")
  }

  static clearTodos() {
    btnClearDOM.addEventListener("click", () => {
      todoArr = [];
      Storage.addTodoStorage(todoArr);
      UI.displayTodos();
      UI.alert("Liste Temizlendi!")
    })
  }

  static alert(text) {
    window.alert(text);
  }
}



window.addEventListener("DOMContentLoaded", () => {
  UI.displayTodos();
  UI.removeTodo();
  UI.clearTodos();
})















//! old project
/* textInputDOM.addEventListener("change", function(event){
 textInputValue = event.target.value;
 
});

btnAddTodoDOM.addEventListener("click", addTodo);
btnClearDOM.addEventListener("click", clearTodos);

function addTodo(e){
 e.preventDefault();
  todos.unshift({ id: todos.length + 1, todoTitle: textInputValue});
  textInputDOM.value="";
  displayTodos();
}

function displayTodos(){
 let result ="";

 if(todos.length === 0){
     todosDOM.innerHTML = "Liste Boş!";
 }else{
  
 todos.forEach((item) =>{
     result +=`
     <li class="flex justify-between border border-2 px-4 py-3
 flex items-center justify-between font-bold">

     <span>${item.todoTitle}</span>
     <Button class="text-red-400" onclick="deleteTodo(${item.id})">sil</Button>
 </li>
     `;
 });

 todosDOM.innerHTML = result;   
 }
}

function deleteTodo(id){
let deletedId;

for( let index in todos){
if(todos[index].id == id){
 deletedId = index;
 }

}

todos.splice(deletedId, 1);
displayTodos();
}
 
function clearTodos(){
 todos.splice(0, todos.length);
 displayTodos();
}
displayTodos(); */

