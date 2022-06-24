import QuakesController from './QuakesController.js';

document.getElementById("btnLocation").addEventListener("click", function() {   
   console.log("process started...");
   let qRadius = document.getElementById("quakeRadius").value;
   let qc = new QuakesController("#quakeList", null, qRadius);
   qc.init();
}, false);
