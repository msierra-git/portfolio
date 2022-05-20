import * as dat from "./data.js" 
import * as utls from "./utils.js";

let myData = dat.getAllHikes();

//on load grab the array and insert it into the page
window.addEventListener("load", () => {
   utls.showHikeList(myData);
});