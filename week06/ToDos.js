/*==========================================================
 *   Course Code:     WDD330 - Web Frontend Development II *
 *   Student Name:    A. Michael Sierra                    *
 *   Project:         Simple To Do Tracking Application    *
 *   Date:            Week 06 - May 2022                   *
 ==========================================================*/

import {fromLocalStorage_toToDoList, showToDoList_toPage, 
        bindNewItemListener, bindFilterButtonListener, showCountForActiveTasks} 
        from './utilities.js';
import {showLocalStorage_toPage, clearLocalStorage} from './ls.js'; 

// clearLocalStorage(); // initialise localStorage

// copy local storage (ls) to toDoList object if ls is not empty
fromLocalStorage_toToDoList();

// list the task(s) on the page based on entries of the object array
showToDoList_toPage();

// list the task(s) on the page based on entries of the local storage
// showLocalStorage_toPage();

// add event listeners to the textbox and button for new entries
bindNewItemListener();

// add event listeners to the filter buttons as per scope
bindFilterButtonListener();

// set count of task in the page as per scope of this project
showCountForActiveTasks();