export function removeItemOnce(arr, value) {
   console.log(value);
   var index = arr.id.indexOf(value);
   if (index > -1) {
      console.log("found " + value + " to delete.");
      arr.splice(index, 1);
   }
   return arr;
}

