/*==========================================================
 *   Course Code:     WDD330 - Web Frontend Development II *
 *   Student Name:    A. Michael Sierra                    *
 *   Description:     Project 2 - Star Wars Team App       *
 *   Date:            June - July 2022                     *
 ==========================================================*/


import DataController from './DataController.js';

let swDataControl = "";
let teamIndex = 0;
let localTeamIndex = 0;
const itemsOnPage = 5;
const numOfMembers = 3;
const membersOnPage = 7;
const localTeamOnPage = 6;


// Button to get teams from API
document.getElementById("btnFetch").addEventListener("click", function() {   
   console.log("API process started...");
   swDataControl = 
      new DataController("#swList","#teamDetails","#memberDetails","API");
   commonSettings()
}, false);


// Button to get teams from LocalStorage
document.getElementById("btnLocal").addEventListener("click", function() {   
   console.log("Local storage process started...");
   swDataControl = 
      new DataController("#swList","#teamDetails","#memberDetails","Local Storage");
   commonSettings();
}, false);


// Data Navigation Button - NEXT
document.getElementById("btnNext").addEventListener("click", function() {     
   if (swDataControl.getTeam().length > teamIndex) { teamIndex = teamIndex + itemsOnPage }; 
   swDataControl.getSetOfTeams(teamIndex);
}, false);


// Data Navigation Button - PREVIOUS
document.getElementById("btnPrev").addEventListener("click", function() {     
   if (teamIndex > 0) { teamIndex = teamIndex - itemsOnPage }; 
   swDataControl.getSetOfTeams(teamIndex);
}, false);


// Button to show the management of custom teams
document.getElementById("btnManage").addEventListener("click", function() {
   console.log("Manage local team process started...");
   swDataControl = 
      new DataController("#manageLocalDiv","#teamDetails","#memberDetails","Manage LS");
   commonSettings();
   swDataControl.setItemsOnPage(membersOnPage);
}, false);


// Button to add new custom team to localStorage
document.getElementById("btnCreate").addEventListener("click", function() {
   addNewStarWarsTeamtoLS();
}, false);


document.getElementById("txtTeamName").addEventListener("keypress", function(event) {   
   if (event.key === 'Enter') {
      event.preventDefault();  
      addNewStarWarsTeamtoLS();
   }
}, false);


function addNewStarWarsTeamtoLS() {
   let actionResult = swDataControl.addLSStarWarsTeam('txtTeamName');
   if (actionResult === 'exist') {
      document.getElementById('txtTeamName').focus();
   }
   if (actionResult === 'added') {
      swDataControl.swDataView.refreshManageTeamDiv();
      console.log(actionResult);
   }
}


// Local Team Custom Page - API Navigation Button - NEXT2
document.getElementById("btnNextTeam").addEventListener("click", function() {    
   let curRecords = document.getElementById("itemCountTeam").innerText;
   if (curRecords.indexOf('1-', 0) == 0) { localTeamIndex = 0; }; 
   if (swDataControl.getLocalTeam().length > localTeamIndex) { 
      localTeamIndex = localTeamIndex + localTeamOnPage 
   }; 
   swDataControl.getSetOfTeams(localTeamIndex, true);
}, false);


// Local Team Custom Page - API Navigation Button - PREVIOUS
document.getElementById("btnPrevTeam").addEventListener("click", function() {   
   let curRecords = document.getElementById("itemCountTeam").innerText;
   if (curRecords.indexOf('1-', 0) == 0) { localTeamIndex = 0; }; 
   if (localTeamIndex > 0) { localTeamIndex = localTeamIndex - localTeamOnPage };
   swDataControl.getSetOfTeams(localTeamIndex, true);
}, false);


// Local Members Custom Page - API Navigation Button - NEXT2
document.getElementById("btnNext2").addEventListener("click", function() {    
   let curRecords = document.getElementById("itemCount2").innerText;
   if (curRecords.indexOf('1-', 0) == 0) { teamIndex = 0; }; 
   if (swDataControl.getMembers().length > teamIndex) { 
      teamIndex = teamIndex + membersOnPage 
   }; 
   swDataControl.getSetOfMembers(teamIndex);
}, false);


// Local Members Custom Page - API Navigation Button - PREVIOUS
document.getElementById("btnPrev2").addEventListener("click", function() {   
   let curRecords = document.getElementById("itemCount2").innerText;
   if (curRecords.indexOf('1-', 0) == 0) { teamIndex = 0; }; 
   if (teamIndex > 0) { teamIndex = teamIndex - membersOnPage };
   swDataControl.getSetOfMembers(teamIndex);
}, false);


// Common functions that are called on more than one buttons
function commonSettings() {
   swDataControl.init();
   teamIndex = 0;
   swDataControl.setTeamCutOff(numOfMembers);
   swDataControl.setItemsOnPage(itemsOnPage);
   swDataControl.setItemsOnPage(localTeamOnPage, true);
}


// Button to add new custom team to localStorage
document.getElementById("refreshPage").addEventListener("click", function() {
   swDataControl.restartSWApp();
   // window.history.go(0);
}, false);


// Common function for uploding list on page
// function commonRenderList(curIndex) {
//    let curRecords = document.getElementById("itemCount2").innerText;
//    if (curRecords.includes('1 of')) { teamIndex = 0; };
//    swDataController.getSetOfMembers(curIndex);
// }

//  other test codes for development process only
// function clearLocalStorage() {
//    (localStorage.length > 0 ? localStorage.clear() : console.log("localStorage is empty"));
// }

// console.log("Current LS data");
// for (var i = 0; i < localStorage.length; i++){
//    console.log(localStorage.getItem(localStorage.key(i)));
// }

// clearLocalStorage(); // initialise localStorage
// console.log(localStorage);
// localStorage.removeItem('2022-07-04T15:39:54.859Z');
