/*==========================================================
 *   Course Code:     WDD330 - Web Frontend Development II *
 *   Student Name:    A. Michael Sierra                    *
 *   Description:     Project 2 - Star Wars Team App       *
 *   Date:            June - July 2022                     *
 ==========================================================*/

 
import StarWars from './StarWars.js';
import StarWarsView from './StarWarsView.js';


// Star Wars controller
export default class DataController {
   constructor(parent, team, members) {
      // refers to elements from html where data will be rendered
      this.parent = parent;
      this.parentElement = null;
      this.team = team;
      this.teamElement = null;
      this.members = members;
      this.membersElement = null;

      // instantiate two classes needed to connect model and view
      this.swData = new StarWars();
      this.swDataView = new StarWarsView();

      // arrays where data are stored
      this._all = [];
      this._team = [];

      // other properties to control data and page rendering
      this.itemsOnPage = 0;
      this.teamCutoff = 0;
   }


   async init() {
      // use this as a place to grab the element identified by this.parent, 
      // do the initial call of this.getSetTeam()
      this.parentElement = document.querySelector(this.parent);
      this.teamElement = document.querySelector(this.team);
      this.membersElement = document.querySelector(this.members);
      await this.getStarWarsInfo();
   }


   async getStarWarsInfo() {
      // this method provides the glue between the model and view. 
      // it first goes out and requests the appropriate data from the model, 
      // then it passes it to the view to be rendered.

      // set loading message
      this.parentElement.innerHTML = 'Loading...';

      // get the list of all star wars characters
      this._all = await this.swData.getStarWarsAllInfo();

      // get list of star wars teams
      await this.swData.getStarWarsTeams();
      this._team = this.swData.getTeamWithMoreMembers(this.teamCutoff);

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


   async getTeamMembers(teamID) {
      let teamMembers = this.swData.getMembersByTeam(this._team[teamID]);
      this.swDataView.renderSWTeamMembers(teamMembers, this.teamElement, this._team[teamID]);
      // console.log(this._team[teamID]);
      // console.log(teamMembers)

      // event on clicking a member from the list
      this.teamElement.addEventListener('click', e => {
         this.getMemberDetails(e.target.dataset.id);
      });
   }


   async getMemberDetails(memID) {
      const member = this.swData.getMemberById(memID);
      this.swDataView.renderSWMemberDetails(member, this.membersElement, this.teamElement);
      // console.log(member);

      // event on close button on member details page
      document.getElementById('closeDetails').addEventListener('click', () => {
         this.swDataView.hideSWMemberDetails(this.membersElement, this.teamElement);   
      }, false);
   }


   // class getter and setters
   getTeam() { return this._team; }

   setItemsOnPage(items) { this.itemsOnPage = items; }

   setTeamCutOff(numOfMembers) { this.teamCutoff = numOfMembers; }

}