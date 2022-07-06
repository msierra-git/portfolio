/*==========================================================
 *   Course Code:     WDD330 - Web Frontend Development II *
 *   Student Name:    A. Michael Sierra                    *
 *   Description:     Project 2 - Star Wars Team App       *
 *   Date:            June - July 2022                     *
 ==========================================================*/

 
export function getJSON(url) {
   return fetch(url)
      .then(function (response) {
         if (!response.ok) {
            throw Error(response.statusText);
         } else {
            return response.json();
         }
      })
      .catch(function (error) {
         console.log(error);
      });
}


export function toTitleCase(str) {
   return str.replace(
      /\w\S*/g,
      function (txt) {
         return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
   );
}


export function getCustomTimeStamp(sec) {
   let customID = new Date();
   customID.setSeconds(customID.getSeconds() + sec);
   customID.toLocaleTimeString("en-us");
   return customID;
}


export function getCurrentEntry(typeEntry, inputName) {
   if (typeEntry.toUpperCase() === 'FORM') {
      let txtEntry = document.getElementById(inputName);
      
      return (txtEntry.value.length != 0 ?
         txtEntry.value :
         console.log("Input text field is empty!"));
   } else {
      return (inputName);
   }
}


export function setEntrytoArray(newID, newTeam, newMembers) {
   let arrEntry = { id: newID, team: newTeam, members: newMembers };
   return arrEntry;
}


// sort LS object array by timestamp (from oldest to newest entries)
export function sortObjectList(arrList) {
   let sortedList = 
   arrList.sort(function (a, b) {
      var idA = new Date(a.id);
      var idB = new Date(b.id);
      // Compare the two dates
      if (idA < idB) return -1;
      if (idA > idB) return 1;
      return 0;
   });
   // arrList.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
   return sortedList;
}


export function removeItemFromList(arrayLS, teamID) {
   const remainingItem = arrayLS.filter((item) => {
      return !(item.id === teamID) ;
   });
   // console.log(remainingItem);
   return remainingItem;
}
