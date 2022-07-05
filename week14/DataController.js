/*==========================================================
 *   Course Code:     WDD330 - Web Frontend Development II *
 *   Student Name:    A. Michael Sierra                    *
 *   Description:     Project 2 - Star Wars Team App       *
 *   Date:            June - July 2022                     *
 ==========================================================*/


import LocalTeam from './LocalTeam.js';
import StarWars from './StarWars.js';
import StarWarsView from './StarWarsView.js';


// Star Wars Data controller
export default class DataController {
   constructor(parent, team, members, dataLocation) {
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
      this.swLocal = new LocalTeam();

      // arrays where data are stored
      this._all = [];
      this._team = [];
      this._ls = [];

      // other properties to control data and page rendering
      this.itemsOnPage = 0;
      this.teamCutoff = 0;
      this.dataLocation = dataLocation;
      this.curCustomTeam = '';
      this.curCustomTeamMembers = [];
   }


   async init() {
      // use this as a place to grab the element identified by this.parent, 
      // do the initial call of this.getSetTeam()
      this.parentElement = document.querySelector(this.parent);
      this.teamElement = document.querySelector(this.team);
      this.membersElement = document.querySelector(this.members);
      if (this.dataLocation === 'API') {
         await this.getStarWarsInfo();
      }
      if (this.dataLocation === 'Local Storage') {
         await this.getLSStarWarsInfo();
      }
      if (this.dataLocation === 'Manage LS') {
         await this.manageLSStarWarsInfo();
      }
   }


   async getStarWarsInfo() {
      // this method provides the glue between the api-data model and view. 
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


   async getLSStarWarsInfo() {
      // this method provides the glue between the localstorage model and view. 
      // it first goes out and requests the appropriate data from the model, 
      // then it passes it to the view to be rendered.

      // set loading message
      this.parentElement.innerHTML = 'Loading...';

      // get the list of all star wars characters
      this._all = await this.swData.getStarWarsAllInfo();

      // get list of star wars teams from LS
      this._ls = this.swLocal.getLocalTeamAllInfo();
      this._team = this.swLocal.getLocalTeamNames();

      // render list to html
      this.getSetOfTeams(0);

      // add a listener to the new list of star wars team to allow drill down in to the details
      this.parentElement.addEventListener('click', e => {
         this.getTeamMembers(e.target.dataset.id);
      }, false);
   }


   async getSetOfTeams(curIndex) {
      this.swDataView.renderSWTeams(
         this._team, this.parentElement, curIndex, this.itemsOnPage, this.dataLocation);
   }


   async getTeamMembers(teamID) {
      let teamMembers = [];
      if (this.dataLocation === 'API') {
         teamMembers = this.swData.getMembersByTeam(this._team[teamID]);
      }

      if (this.dataLocation === 'Local Storage') {
         // test in getting the name instead of an ID
         // console.log(this._team[teamID]);         

         // get the members allocated to this custom team from LS
         let membersID = this.swLocal.getLocalTeamMembersByName(this._team[teamID]);

         // get the records from API based on member IDs from LS                  
         teamMembers = (membersID) ? this.swData.getMembersByArrayID(membersID) : teamMembers = [];
      }

      this.swDataView.renderSWTeamMembers(teamMembers, this.teamElement, this._team[teamID]);

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
      document.getElementById('closeSlide').addEventListener('click', () => {
         this.swDataView.hideSWSlidingDiv(this.membersElement, this.teamElement);
      }, false);
   }



   async manageLSStarWarsInfo() {
      // get the list of all star wars characters
      this._all = await this.swData.getStarWarsAllInfo();

      // get list of star wars teams from LS
      this._ls = this.swLocal.getLocalTeamAllInfo();
      this._team = this.swLocal.getLocalTeamNames();

      let ulLocalTeams = this.parentElement.children[1].children[0];
      this.showLSStarWarsList(
         this._ls, this.parentElement, ulLocalTeams, this.teamElement);
   }


   showLSStarWarsList(arrayTeams, parentElmnt, ulElmnt, teamElmnt) {
      // Refresh list of custom teams on manage div
      // renderManageSWTeams(arrayLS, manageDiv, listElement, teamElement)
      this.swDataView.renderManageSWTeams(arrayTeams, parentElmnt, ulElmnt, teamElmnt);

      // delete custom team button
      document.querySelectorAll('.btnDel').forEach(item => {
         item.addEventListener('click', event => {
            let selLabel = event.target.nextSibling;
            let selID = event.target.dataset.id;
            this.removeLSStarWarsTeam(selID, selLabel);
         }, false);
      });

      // edit local team members button
      document.querySelectorAll('.btnMem').forEach(item => {
         item.addEventListener('click', event => {
            this.curCustomTeam = event.target.previousSibling.innerHTML;
            // let selID = event.target.dataset.id;
            // console.log(selID);
            // console.log(this._ls);
            this.curCustomTeamMembers =
               this.swLocal.getLocalTeamMembersByName(this.curCustomTeam);
            this.getSetOfMembers(0);
         }, false);
      });
   }


   async getSetOfMembers(curIndex) {
      this.swDataView.renderSWEntireList(
         this._all, this.curCustomTeam, this.curCustomTeamMembers,
         curIndex, this.itemsOnPage);


      // edit local team members button
      document.querySelectorAll('.chkEdit').forEach(item => {
         item.addEventListener('click', event => {
            // this.curCustomTeam = event.target.previousSibling.innerHTML;
            let selID = event.target.id;
            console.log(selID);
            // console.log(this._ls);
            this.curCustomTeamMembers = 
               this.swLocal.updateTeamMembersList(
                  this.curCustomTeamMembers, selID, this.curCustomTeam);
            console.log(this.curCustomTeamMembers);
            this.getSetOfMembers(curIndex);
         }, false);
      });

      // console.log(this.parent);
      // console.log(this.parentElement);
      // console.log(this.team);
      // console.log(this.teamElement);
      // console.log(this.members);
      // console.log(this.membersElement);
   }


   addLSStarWarsTeam(txtInput) {
      let newTeam = this.swLocal.addLocalStorageNewTeam(txtInput);
      console.log(newTeam);
      if (newTeam) {
         // add the new entry into ls array
         this._ls.push(newTeam);

         let ulLocalTeams = this.parentElement.children[1].children[0];
         this.showLSStarWarsList(
            this._ls, this.parentElement, ulLocalTeams, this.teamElement);
      }
   }


   removeLSStarWarsTeam(teamID, teamLabel) {
      let confirmDelete = confirm("Do you really want to delete the team: '" +
         teamLabel.innerHTML +
         "' and all its members?");

      if (confirmDelete) {
         let newTeam = this.swLocal.removeLocalStorageTeam(this._ls, teamID);
         // remove the team entry from ls array
         this._ls = newTeam;

         let ulLocalTeams = this.parentElement.children[1].children[0];
         this.showLSStarWarsList(
            this._ls, this.parentElement, ulLocalTeams, this.teamElement);
      }
   }


   restartSWApp() {
      this.swDataView.resetPage();
   }


   // class getter and setters
   getTeam() {
      return this._team;
   }


   getMembers() {
      return this._all;
   }


   setItemsOnPage(items) {
      this.itemsOnPage = items;
   }


   setTeamCutOff(numOfMembers) {
      this.teamCutoff = numOfMembers;
   }
}