/*==========================================================
 *   Course Code:     WDD330 - Web Frontend Development II *
 *   Student Name:    A. Michael Sierra                    *
 *   Description:     Project 2 - Star Wars Team App       *
 *   Date:            June - July 2022                     *
 ==========================================================*/

// import {setCmpArray, showItem} from './utilities.js';

// Local Team Model (using localStorage)
export default class LocalTeam {
   constructor() {
      this.arrTeam = [];
      this.recID = Object.keys(localStorage);
   }


   getLocalTeamAllInfo() {
      let records = this.recID.length;
      while (records--) {
         let curRec = this.getLocalStorageByID(this.recID[records]);
         let tempTeam = {
            id: curRec.id,
            team: curRec.team,
            members: curRec.members
         };
         // console.log(tempTeam);
         this.arrTeam.push(tempTeam);
      }
      // console.log(this.arrTeam);
      return this.arrTeam;
   }


   getLocalTeamNames() {
      return this.arrTeam.map(a => a.team).sort();
   }

   // getLocalTeamNameByID(teamID) {
   //    this.arrTeam.filter(obj => {
   //       return obj.id == this._team[teamName]
   //    });
   // }


   getLocalTeamMembersByName(teamName) {
      // get the members allocated to this custom team from LS
      let tempTeamRec = this.arrTeam.filter(obj => {
         return obj.team == teamName
      });
      return (tempTeamRec.length > 0) ? tempTeamRec[0].members: null;
   }


   getLocalStorageByID(recID) {
      const entry = localStorage.getItem(recID);
      return JSON.parse(entry);
   }


   setLocalStorageByID(recID, recValue) {
      const entry = JSON.stringify(recValue);
      localStorage.setItem(recID, entry);
   }


   removeLocalStorageByID(recID) {
      localStorage.removeItem(recID);
   }


   updateLocalStorageByID(recID, teamName, teamMembers) {
      //  Need to include updating of all fields inside
      let curRec = JSON.parse(localStorage.getItem(recID));
      let updRec = {
         id: curRec.id,
         team: teamName,
         members: teamMembers
      };
      setLocalStorageByID(recID, updRec);
   }
}

// export function getLocalStorage(recID) {
//    const entry = localStorage.getItem(recID);
//    return JSON.parse(entry);
// }

// export function setLocalStorage(recID, recValue) {
//    const entry = JSON.stringify(recValue);
//    localStorage.setItem(recID, entry);
// }


// export function updateLocalStorage(recID, status) {
//    //  Need to include updating of all fields inside
//    let curRec = JSON.parse(localStorage.getItem(recID));
//    let updRec = {
//       id: curRec.id,
//       content: curRec.content,
//       completed: status
//    };
//    setLocalStorage(recID, updRec);
// }


// export function removeLocalStorage(recID) {
//    localStorage.removeItem(recID);
// }


// export function showLocalStorage_toPage() {
//    let recID = Object.keys(localStorage);
//    let record = recID.length;

//    while (record--) {
//       let curRec = getLocalStorage(recID[record]);
//       let cmp = setCmpArray(curRec.id, curRec.content, curRec.completed);
//       showItem(cmp);
//    }
// }


// export function showLocalStorage_toConsole() {
//    let recValues = [];
//    let recID = Object.keys(localStorage);
//    let record = recID.length;
//    while (record--) {
//       // recValues.push(localStorage.getItem(recID[record]));         
//       let curRec = getLocalStorage(recID[record]);
//       let cmp = setTeamArray(curRec.id, curRec.team, curRec.members);
//       recValues.push(cmp);
//    }
//    return recValues;
// }

// export function getLocalStorage_toArray() {
//    let arrTeam = [];
//    let recID = Object.keys(localStorage);
//    let records = recID.length;
//    while (records--) {
//       // recValues.push(localStorage.getItem(recID[record]));         
//       let curRec = getLocalStorage(recID[records]);
//       let lsTeam = { id: curRec.id, team: curRec.team, members: curRec.members };   
//       arrTeam.push(lsTeam);
//    }
//    return arrTeam;
// }

export function clearLocalStorage() {
   (localStorage.length > 0 ? localStorage.clear() : console.log("localStorage is empty"));
}