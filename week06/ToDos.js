import * as ls from './localStorage.js';

let timestamp = new Date();
timestamp.setSeconds(timestamp.getSeconds() + 0);
timestamp.toLocaleTimeString("en-us");
let itemLabel = "Test"; 
let itemComp  = false;
let todo = {}; // new item to be added in the list of to do
let toDoList = []; // array of todos where html list will be created from

localStorage.clear;


todo = { id : timestamp, content: itemLabel, completed: itemComp };
toDoList.push(todo);
ls.setLocalStorage(todo.id, todo);
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
console.log(todo);
console.log(toDoList);

// Search localStorage based on id
console.log(ls.getLocalStorage(timestamp2));
console.log(ls.getLocalStorage(timestamp));
console.log(ls.getLocalStorage(timestamp3));