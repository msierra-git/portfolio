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

import * as ls from './ls.js';
import * as ut from './utilities.js';




// TEST #1
let testVer = 0;
let newId = ut.getCustomTimeStamp(testVer);
let newEntry = getCurrentEntry("form");
let compDefault = false; // temp value for completed task
let testToDo = {}; // array for new item to be added in the list of to do
let testToDoList = []; // object for testToDo items where html list will be created from
ls.clearLocalStorage(); // initialise localStorage

testToDo = {
   id: newId,
   content: newEntry,
   completed: compDefault
};
testToDoList.push(testToDo);
ls.setLocalStorage(testToDo .id, testToDo);

// --> check TEST #1 results
console.log("<< Test #" + testVer + " >>");
console.log(testToDo );
console.log(testToDoList);
console.log(localStorage.length);
console.log(ls.getLocalStorage(newId));
// assign localStorage record to variable
let curRec = ls.getLocalStorage(newId);
console.log("Current ID: " + curRec.id);
console.log("Current Text: " + curRec.content);
console.log("Current Complete: " + curRec.completed);



// TEST #2
testVer = 2;
newId = ut.getCustomTimeStamp(testVer);
const staticID = newId; // to be used for update and filter
newEntry = getCurrentEntry("test 2");
testToDo = {
   id: newId,
   content: newEntry,
   completed: compDefault
};
testToDoList.push(testToDo );
ls.setLocalStorage(testToDo .id, testToDo);

// --> check TEST #2 results
console.log("<< Test #" + testVer + " >>");
console.log(testToDo );
console.log(testToDoList);
console.log(localStorage.length);
console.log(ls.getLocalStorage(newId));
// assign localStorage record to variable
curRec = ls.getLocalStorage(newId);
console.log("Current ID: " + curRec.id);
console.log("Current Text: " + curRec.content);
console.log("Current Complete: " + curRec.completed);



// TEST #3
testVer = 3;
newId = ut.getCustomTimeStamp(testVer);
newEntry = getCurrentEntry("test 3");
compDefault = true;
testToDo = {
   id: newId,
   content: newEntry,
   completed: compDefault
};
testToDoList.push(testToDo );
ls.setLocalStorage(testToDo .id, testToDo);

// --> check TEST #3 results
console.log("<< Test #" + testVer + " >>");
console.log(testToDo );
console.log(testToDoList);
console.log(localStorage.length);
console.log(ls.getLocalStorage(newId));
// assign localStorage record to variable
curRec = ls.getLocalStorage(newId);
console.log("Current ID: " + curRec.id);
console.log("Current Text: " + curRec.content);
console.log("Current Complete: " + curRec.completed);



// TEST #4
newEntry = getCurrentEntry("test 2");
testToDo = {
   id: staticID,
   content: newEntry,
   completed: compDefault
};

var select = testToDoList.filter(obj => {
   return !(obj.id === staticID)
})
console.log("filtered: ", select);

// --> update testToDoList object by removing old entry and entring new value
testToDoList = testToDoList.filter(function (id) {
   return !(staticID in id)
});
testToDoList = select;
testToDoList.push(testToDo );
ls.setLocalStorage(testToDo.id, testToDo);
console.log(localStorage.length);


// assign localStorage record to variable
curRec = ls.getLocalStorage(staticID);
console.log("Current ID: " + curRec.id);
console.log("Current Text: " + curRec.content);
console.log("Current Complete: " + curRec.completed);


// show final values of object and local storage
console.log(testToDoList);
console.log(localStorage.length);
console.log(ls.showLocalStorage_toConsole());




function getCurrentEntry(type) {
   if (type.toUpperCase() === 'FORM') {
      return ($('#txt_entryItem').val().length != 0 ?
         $('#txt_entryItem').val() :
         console.log("Input text field is empty!"));
   } else {
      return (type);
   }
}

function removeItemOnce(arr, value) {
   console.log(value);
   var index = arr.id.indexOf(value);
   if (index > -1) {
      console.log("found " + value + " to delete.");
      arr.splice(index, 1);
   }
   return arr;
}


   // console.log(getCustomTimeStamp(0));
   // console.log(JSON.stringify(getCustomTimeStamp(0)));
   // let custom = new Date("2022-05-16T14:48:23.080Z");
   // custom.setSeconds(custom.getSeconds() + 0);
   // custom.toLocaleTimeString("en-us");
   // console.log(custom);