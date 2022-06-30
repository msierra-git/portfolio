import DataController from './DataController.js';
let swData = '';
let teamIndex = 0;
const itemsOnPage = 5;

document.getElementById("btnFetch").addEventListener("click", function() {   
   console.log("process started...");
   swData = new DataController("#swList");
   swData.init();
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

