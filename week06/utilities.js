/*==========================================================
 *   Course Code:     WDD330 - Web Frontend Development II *
 *   Student Name:    A. Michael Sierra                    *
 *   Filename:        utilities.js                         *
 *   Description:     utility functions to:                *
 *                    > access and manipulate array        *
 *                    > access and manipulate object       *
 *                    > show list of tasks on webpage      *
 *                    > manipulate tasks on webpage        *
 *                    > bind eventlisteners to elements    *
 *   Date:            Week 06 - May 2022                   *
 ==========================================================*/


import { setLocalStorage, updateLocalStorage, 
         removeLocalStorage, showLocalStorage_toConsole } 
from './ls.js';
let toDoList = [];


// copy local storage into object array
export function fromLocalStorage_toToDoList() {
   if (localStorage.length > 0) {
      // copy records from local storage to object array
      toDoList = showLocalStorage_toConsole();
      // console.log(toDoList);
      // console.log(localStorage);
   }
}


// show object array into page (ul-li)
export function showToDoList_toPage() {
   // sort object entries before showing to page
   sortToDoList();
   // traverse through the array
   toDoList.forEach(function (arrayItem) {
      const todo = setToDoArray(arrayItem.id, 
                                arrayItem.content, 
                                arrayItem.completed);
      // call function to show array to the page      
      showItem(todo);
  });
}


// show current array to webpage and bind listeners
export function showItem(todo) {
   // create list elements with checkbox, label and button
   let todoItems  = document.getElementById('ul_listItems');
   let todoItem   = document.createElement('li');
   let todoDiv    = document.createElement('div');
   let todoCheck  = document.createElement('input');
   let todoLabel  = document.createElement('label');
   let todoButton = document.createElement('button');

   // assign attributes and values to element
   todoCheck.type = 'checkbox';
   todoCheck.id = todo.id;
   todoCheck.checked = todo.completed;
   todoLabel.innerHTML = todo.content;
   todoButton.className = 'btn';
   todoButton.innerHTML = 'X';
   if (todo.completed === true) {
      todoLabel.setAttribute('class', 'completed_item');
   }

   // organise and append elements together
   todoItem.appendChild(todoDiv);
   todoDiv.appendChild(todoCheck);
   todoCheck.after(todoLabel);
   todoLabel.after(todoButton);
   todoItems.appendChild(todoItem);

   // add listener to current item's checkbox
   bindItemCheckboxListener(todoItem);

   // add listener to current item's "x" or delete button
   bindItemButtonListener(todoItem);
}


// sort object array by timestamp 
// (from oldest to newest entries)
export function sortToDoList() {
   toDoList.sort(function (a, b) {
      var idA = new Date(a.id);
      var idB = new Date(b.id);
      // Compare the two dates
      if (idA < idB) return -1;
      if (idA > idB) return 1;
      return 0;
   });
}


// put values to an array in the required format 
export function setToDoArray(key, entry, status) {
   const todo = 
      { id: key, content: entry, completed: status };
   return todo;
}


// show the count of the ACTIVE tasks on webpage
// as per required in the project description
export function showCountForActiveTasks(caller) {
   // get all items that have 'false' value in completed
   const actItems = toDoList.filter((item) => !item.completed);
   const activeCount = actItems.length;

   // display result on the webpage
   const filterName 
      = "<br><font color='gray'>(" + caller + ")</font>";

   document.querySelector('#spn_countItems').innerHTML =
      // (activeCount < 0 ? 0 : activeCount) + 
      activeCount +
      (activeCount > 1 ? " tasks left" : " task left");
}


// bind listener to the botton where user input the new task
// and to textbox when enter key is hit
export function bindNewItemListener() {
   const addBtn = document.querySelector('#btn_addItem');
   addBtn.addEventListener('click', function (event) {
      event.preventDefault();
      const txtbox = document.getElementById('txt_entryItem');
      addNewItem(txtbox);
   }, false);

   const addEnter = document.getElementById('txt_entryItem');
   addEnter.addEventListener('keypress', function (event) {      
      if (event.key === 'Enter') {
         event.preventDefault();      
         addNewItem(this);
      }
   }, false);
}


// add event listeners to the filter buttons on the page
export function bindFilterButtonListener() {   
   // add click listener to "ALL" button
   bindAllButtonListener();      
   // add click listener to "Active" button   
   bindActiveButtonListener();  
   // add click listener to "Completed" button    
   bindCompletedButtonListener();   
}



