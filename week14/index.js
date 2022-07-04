/*==========================================================
 *   Course Code:     WDD330 - Web Frontend Development II *
 *   Student Name:    A. Michael Sierra                    *
 *   Description:     Project 2 - Star Wars Team App       *
 *   Date:            June - July 2022                     *
 ==========================================================*/


import DataController from './DataController.js';
import * as ls from './ls.js';
import * as ut from './utilities.js'

let swData = "";
let teamIndex = 0;
const itemsOnPage = 5;
const numOfMembers = 3;


// Button to get teams from API
document.getElementById("btnFetch").addEventListener("click", function() {   
   console.log("API process started...");
   swData = new DataController("#swList","#teamDetails","#memberDetails","API");
   swData.init();
   teamIndex = 0;
   swData.setTeamCutOff(numOfMembers);
   swData.setItemsOnPage(itemsOnPage);
}, false);


// Button to get teams from LocalStorage
document.getElementById("btnLocal").addEventListener("click", function() {   
   console.log("Local storage process started...");
   swData = new DataController("#swList","#teamDetails","#memberDetails","Local Storage");
   swData.init();
   teamIndex = 0;
   swData.setTeamCutOff(numOfMembers);
   swData.setItemsOnPage(itemsOnPage);
}, false);


document.getElementById("btnNext").addEventListener("click", function() {     
   if (swData.getTeam().length > teamIndex) { teamIndex = teamIndex + itemsOnPage }; 
   swData.getSetOfTeams(teamIndex);
}, false);


document.getElementById("btnPrev").addEventListener("click", function() {     
   if (teamIndex > 0) { teamIndex = teamIndex - itemsOnPage }; 
   swData.getSetOfTeams(teamIndex);
}, false);





function sampleLSTeam() {
   let testTeamList = []; 
   // ls.clearLocalStorage(); // initialise localStorage
   let testVer = 7;
   let newId = getCustomTimeStamp(testVer);
   let newEntry = 'Custom 8';
   let newMembers = [40, 30, 20, 19, 22];
   
   let testTeam = {
      id: newId,
      team: newEntry,
      members: newMembers
   };
   testTeamList.push(testTeam );
   ls.setLocalStorage(newId, testTeam);
   console.log(ls.getLocalStorage(newId));
}

function getCustomTimeStamp(sec) {
   let custom = new Date();
   custom.setSeconds(custom.getSeconds() + sec);
   custom.toLocaleTimeString("en-us");
   return custom;
}

function getCurrentEntry(type) {
   if (type.toUpperCase() === 'FORM') {
      return ($('#txt_entryItem').val().length != 0 ?
         $('#txt_entryItem').val() :
         console.log("Input text field is empty!"));
   } else {
      return (type);
   }
}

for (var i = 0; i < localStorage.length; i++){
   console.log(localStorage.getItem(localStorage.key(i)));
}

// sampleLSTeam();
// localStorage.removeItem('Mon Jul 04 2022 19:39:29 GMT+1000 (Australian Eastern Standard Time)');
// console.log(localStorage);
