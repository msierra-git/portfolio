/*==========================================================
 *   Course Code:     WDD330 - Web Frontend Development II *
 *   Student Name:    A. Michael Sierra                    *
 *   Description:     Project 2 - Star Wars Team App       *
 *   Date:            June - July 2022                     *
 ==========================================================*/

 
import { getJSON } from './utilities.js';

// Star Wars Model
export default class StarWars {
   constructor() {
      this.baseUrl = 'https://akabab.github.io/starwars-api/api';
      this._all = [];
      this._team = [];
   }


   async getStarWarsAllInfo() {
      const query = this.baseUrl + '/all.json';
      // console.log(query);

      // use the getJSON function to get the data we need and 
      // store it into variable, then return it
      this._all = await getJSON(query);
      return this._all;
   }


   async getStarWarsTeams() {
      // build a list of unique teams/affiliations, then return it
      let uniqueTeam = [];

      this._all.forEach(function (swChar) {
         let items = swChar.affiliations;
         if (items.length > 0) {
            for (var i = 0; i < items.length; i++) {
               if (uniqueTeam.indexOf(items[i]) === -1) {
                  uniqueTeam.push(items[i]);
               }
            }
         }
      });

      // return uniqueTeam.sort();
      this._team = uniqueTeam.sort();
      return this._team;
   }


   getMembersByTeam(team) {
      // filter this._all for the records identified by id and return it
      let membersList = this._all.filter(function (item) {
         return item.affiliations.indexOf(team) > -1
      });

      // console.log(membersList);
      return membersList;
   }

   
   getMembersByArrayID(arrayID) {
      // filter this._all for the records identified by id and return it
      let membersList = this._all.filter(function (item) {
         return arrayID.indexOf(item.id) > -1
      });

      // console.log(membersList);
      return membersList;
   }


   getMembersCount(team) {
      // provide the count of members associated to the team
      let currentTeam = this.getMembersByTeam(team);
      return currentTeam.length;
   }


   getTeamWithMoreMembers(teamCutoff) {
      // filter out teams with count of members less than 
      // the cut-off value
      let newTeam = this._team;

      for (let i = 0; i < newTeam.length; i++) {
         let countMem = this.getMembersCount(newTeam[i]);
         if (countMem < teamCutoff) {
            newTeam.splice(i, 1);
            i = i - 1;
         }
      }
      // console.log(newTeam);
      return newTeam;
   }


   getMemberById(id) {
      // filter this._all for the record identified by id and return it
      // console.log(`id: ${id}`);      
      return this._all.filter(item => item.id == id)[0];
   }
}