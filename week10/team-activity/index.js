import QuakesController from './QuakesController.js';

document.getElementById("btnLocation").addEventListener("click", function() {   
   console.log("process started...");
   let qc = new QuakesController("#quakeList", null, 2000);
   qc.init();
}, false);
