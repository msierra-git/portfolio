export function getCustomTimeStamp(sec) {
   let custom = new Date();
   custom.setSeconds(custom.getSeconds() + sec);
   custom.toLocaleTimeString("en-us");
   return custom;
}

export function getCurrentEntry(type) {
   if (type.toUpperCase() === 'FORM') {
      return ($('#txt_entryItem').val().length != 0 ?
         $('#txt_entryItem').val() :
         console.log("Input text field is empty!"));
   } else {
      return (type);
   }
}

export function removeItemOnce(arr, value) {
   console.log(value);
   var index = arr.id.indexOf(value);
   if (index > -1) {
      console.log("found " + value + " to delete.");
      arr.splice(index, 1);
   }
   return arr;
}