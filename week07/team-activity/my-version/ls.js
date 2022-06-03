/*==========================================================
 *   Course Code:     WDD330 - Web Frontend Development II *
 *   Student Name:    A. Michael Sierra                    *
 *   Filename:        ls.js                                *
 *   Description:     functions accessing and manipulating *
 *                    data inside localStorage             *
 *   Date:            Week 06 - May 2022                   *
 ==========================================================*/

 import {setCommentArray, showItem} from './utils.js';


 export function getLocalStorage(recID) {
    const entry = localStorage.getItem(recID);
    return JSON.parse(entry);
 }
 
 
 export function setLocalStorage(recID, recValue) {
    const entry = JSON.stringify(recValue);
    localStorage.setItem(recID, entry);
 }
 
 
 export function updateLocalStorage(recID, status) {
    let curRec = JSON.parse(localStorage.getItem(recID));   
    let updRec = { id:curRec.id, content:curRec.content, completed:status };
    setLocalStorage(recID, updRec);
 }
 
 
 export function removeLocalStorage(recID) {
    localStorage.removeItem(recID);
 }
 
 
 export function showLocalStorage_toPage() {
    let recID = Object.keys(localStorage);
    let record = recID.length;
 
    while (record--) {
       let curRec = getLocalStorage(recID[record]);
       let todo = setToDoArray(curRec.id, curRec.content, curRec.completed);
       showItem(todo);
    }
 }
 
 
 export function showLocalStorage_toConsole() {
    let recValues = [];
    let recID = Object.keys(localStorage);
    let record = recID.length;
    while (record--) {
       // recValues.push(localStorage.getItem(recID[record]));         
       let curRec = getLocalStorage(recID[record]);
       let todo = setToDoArray(curRec.id, curRec.content, curRec.completed);   
       recValues.push(todo);
    }
    return recValues;
 }
 
 
 export function clearLocalStorage() {
    (localStorage.length > 0 ? localStorage.clear() : console.log("localStorage is empty"));
 }