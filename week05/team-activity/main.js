import {getAllHikes} from "./data.js" 
import {showHikeList} from "./utils.js";

// added to main.js by M.Sierra
let myData = getAllHikes();

// modified and added to main.js by M.Sierra
// on load grab the array and insert it into the page
window.addEventListener("load", () => {
   showHikeList(myData);
});