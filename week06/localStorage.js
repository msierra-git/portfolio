export function getLocalStorage(itemPK) {
   const entry = localStorage.getItem(itemPK);
   return JSON.parse(entry);
}


export function setLocalStorage(itemPK, itemData) {
   const entry = JSON.stringify(itemData);
   localStorage.setItem(itemPK, entry);
}


export function showLocalStorage() {
   let values = [],
      keys = Object.keys(localStorage),
      i = keys.length;
   while (i--) {
      values.push(localStorage.getItem(keys[i]));
   }
   return values;
}