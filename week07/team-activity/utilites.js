
import * as main from "./app5.js";
import * as comment from "./comment.js";

export function createComment() {
    console.log('inside createComment');
    let comments = main.getCommentList();
    let content = document.getElementById("commentEntry").value;

    if (content.length) {
        //create the object


        const newComment = {
            name: main.getCommentingOn(),
            comment: content,
            date: new Date()
        };
        console.log(newComment);
        comments.push(newComment);
        main.setCommentList(comments);

    }
    document.getElementById("commentEntry").value = ""; //reset the input box


}