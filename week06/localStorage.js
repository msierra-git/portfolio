export function getLocalStorage(recID) {
   const entry = localStorage.getItem(recID);
   return JSON.parse(entry);
}


export function setLocalStorage(recID, recValue) {
   const entry = JSON.stringify(recValue);
   localStorage.setItem(recID, entry);
}


export function showLocalStorage() {
   let recValues = [],
      recID = Object.keys(localStorage),
      record = recID.length;
   while (record--) {
      recValues.push(localStorage.getItem(recID[record]));
   }
   return recValues;
}


export function clearLocalStorage() {
   (localStorage.length > 0 ? localStorage.clear() : console.log("localStorage is empty"));
}