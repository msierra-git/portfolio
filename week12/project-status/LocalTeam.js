/*==========================================================
 *   Course Code:     WDD330 - Web Frontend Development II *
 *   Student Name:    A. Michael Sierra                    *
 *   Description:     Project 2 - Star Wars Team App       *
 *   Date:            June - July 2022                     *
 ==========================================================*/

import * as util from './utilities.js';

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
         if (curRec.team) {
            let tempTeam = {
               id: curRec.id,
               team: curRec.team,
               members: curRec.members 
            };         
            // console.log(tempTeam);
            this.arrTeam.push(tempTeam);
         };
      }
      this.arrTeam = util.sortObjectList(this.arrTeam);
      return this.arrTeam;
   }


   getLocalTeamNames() {
      return this.arrTeam.map(a => a.team).sort();
   }


   getLocalTeamNameByID(teamID) {
      this.arrTeam.filter(obj => {
         return obj.id == this._team[teamName]
      });
   }

   updateTeamMembersList(arrayMember, memID, teamName) {
      // update array list
      const intID = parseInt(memID, 10);
      const index = arrayMember.indexOf(intID);
      (index > -1) ?
         arrayMember.splice(index, 1) :
         arrayMember.push(intID) ;

      // update localStorage
      let teamID = this.getLocalTeamIDByName(teamName);
      this.updateLocalStorageByID(teamID, teamName, arrayMember);

      // return new array
      return arrayMember;
   }


   getLocalTeamMembersByName(teamName) {
      // get all members allocated to this custom team from LS
      let tempTeamRec = this.arrTeam.filter(obj => {
         return obj.team == teamName
      });
      return (tempTeamRec.length > 0) ? tempTeamRec[0].members : null;
   }


   getLocalTeamIDByName(teamName) {
      // get the member's ID allocated to this custom team from LS
      let tempTeamRec = this.arrTeam.filter(obj => {
         return obj.team == teamName
      });
      return (tempTeamRec.length > 0) ? tempTeamRec[0].id : null;
   }


   getLocalStorageByID(recID) {
      const entry = localStorage.getItem(recID);
      return JSON.parse(entry);
   }


   checkEntryforLSDuplicate(txtInput) {
      let newTeam = util.getCurrentEntry('FORM', txtInput);

      let tempTeamRec = this.arrTeam.filter(obj => {
         return obj.team == newTeam
      });
      return (tempTeamRec.length > 0) ? 'exist' : 'go';
   }

   
   addLocalStorageNewTeam(txtInput) {
      let newID = util.getCustomTimeStamp(0);
      let newName = util.getCurrentEntry('FORM', txtInput);
      let arrValue = util.setEntrytoArray(Date(newID), newName, []);
      if (newName) { 
         this.setLocalStorageByID(newID, arrValue) 
      } else {
         arrValue = newName;
         alert('Input Textbox is Empty! Please enter a custom name!');
         console.log('Error! Empty textbox.');
      };
      return arrValue;
   }


   removeLocalStorageTeam(teamArray, teamID) {
      this.removeLocalStorageByID(teamID);      
      let updatedArray = util.removeItemFromList(teamArray, teamID);
      return updatedArray;
   }


   setLocalStorageByID(recID, recValue) {
      const entry = JSON.stringify(recValue);
      localStorage.setItem(recID, entry);
   }


   removeLocalStorageByID(recID) {
      let formatID = new Date(recID);      
      localStorage.removeItem(formatID);
   }


   updateLocalStorageByID(recID, teamName, teamMembers) {
      //  Need to include updating of all fields inside
      let formatID = new Date(recID); 
      let curRec = JSON.parse(localStorage.getItem(formatID));

      let updRec = {
         id: curRec.id,
         team: teamName,
         members: teamMembers
      };
      this.setLocalStorageByID(formatID, updRec);
   }
}


export function clearLocalStorage() {
   (localStorage.length > 0 ? localStorage.clear() : console.log("localStorage is empty"));
}