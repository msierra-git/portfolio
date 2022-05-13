/*==========================================================
 *   Course Code:     WDD330 - Web Frontend Development II *
 *   Student Name:    A. Michael Sierra                    *
 *   Description:     Simple To Do Tracking Application    *
 *   Date:            Week 06 - 2022                       *
 ==========================================================*/


/* 
1. Test the following for assigning values
   - get current timestamp and format in specific way
   - get new entry from form or supply testing values
   - assign values to array
   - add current array to object
   - add array to local storage
2. Test to add second entry then show its values 
3. Test to add third entry then show its values 
4. Test to update second entry
   - update local storage entry
   - remove entry from object list
*/

import * as ls from './localStorage.js';
import * as ut from './utilities.js';


// TEST #1
let testVer   = 0;
let newId = ut.getCustomTimeStamp(testVer);
let newEntry = ut.getCurrentEntry("form");         
let compDefault  = false;           // temp value for completed task
let todo = {};                      // array for new item to be added in the list of to do
let toDoList = [];                  // object for todo items where html list will be created from
ls.clearLocalStorage();             // initialise localStorage

todo = { id : newId, content: newEntry, completed: compDefault };
toDoList.push(todo);
ls.setLocalStorage(todo.id, todo);

// --> check TEST #1 results
console.log("<< Test #" + testVer + " >>");
console.log(todo);
console.log(toDoList);
console.log(localStorage.length);
console.log(ls.getLocalStorage(newId));
// assign localStorage record to variable
let curRec = ls.getLocalStorage(newId);
console.log("Current ID: " + curRec.id);
console.log("Current Text: " + curRec.content);
console.log("Current Complete: " + curRec.completed);



// TEST #2
testVer   = 2;
newId = ut.getCustomTimeStamp(testVer);
const staticID = newId;                         // to be used for update and filter
newEntry = ut.getCurrentEntry("test 2");         
todo = { id : newId, content: newEntry, completed: compDefault };
toDoList.push(todo);
ls.setLocalStorage(todo.id, todo);

// --> check TEST #2 results
console.log("<< Test #" + testVer + " >>");
console.log(todo);
console.log(toDoList);
console.log(localStorage.length);
console.log(ls.getLocalStorage(newId));
// assign localStorage record to variable
curRec = ls.getLocalStorage(newId);
console.log("Current ID: " + curRec.id);
console.log("Current Text: " + curRec.content);
console.log("Current Complete: " + curRec.completed);



// TEST #3
testVer   = 3;
newId = ut.getCustomTimeStamp(testVer);
newEntry = ut.getCurrentEntry("test 3");   
compDefault = true;      
todo = { id : newId, content: newEntry, completed: compDefault };
toDoList.push(todo);
ls.setLocalStorage(todo.id, todo);

// --> check TEST #3 results
console.log("<< Test #" + testVer + " >>");
console.log(todo);
console.log(toDoList);
console.log(localStorage.length);
console.log(ls.getLocalStorage(newId));
// assign localStorage record to variable
curRec = ls.getLocalStorage(newId);
console.log("Current ID: " + curRec.id);
console.log("Current Text: " + curRec.content);
console.log("Current Complete: " + curRec.completed);



// TEST #4
newEntry = ut.getCurrentEntry("test 2");   
todo = { id : staticID, content: newEntry, completed: compDefault };

var select = toDoList.filter( obj => {
   return !(obj.id === staticID)
})
console.log("filtered: ", select);

// --> update toDoList object by removing old entry and entring new value
toDoList = toDoList.filter(function(id) { return !(staticID in id)});
toDoList = select;
toDoList.push(todo);
ls.setLocalStorage(todo.id, todo);
console.log(localStorage.length);

// assign localStorage record to variable
curRec = ls.getLocalStorage(staticID);
console.log("Current ID: " + curRec.id);
console.log("Current Text: " + curRec.content);
console.log("Current Complete: " + curRec.completed);


// show final values of object and local storage
console.log(toDoList);
console.log(localStorage.length);
console.log(ls.showLocalStorage());