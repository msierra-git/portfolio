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


document.getElementById("btnFetch").addEventListener("click", function() {   
   console.log("process started...");
   swData = new DataController("#swList","#teamDetails","#memberDetails");
   swData.init();
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