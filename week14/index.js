/*==========================================================
 *   Course Code:     WDD330 - Web Frontend Development II *
 *   Student Name:    A. Michael Sierra                    *
 *   Description:     Project 2 - Star Wars Team App       *
 *   Date:            June - July 2022                     *
 ==========================================================*/


import DataController from './DataController.js';

let swData = "";
let teamIndex = 0;
const itemsOnPage = 5;
const numOfMembers = 3;


// Button to get teams from API
document.getElementById("btnFetch").addEventListener("click", function() {   
   console.log("API process started...");
   swData = new DataController("#swList","#teamDetails","#memberDetails","API");
   commonSettings()
}, false);


// Button to get teams from LocalStorage
document.getElementById("btnLocal").addEventListener("click", function() {   
   console.log("Local storage process started...");
   swData = new DataController("#swList","#teamDetails","#memberDetails","Local Storage");
   commonSettings();
}, false);


// Data Navigation Button - NEXT
document.getElementById("btnNext").addEventListener("click", function() {     
   if (swData.getTeam().length > teamIndex) { teamIndex = teamIndex + itemsOnPage }; 
   swData.getSetOfTeams(teamIndex);
}, false);


// Data Navigation Button - PREVIOUS
document.getElementById("btnPrev").addEventListener("click", function() {     
   if (teamIndex > 0) { teamIndex = teamIndex - itemsOnPage }; 
   swData.getSetOfTeams(teamIndex);
}, false);


// Button to show the management of custom teams
document.getElementById("btnManage").addEventListener("click", function() {
   console.log("Manage local team process started...");
   swData = new DataController("#manageLocalDiv","#teamDetails","#memberDetails","Manage LS");
   commonSettings();
}, false);


// Button to add new custom team to localStorage
document.getElementById("btnCreate").addEventListener("click", function() {
   swData.addLSStarWarsTeam('txtTeamName');
}, false);


// Common functions that are called on more than one buttons
function commonSettings() {
   swData.init();
   teamIndex = 0;
   swData.setTeamCutOff(numOfMembers);
   swData.setItemsOnPage(itemsOnPage);
}


// // Manual Test Data for LS record creations
// function enterLSTeam(testVer, arrMembers) {
//    let newID = util.getCustomTimeStamp(testVer);
//    let newEntry = `Custom Manual ${testVer}`;
   
//    let arrTeam = {
//       id: newID,
//       team: newEntry,
//       members: arrMembers
//    };
   
//    // let testTeamList = [];    
//    // testTeamList.push(arrTeam);
//    swData.swLocal.setLocalStorageByID(newID, arrTeam);
// }





//  other codes for development process only
function clearLocalStorage() {
   (localStorage.length > 0 ? localStorage.clear() : console.log("localStorage is empty"));
}

console.log("Current LS data");
for (var i = 0; i < localStorage.length; i++){
   console.log(localStorage.getItem(localStorage.key(i)));
}

// clearLocalStorage(); // initialise localStorage
// localStorage.removeItem('Mon Jul 04 2022 19:39:29 GMT+1000 (Australian Eastern Standard Time)');
// console.log(localStorage);