// ------------------------------------------------ //
// --> LOCAL FUNCTIONS used within this file only
// ------------------------------------------------ //


// generate new id based on the current timestamp
function getCustomTimeStamp(sec) {
   let custom = new Date();
   custom.setSeconds(custom.getSeconds() + sec);
   custom.toLocaleTimeString("en-us");
   return custom;
}


// add user's entry into the task list
function addNewItem(item) {
   // get user's entry for creating an array
   const entry = getUserEntry(item);
   if (typeof entry === 'undefined') {
      console.log("User entry is " + entry);
   } else {
      // format timestamp before uploading array  
      // into localStorage and object
      let localID1 = JSON.stringify(getCustomTimeStamp(0));
      let localID2 = JSON.parse(localID1);
      let todo = setToDoArray(localID2, entry, false);

      // add entry to the object array
      addItemToDoList(todo);  
      // add entry to the local storage            
      setLocalStorage(todo.id, todo);  
      // add entry to the bottom of the list   
      showItem(todo);      
      // refresh count on page               
      showCountForActiveTasks();  
      // clear the textbox, ready for another entry        
      resetUserEntry(item);               
   }
}


// mark item as completed or active
function setItemStatus(item, status) {
   const itemID = item.querySelector('input[type=checkbox]').id;
   // add or remove class/strike-out on task based on status
   (status) ?
      item.querySelector('label')
         .classList.add("completed_item")   :
      item.querySelector('label')
         .classList.remove("completed_item");
   
   // update value completed key in toDoList object array
   updateToDOList(itemID, status);
   // update value completed key in local storage
   updateLocalStorage(itemID, status);
   // refresh the count on webpage   
   // setItemCount();
   showCountForActiveTasks();
}



// remove item from the list
function setItemDeleted(item) {
   // confirm for deletion of entry
   let myParent = item.parentElement;
   let confirmDelete =
      confirm("Do you really want to delete the task: '" +
         myParent.querySelector('label').innerHTML + "' ?");

   if (confirmDelete) {
      // get checkbox id value
      const itemID = 
         myParent.querySelector('input[type=checkbox]').id;
      // remove the item from the webpage... 
      // refreshing webpage will remove the item too
      myParent.classList.add("deleted_item");
      // delete item from toDOList object
      removeItemToDoList(itemID);
      // delete item from local storage
      removeLocalStorage(itemID);
      // refresh the count on webpage
      // setItemCount();
      showCountForActiveTasks();
   }
}


// add new item in the object array
function addItemToDoList(todo) {
   toDoList.push(todo);
   // console.log('Adding item to List');
   // console.log(toDoList);
}


// update value of item in object array
function updateToDOList(itemID, status) {
   let strID = JSON.stringify(itemID);
   strID = JSON.parse(strID);
   let objIndex = toDoList.findIndex((obj => obj.id == strID));

   (objIndex > -1) ? 
      toDoList[objIndex].completed = status :
      console.log("Error in updating To Do list");
      console.log(toDoList);
   // console.log('Updating item from List');
   // console.log(toDoList[objIndex]);
}


// remove item from object array
function removeItemToDoList(itemID) {
   const remainingItem = toDoList.filter((item) => {
      return !(item.id === itemID) ;
   });
   toDoList = remainingItem;
   // console.log('Removing item from List');
   // console.log(remainingItem);
}


// show all tasks on the page
function filterShowAllItems() {
   let ulElem = document.getElementById('ul_listItems');
   let liElem = ulElem.children;

   // traverse to all the li elements on the page
   for (let i = 0; i < liElem.length; i++) {
      // clear all filter class on li element
      liElem[i].classList.remove('hide_item');
   }
   // refresh the count on webpage
   // setItemCount();
   showCountForActiveTasks();
}


// show active (not completed) tasks only on the page
function filterShowActiveItems() {
   let ulElem = document.getElementById('ul_listItems');
   let liElem = ulElem.children;
   
   for (let i = 0; i < liElem.length; i++) {
      // get current checkbox state 
      let status = 
         liElem[i].querySelector('input[type=checkbox]').checked;

      if (status) {
         liElem[i].classList.add('hide_item');
      } else {
         liElem[i].classList.remove('hide_item');
      }      
   }
   // refresh the count on webpage
   // setItemCount();
   showCountForActiveTasks('Active');
}


