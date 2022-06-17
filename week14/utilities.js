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
 *   Date:            Week 14 - July 2022                   *
 ==========================================================*/


import { setLocalStorage, updateLocalStorage, 
         removeLocalStorage, showLocalStorage_toConsole } 
from './ls.js';


// global variables within this file only
const maxNumOfChars = 30;
const txtEntry = document.getElementById('txt_entryItem');
let cmpList = [];


// copy local storage into object array
export function fromLocalStorage_toCmpList() {
   if (localStorage.length > 0) {
      // copy records from local storage to object array
      cmpList = showLocalStorage_toConsole();
      // console.log(toDoList);
      // console.log(localStorage);
   }
}


// show object array into page (ul-li)
export function showCmpList_toPage() {
   // sort object entries before showing to page
   sortCmpList();
   // traverse through the array
   cmpList.forEach(function (arrayItem) {
      const cmp = setCmpArray(arrayItem.id, 
                                arrayItem.content, 
                                arrayItem.completed);
      // call function to show array to the page      
      showItem(cmp);
  });
}


// show current array to webpage and bind listeners
export function showItem(cmp) {
   // create list elements with checkbox, label and button
   let cmpItems  = document.getElementById('ul_listItems');
   let cmpItem   = document.createElement('li');
   // optional div container for 3 elements
   // let todoDiv    = document.createElement('div'); 
   let cmpCheck  = document.createElement('input');
   let cmpLabel  = document.createElement('label');
   let cmpButton = document.createElement('button');

   // assign attributes and values to element
   cmpCheck.type = 'checkbox';
   cmpCheck.id = cmp.id;
   cmpCheck.checked = cmp.completed;
   cmpLabel.innerHTML = cmp.content;
   cmpButton.className = 'btn';
   cmpButton.innerHTML = 'X';
   if (cmp.completed === true) {
      cmpLabel.setAttribute('class', 'past_item');
   }

   // --> if using the optional div container
   // todoItem.appendChild(todoDiv);      
   // todoDiv.appendChild(todoCheck);
   // --> end of optional container

   // organise and append elements together
   cmpItem.appendChild(cmpCheck);
   cmpCheck.after(cmpLabel);
   cmpLabel.after(cmpButton);
   cmpItems.appendChild(cmpItem);

   // add listener to current item's checkbox
   bindItemCheckboxListener(cmpItem);

   // add listener to current item's "x" or delete button
   bindItemButtonListener(cmpItem);
}


// sort object array by timestamp 
// (from oldest to newest entries)
export function sortCmpList() {
   cmpList.sort(function (a, b) {
      var idA = new Date(a.id);
      var idB = new Date(b.id);
      // Compare the two dates
      if (idA < idB) return -1;
      if (idA > idB) return 1;
      return 0;
   });
}


// put values to an array in the required format 
export function setCmpArray(key, entry, status) {
   const cmp = 
      { id: key, content: entry, completed: status };
   return cmp;
}


// show the count of the ACTIVE tasks on webpage
// as per required in the project description
export function showCountForFutureProgram(caller) {
   // get all items that have 'false' value in completed
   const actItems = cmpList.filter((item) => !item.completed);
   const activeCount = actItems.length;

   // display result on the webpage
   const filterName 
      = "<br><font color='gray'>(" + caller + ")</font>";

   document.querySelector('#spn_countItems').innerHTML =
      // (activeCount < 0 ? 0 : activeCount) + 
      activeCount +
      (activeCount > 1 ? " future programs" : " future program");
}


// bind listener to the botton where user input the new task
// and to textbox when enter key is hit
export function bindNewItemListener() {
   const addBtn = document.querySelector('#btn_addItem');
   addBtn.addEventListener('click', function (event) {
      event.preventDefault();
      // const txtbox = document.getElementById('txt_entryItem');
      addNewItem(txtEntry);
   }, false);

   // const addEnter = document.getElementById('txt_entryItem');
   txtEntry.addEventListener('keypress', function (event) {      
      if (event.key === 'Enter') {
         event.preventDefault();      
         addNewItem(this);
      }
   }, false);

   txtEntry.addEventListener('input', function() {
      countInputCharacters('count');
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
      let cmp = setCmpArray(localID2, entry, false);

      // add entry to the object array
      addItemCmpList(cmp);  
      // add entry to the local storage            
      setLocalStorage(cmp.id, cmp);  
      // add entry to the bottom of the list   
      showItem(cmp);      
      // refresh count on page               
      showCountForFutureProgram();  
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
         .classList.add("past_item")   :
      item.querySelector('label')
         .classList.remove("past_item");
   
   // update value completed key in toDoList object array
   updateCmpList(itemID, status);
   // update value completed key in local storage
   updateLocalStorage(itemID, status);
   // refresh the count on webpage   
   // setItemCount();
   showCountForFutureProgram();
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
      removeItemCmpList(itemID);
      // delete item from local storage
      removeLocalStorage(itemID);
      // refresh the count on webpage
      // setItemCount();
      showCountForActiveTasks();
   }
}


// add new item in the object array
function addItemCmpList(cmp) {
   cmpList.push(cmp);
   // console.log('Adding item to List');
   // console.log(toDoList);
}


// update value of item in object array
function updateCmpList(itemID, status) {
   let strID = JSON.stringify(itemID);
   strID = JSON.parse(strID);
   let objIndex = cmpList.findIndex((obj => obj.id == strID));

   (objIndex > -1) ? 
      cmpList[objIndex].completed = status :
      console.log("Error in updating To Do list");
      console.log(cmpList);
   // console.log('Updating item from List');
   // console.log(toDoList[objIndex]);
}


// remove item from object array
function removeItemCmpList(itemID) {
   const remainingItem = cmpList.filter((item) => {
      return !(item.id === itemID) ;
   });
   cmpList = remainingItem;
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
   showCountForFutureProgram();
}


// show active (not completed) tasks only on the page
function filterShowFutureProgram() {
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
   showCountForFutureProgram('Active');
}


// show completed tasks only on the page
function filterShowPastProgram() {
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
   const filterName = "<font color='gray'>(Past Program)</font>";
   document.querySelector('#spn_countItems').innerHTML = 
      "0 task left" + "<br>";
}


// get the user's entry from the input textbox
function getUserEntry(item) {
   return (item.value.length != 0 ? 
      item.value.substring(0, maxNumOfChars) :
      alert("Input text field is empty!"));
}


// clear the input textbox
function resetUserEntry(item) {   
   item.value = '';
   item.focus();
   countInputCharacters('reset');
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
   document.getElementById('btn_pastItems')
      .addEventListener('click', function(event) {
         event.preventDefault();
         filterShowPastProgram();
   }, false);
}


// adding event listener to the "Completed" filter button
function bindCompletedButtonListener() {
   document.getElementById('btn_futureItems')
      .addEventListener('click', function(event) {
         event.preventDefault();
         filterShowFutureProgram();
   }, false);   
}


// additional feature to limit and count the number of 
// characters on NEW to do item/task
function countInputCharacters(action) {
   // let textInput = document.getElementById("txt_entryItem");
   let charCounter = document.getElementById("char_count");
   let numOfEnteredChars = txtEntry.value.length;
   let counter = 0;
   (action === 'reset') ? 
      counter = 30 : counter = maxNumOfChars - numOfEnteredChars;
      charCounter.textContent = counter + " characters left";
   
   if (counter < 0) {
      charCounter.style.color = "red";
   } else if (counter < 10) {
      charCounter.style.color = "orange";
   } else {
      charCounter.style.color = "lightgray";
   }
};



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