import * as main from "./app5.js"
export function onLoad(type){
    
    let list;
    if (localStorage.getItem(type)){
        
        list =  JSON.parse(localStorage.getItem(type));
    }else{
        
        list = [];
    }
    main.setCommentList(list);
    // util.displayCurrent();
    
}

export function saveComments(type, commentList){
    localStorage.setItem(type, JSON.stringify(commentList));
  
}