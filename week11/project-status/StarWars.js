import {
   getJSON
} from './utilities.js';

// Quake Model
export default class StarWars {
   constructor() {
      this.baseUrl = 'https://akabab.github.io/starwars-api/api';
      this._all = [];
      this._team = [];
   }

   async getStarWarsAllInfo() {
      const query = this.baseUrl + '/all.json';
      // console.log(query);
      // use the getJSON function and the position provided to build out the correct URL to get the data we need.  
      // Store it into variable, then return it

      // fetch the data
      this._all = await getJSON(query);
      return this._all;
   }

   async getStarWarsTeams() {      
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
   
   getMembersCount(team) {
      let currentTeam = this.getMembersByTeam(team);
      return currentTeam.length;
   }
   
   getTeamWithMoreMembers() {
      let newTeam = this._team;
      
      for (let i = 0; i < newTeam.length; i++) {
         let countMem = this.getMembersCount(newTeam[i]);
         if (countMem < 3) { 
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