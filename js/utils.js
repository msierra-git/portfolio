/*==========================================================
 *   Course Code:     WDD330 - Web Frontend Development II *
 *   Student Name:    A. Michael Sierra                    *
 *   Description:     Utilities Codes                      *
 *   Date:            2022                                 *
 ==========================================================*/


export function getLocalStorage(itemPK) {
   const entry = localStorage.getItem(itemPK);
   return JSON.parse(entry);
}


export function setLocalStorage(itemPK, itemData) {
   const entry = JSON.stringify(itemData);
   localStorage.setItem(itemPK, entry);
}


export function addError(elementID, message) {
   // Will show validation error message(s) on top of each other.
   $(elementID).append('<p>' + message + '</p>');
}


// Ensure that css for "error" and "invisible" class are defined!
export function removeError(elementID) {
   // Hide the error message area 
   $(elementID)
       .html('')
       .removeClass('error')
       .addClass('invisible');
}