// show completed tasks only on the page
function filterShowCompleteItems() {
   let ulElem = document.getElementById('ul_listItems');
   let liElem = ulElem.children;
   
   for (let i = 0; i < liElem.length; i++) {
      // get current checkbox state 
      let status = 
         liElem[i].querySelector('input[type=checkbox]').checked;

      if (status) {
         liElem[i].classList.remove('hide_item');
      } else {
         liElem[i].classList.add('hide_item');
      }      
   }
   // refresh the count on webpage
   // setItemCount();
   const filterName = "<font color='gray'>(Completed)</font>";
   document.querySelector('#spn_countItems').innerHTML = 
      "0 task left" + "<br>";
}


// get the user's entry from the input textbox
function getUserEntry(item) {
   return (item.value.length != 0 ? item.value :
      alert("Input text field is empty!"));
}


// clear the input textbox
function resetUserEntry(item) {   
   item.value = '';
   item.focus();
}


// adding event listener to the item's checkbox
function bindItemCheckboxListener(element) {
   element.addEventListener('change', function (event) {
      const status = 
         this.querySelector('input[type=checkbox]').checked;
      setItemStatus(this, status);
   }, false);
}


// adding event listener to the item's delete button
function bindItemButtonListener(element) {
   element.querySelector('button')
      .addEventListener('click', function (event) {
         setItemDeleted(this);
   }, false);
}


// adding event listener to the "ALL" filter button
function bindAllButtonListener() {
   document.getElementById('btn_allItems')
      .addEventListener('click', function(event) {
         event.preventDefault();
         filterShowAllItems();
   }, false);
}


// adding event listener to the "Active" filter button
function bindActiveButtonListener() {   
   document.getElementById('btn_activeItems')
      .addEventListener('click', function(event) {
         event.preventDefault();
         filterShowActiveItems();
   }, false);
}


// adding event listener to the "Completed" filter button
function bindCompletedButtonListener() {
   document.getElementById('btn_completeItems')
      .addEventListener('click', function(event) {
         event.preventDefault();
         filterShowCompleteItems();
   }, false);   
}




// --> Disabled functions... 
// export function addToDoListeners() {
//    const li = document.querySelectorAll('li');
//
//    for (let i = 0; i < li.length; i++) {
//       li[i].addEventListener('change', function (event) {
//          // event.preventDefault();
//          this.querySelector('input[type=checkbox]').checked ?
//             setItemCompleted(this) : setItemActive(this);
//       });
//
//       li[i].querySelector('button')
//          .addEventListener('click', function (event) {
//             setItemDeleted(this);
//       });
//    }
// }

// // mark item as completed
// function setItemCompleted(item) {
//    // let itemID = new Date(item.querySelector('input[type=checkbox]').id);
//    const itemID = item.querySelector('input[type=checkbox]').id;
//    // add class to strike-out label for completed task
//    item.querySelector('label').classList.add("completed_item");
//    // update value completed key to 'true' in toDoList object array
//    updateToDOList(itemID, true);
//    // update value completed key to 'true' in local storage
//    updateLocalStorage(itemID, true);
//    // refresh the count on webpage
//    setItemCount();
// }

// // mark item as active or open
// function setItemActive(item) {
//    // let itemID = new Date(item.querySelector('input[type=checkbox]').id);
//    const itemID = item.querySelector('input[type=checkbox]').id;
//    // remove strike-out from the label by removing the class
//    item.querySelector('label').classList.remove("completed_item");
//    // update value completed key to 'false' in toDoList object array
//    updateToDOList(itemID, false);
//    // update value completed key to 'false' in local storage
//    updateLocalStorage(itemID, false);
//    // refresh the count on webpage
//    setItemCount();
// }

// // find item from object array
// function getItemToDoList(itemID) {
//    toDoList.filter(function (id) {
//       return (itemID in id)
//    });
// }

// export function setItemCount() {
//    const totalItems = document.querySelectorAll('li').length;
//    const compItems  = document.querySelectorAll('input[type="checkbox"]:checked').length;
//    let   delItems   = document.querySelectorAll('#ul_listItems .deleted_item').length;
//    let   hideItems  = document.querySelectorAll('#ul_listItems .hide_item').length;
//    (delItems > (totalItems - compItems)) ? delItems = 0 : delItems = delItems;
//    (hideItems > (totalItems - compItems - delItems)) ? hideItems = 0 : hideItems = delItems;
//    const leftItems  = totalItems - compItems - delItems - hideItems;
//    document.querySelector('#spn_countItems').innerHTML =
//       (leftItems < 0 ? 0 : leftItems) + 
//       (leftItems > 1 ? " tasks left" : " task left");
// }