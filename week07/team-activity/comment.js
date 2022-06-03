export default class Comment {
    constructor(name, content){
        this.name = name;
        this.content = content;
        this.date = new Date().getDate();
    }

    // set setCompleted(value){
    //     this.completed = value;
    // }
    // get getCompleted(){
    //     return this.completed;
    // }
}



// class Comment{
//     constructor(date, hikeName, content){
//         this.date = new Date().getDate;
//         this.name = hikeName;
//         this.content = content;


//     }

//     getName(){
//         return this.name;
//     }

//     getDate(){
//         return this.date;
//     }

//     getContent(){
//         return this.content;
//     }


// }