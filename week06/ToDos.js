const timestamp = new Date().toLocaleTimeString("en-us");
const itemLabel = "Test"; 
const itemComp  = false;
const todo = { id : timestamp, content: itemLabel, completed: itemComp };
const toDoList = [todo];

console.log(todo);
console.log(toDoList);