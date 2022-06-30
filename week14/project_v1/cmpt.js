/*==========================================================
 *   Course Code:     WDD330 - Web Frontend Development II *
 *   Student Name:    A. Michael Sierra                    *
 *   Project:         Church Meeting Program Tool (CMPT)   *
 *   Date:            Week 14 - July 2022                  *
 ==========================================================*/

import {
        fromLocalStorage_toCmpList,
        showCmpList_toPage,
        bindNewItemListener,
        bindFilterButtonListener,
        showCountForFutureProgram
}
from './utilities.js';
import {
        showLocalStorage_toPage,
        clearLocalStorage
} from './ls.js';

// clearLocalStorage(); // initialise localStorage and to reset ls

// copy local storage (ls) to toDoList object if ls is not empty
fromLocalStorage_toCmpList();

// list the task(s) on the page based on entries of the object array
showCmpList_toPage();

// list the task(s) on the page based on entries of the local storage
// showLocalStorage_toPage();

// add event listeners to the textbox and button for new entries
bindNewItemListener();

// add event listeners to the filter buttons as per scope
bindFilterButtonListener();

// set count of task in the page as per scope of this project
showCountForFutureProgram();



