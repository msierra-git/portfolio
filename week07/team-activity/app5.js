import Hikes from './hikes.js';
import * as ls from  './ls.js';
import * as util from "./utilites.js"
//on load grab the array and insert it into the page
const myHikes = new Hikes('hikes');
let commentList = [];
let commentingOn = "";

window.addEventListener('load', () => {
  ls.onLoad('hikes');
  myHikes.showHikeList();

});





export function getCommentList(){
  return commentList;
}
export function setCommentList(comments){
  commentList = comments;
  ls.saveComments("hikes", commentList);
}
export function getCommentingOn(){
  return commentingOn;
}
export function setCommentingOn(which){
  commentingOn = which;
  
}