import * as dat from "./data.js" 
import * as utls from "./utils.js";

// added to main.js by M.Sierra
let myData = dat.getAllHikes();

// modified and added to main.js by M.Sierra
// on load grab the array and insert it into the page
window.addEventListener("load", () => {
   utls.showHikeList(myData);
});