import StarWars from './StarWars.js';
import StarWarsView from './StarWarsView.js';

// Quake controller
export default class DataController {
   constructor(parent, team, members) {
      this.parent = parent;
      this.parentElement = null;
      this.team = team;
      this.teamElement = null;
      this.members = members;
      this.membersElement = null;
      this.swData = new StarWars();
      this.swDataView = new StarWarsView();
      this.itemsOnPage = 0;
      this._all = [];
      this._team = [];
   }

   async init() {
      // use this as a place to grab the element identified by this.parent, 
      // do the initial call of this.getSetTeam()
      this.parentElement = document.querySelector(this.parent);
      this.teamElement = document.querySelector(this.team);
      this.membersElement = document.querySelector(this.members);
      await this.getStarWarsInfo();
      // this._team = await this.getUniqueTeams();
      // this._team.sort();
      // this.getSetTeam(0); 
   }

   async getStarWarsInfo() {
      // this method provides the glue between the model and view. 
      // Notice it first goes out and requests the appropriate data from the model, 
      // then it passes it to the view to be rendered.

      // set loading message
      this.parentElement.innerHTML = 'Loading...';
      // get the list of all star wars characters
      this._all = await this.swData.getStarWarsAllInfo();
      // get list of star wars teams
      await this.swData.getStarWarsTeams();
      this._team = this.swData.getTeamWithMoreMembers();
      // this._team = this.swData.getTeamWithMoreMembers();
      // render list to html
      this.getSetOfTeams(0);

      // add a listener to the new list of star wars team to allow drill down in to the details
      this.parentElement.addEventListener('click', e => {
         this.getTeamMembers(e.target.dataset.id);
      }, false);
   }

   async getSetOfTeams(curIndex) {
      this.swDataView.renderSWTeams(this._team, this.parentElement, curIndex, this.itemsOnPage);
   }

   setItemsOnPage(items) {
      this.itemsOnPage = items;
   }

   getTeam() {
      return this._team;
   }

   async getTeamMembers(teamID) {
      let teamMembers = this.swData.getMembersByTeam(this._team[teamID]);

      // console.log(this._team[teamID]);
      // console.log(teamMembers)
      this.swDataView.renderSWTeamMembers(teamMembers, this.teamElement, this._team[teamID]);

      this.teamElement.addEventListener('click', e => {
         // console.log(e.target.dataset.id);
         this.getMemberDetails(e.target.dataset.id);
      });
   }

   async getMemberDetails(memID) {
      const member = this.swData.getMemberById(memID);
      console.log(member);
      this.swDataView.renderSWMemberDetails(member, this.membersElement, this.teamElement);

      // close button for member's details
      document.getElementById('closeDetails').addEventListener('click', () => {
         this.swDataView.hideSWMemberDetails(this.membersElement, this.teamElement);                  
      }, false);
   }

   async getQuakeDetails(quakeId) {
      // get the details for the quakeId provided from the model, 
      // then send them to the view to be displayed
      console.log('getQuakeDetails: ' + quakeId);
      // const quake = this.quakes.getQuakeById(quakeId);
      // console.log(quake);
      // this.quakesView.renderQuake(quake, this.parentElement);
   }
}