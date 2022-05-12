import * as ls from './localStorage.js';
import * as ut from './utilities.js';

function setTodo() {
   let timestamp = new Date();
   timestamp.setSeconds(timestamp.getSeconds() + 0);
   timestamp.toLocaleTimeString("en-us");
   let itemLabel = "Test"; 
   let itemComp  = false;
}

let timestamp = new Date();
timestamp.setSeconds(timestamp.getSeconds() + 0);
timestamp.toLocaleTimeString("en-us");
let itemLabel = "Test"; 
let itemComp  = false;
let todo = {}; // array for new item to be added in the list of to do
let toDoList = []; // object for todo items where html list will be created from
localStorage.clear(); // clearing localStorage 
// localStorage
console.log(localStorage.length);

todo = { id : timestamp, content: itemLabel, completed: itemComp };
toDoList.push(todo);
ls.setLocalStorage(todo.id, todo);
console.log(localStorage.length);
console.log(todo);
console.log(toDoList);

let timestamp2 = new Date();
timestamp2.setSeconds(timestamp2.getSeconds() + 1);
timestamp2.toLocaleTimeString("en-us");
itemLabel = "Test2"; 
itemComp  = false;
todo = { id : timestamp2, content: itemLabel, completed: itemComp };
toDoList.push(todo);
ls.setLocalStorage(todo.id, todo);
console.log(localStorage.length);
console.log(todo);
console.log(toDoList);

let timestamp3 = new Date();
timestamp3.setSeconds(timestamp3.getSeconds() + 4);
timestamp3.toLocaleTimeString("en-us");
itemLabel = "Test3"; 
itemComp  = true;
todo = { id : timestamp3, content: itemLabel, completed: itemComp };
toDoList.push(todo);
ls.setLocalStorage(todo.id, todo);
console.log(localStorage.length);
console.log(todo);
console.log(toDoList);

// Search localStorage based on id
console.log(ls.getLocalStorage(timestamp2));
console.log(ls.getLocalStorage(timestamp));
console.log(ls.getLocalStorage(timestamp3));
console.log(toDoList);

// update
itemComp  = true;
itemLabel = "Test2"; 
todo = { id : timestamp2, content: itemLabel, completed: itemComp };
var select = toDoList.filter( obj => {
   return !(obj.id === timestamp2)
})
console.log("filtered: ", select);
// toDoList = toDoList.filter(function(id) { return !(timestamp2 in id)});

toDoList = select;
toDoList.push(todo);
ls.setLocalStorage(todo.id, todo);
console.log(localStorage.length);

const data2 = ls.getLocalStorage(timestamp2);
console.log(data2.content);
console.log(data2.id);
console.log(data2.completed);
console.log(toDoList);
console.log(localStorage.length);

console.log(ls.showLocalStorage());