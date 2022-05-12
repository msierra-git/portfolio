

export function getLocalStorage(itemPK) {
   const entry = localStorage.getItem(itemPK);
   return JSON.parse(entry);
}


export function setLocalStorage(itemPK, itemData) {
   const entry = JSON.stringify(itemData);
   localStorage.setItem(itemPK, entry);
}