/*==========================================================
 *   Course Code:     WDD330 - Web Frontend Development II *
 *   Student Name:    A. Michael Sierra                    *
 *   Description:     Project 2 - Star Wars Team App       *
 *   Date:            June - July 2022                     *
 ==========================================================*/


import { toTitleCase } from './utilities.js';


// Star Wars View handler
export default class StarWarsView {

   renderSWTeams(swList, listElement, curIndex, items, dataLocation) {
      // build a list of teams on the page from an array of unique teams. 
      // this will add the id of the record as a data- property to the li. 
      // ie. <li data-id="">      

      // beginning of the array
      if (!curIndex) {
         curIndex = 0;
      };

      // get nemuber of records from the list based on the value of "items" variable.
      let showList = swList.slice(curIndex, curIndex + items);
      // console.log(showList);

      // reset the div where the list of teams will be shown
      // console.log(listElement);
      listElement.innerHTML = '';
      listElement.classList.remove('hide_item');
      listElement.parentNode.classList.remove('hide_item');

      // create title for the list of Teams based on data location
      let listTitle = (listElement.parentNode.parentNode.children[0].children[0]);
      listTitle.textContent = `Teams from ${dataLocation}`;

      // iterate on the array of unique teams/affiliations
      // and show as a button by adding the "listButton" class
      showList.forEach(function (swTeam, index) {
         let li = document.createElement('li');
         li.setAttribute('data-id', curIndex + index);
         li.setAttribute('class', 'listButton');
         li.textContent = swTeam;
         listElement.appendChild(li);
      });

      // show navigation, record count, and refresh page buttons
      // then hide the either fetch or local button
      document.getElementById('refreshPage').classList.remove('hide_item');
      document.getElementById('teamNavButtons').classList.remove('hide_item');
      document.getElementById('manageLocalDiv').classList.add('hide_item');
      if (dataLocation === 'API') {
         document.getElementById('btnFetch').classList.add('hide_item');
         document.getElementById('btnManage').classList.add('hide_item');
         document.getElementById('btnLocal').classList.remove('hide_item');
      } else {
         document.getElementById('btnFetch').classList.remove('hide_item');
         document.getElementById('btnManage').classList.remove('hide_item');
         document.getElementById('btnLocal').classList.add('hide_item');
      };

      // text to show user of record navigation
      let itemCount = document.getElementById('itemCount');

      itemCount.textContent = (swList.length === 0) ?
         `No teams found on ${dataLocation}...` :
         `${curIndex+1} of ${swList.length}`;

      // hide previous button if page is at the beginning of the array
      // otherwise show previous button for navigation of list
      if (curIndex === 0) {
         document.getElementById('btnPrev').classList.add('hide_item');
      } else {
         document.getElementById('btnPrev').classList.remove('hide_item');
      };

      // hide next button if page is at the end of the array
      // otherwise show next button for navigation of list
      if ((curIndex + items + 1) > swList.length) {
         document.getElementById('btnNext').classList.add('hide_item');
      } else {
         document.getElementById('btnNext').classList.remove('hide_item');
      };

      // hide team members list whenever this is called.
      // console.log(listElement.parentNode.parentNode.nextElementSibling);
      listElement.parentNode.parentNode.nextElementSibling.classList.add('hide_item');

      // hide other div elements
      // console.log(listElement);
      let manageDiv = listElement.parentNode.parentNode.parentNode.children[3];
      manageDiv.classList.add('hide_item');
   }


   renderSWTeamMembers(memList, listElement, teamName) {
      // build a list of team members including the name and image as found on API.
      // will add the id of the person/character record as a data- property to the li. 
      // console.log(listElement);
      let teamDetailsEl = listElement;
      let h4 = document.createElement('h4');

      // reset the div where the list of team members will be shown
      teamDetailsEl.innerHTML = '';

      // show team members div container 
      teamDetailsEl.classList.remove('hide_item');
      teamDetailsEl.parentNode.parentNode.classList.remove('hide_item');

      // creating title of the list
      h4.textContent = `${memList.length} Members of ${teamName}`;
      h4.setAttribute('class', 'listTitle');
      teamDetailsEl.appendChild(h4);

      // iterate on the array of unique teams/affiliations
      memList.forEach(function (swMember) {
         let li = document.createElement('li');
         // let div = document.createElement('div');
         let img = document.createElement('img');
         let spn = document.createElement('span');

         // this id is used for the click event of the element
         // to show the details of respective id
         li.setAttribute('data-id', swMember.id);
         spn.setAttribute('data-id', swMember.id);
         img.setAttribute('data-id', swMember.id);

         // image of person/character as found on the API
         img.setAttribute('src', swMember.image);
         img.setAttribute('alt', 'Image of ' + swMember.name);
         img.setAttribute('class', 'listImage');
         spn.textContent = swMember.name;

         // constructing the html elements to show details
         teamDetailsEl.appendChild(li);
         li.appendChild(img);
         li.appendChild(spn);
      });

   }


   renderSWMemberDetails(infoList, listElement, teamElement) {
      // build a list of all the member's attributes found from API 

      // reset the div where the details of the member will be shown
      listElement.innerHTML = '';
      let newArray = Object.entries(infoList);
      let memDiv = listElement.parentNode;
      let slideDiv = memDiv.parentNode;
      let liTitle = document.createElement('li');
      let memImg = document.createElement('img');
      let spanT = document.createElement('span');
      let btn = document.createElement('button');

      // creating the back button to view team list
      btn.textContent = "Back to List";
      btn.setAttribute('id', 'closeSlide');

      // grabbing image from URL provided by API
      memImg.setAttribute('src', infoList.image);
      memImg.setAttribute('alt', 'Image of ' + infoList.name);
      memImg.setAttribute('class', 'memberImage');

      // creating title of the list
      spanT.textContent = `Details of ${infoList.name}`;
      spanT.classList.add('memberTitle');
      liTitle.setAttribute('class', 'listMemberTitle');
      // liTitle.setAttribute('style', 'white-space: nowrap;');   

      // constructing the top html elements of the list
      listElement.appendChild(btn);
      listElement.appendChild(liTitle);
      liTitle.appendChild(memImg);
      liTitle.appendChild(spanT);

      // iterate through array then create html element to show details
      for (const [key, value] of newArray) {
         if (value === true ||
            (key !== 'id' && key !== 'image' &&
               key !== 'name' && key !== 'wiki')) {
            let newValue =
               ((typeof value === 'string' || value instanceof String) ?
                  toTitleCase(value) : value);

            // create li element and add to the parent el
            let li = document.createElement('li');
            listElement.appendChild(li);

            // create a span for the "key" data
            let spnKey = document.createElement('span');
            spnKey.setAttribute('class', 'listKey');
            spnKey.textContent = `${toTitleCase(key)}: `;
            li.appendChild(spnKey);

            // create a span for the "value" data
            let spnVal = document.createElement('span');
            spnVal.setAttribute('class', 'listValue');
            spnVal.textContent = newValue;
            li.appendChild(spnVal);
         }
      }

      // create last li element if wiki is available
      if (infoList.wiki) {
         let liWiki = document.createElement('li');
         let linkWiki = document.createElement('a');

         linkWiki.setAttribute('class', 'wikiLink');
         linkWiki.setAttribute('href', infoList.wiki);
         linkWiki.setAttribute('target', '_blank');
         linkWiki.textContent = '< View More Info on Wiki >';

         listElement.appendChild(liWiki);
         liWiki.appendChild(linkWiki);
      }

      // hide list of team members on right column
      teamElement.classList.add('hide_item');

      // show sliding div with details of member
      // console.log(listElement);      
      listElement.classList.remove('hide_item');
      slideDiv.classList.add('open');
   }


   renderManageSWTeams(arrayLS, manageDiv, listElement, teamElement) {
      // show all divs for this feature
      let slideDiv = manageDiv.parentNode;
      slideDiv.classList.remove('hide_item');
      manageDiv.classList.remove('hide_item');
      slideDiv.children[1].classList.remove('hide_item');
      manageDiv.children[2].classList.remove('hide_item');

      // hide list of team members on right column
      teamElement.classList.add('hide_item');

      this.renderManageSWLSList(arrayLS, listElement, 0);

      // show sliding div with details of member
      listElement.classList.remove('hide_item');
      slideDiv.classList.add('open');

      document.getElementById('btnFetch').classList.add('hide_item');
      document.getElementById('btnLocal').classList.remove('hide_item');
   }


   renderManageSWLSList(arrayLS, listElement, curIndex) {
      // reset the div where the list of custom teams will be shown
      listElement.innerHTML = '';
      listElement.classList.remove('hide_item');

      arrayLS.forEach(function (lsTeam, index) {
         let customItems = listElement;
         let customItem = document.createElement('li');
         let customLabel = document.createElement('span');
         let customButton = document.createElement('button');
         let customButton2 = document.createElement('button');

         // assign attributes and values to element
         customLabel.innerHTML = lsTeam.team;
         customLabel.className = 'teamLabel';
         customButton.className = 'btnDel';
         customButton.setAttribute('data-id', lsTeam.id);
         customButton.innerHTML = 'X';
         customButton2.className = 'btnMem';
         customButton2.setAttribute('data-id', lsTeam.id);
         customButton2.innerHTML = '>>';

         // organise and append elements together
         customItem.appendChild(customButton);
         customButton.after(customLabel);
         customLabel.after(customButton2);
         customItems.appendChild(customItem);
      });
   }

   
   async renderSWEntireList(memList, teamName, teamMembers, curIndex, items) {
      
      // beginning of the array
      if (!curIndex) {
         curIndex = 0;
      };

      // get nemuber of records from the list based on the value of "items" variable.
      let showList = memList.slice(curIndex, curIndex + items);

      // build a list of all members including the name and image as found on API.
      // console.log(listElement);

      let teamDetailsEl = document.getElementById('apiTeamDetails');
      let h4 = document.createElement('h4');
      let spnMsg = document.createElement('span');

      // reset the div where the list of team members will be shown
      teamDetailsEl.innerHTML = '';

      // show team members div container 
      teamDetailsEl.classList.remove('hide_item');
      teamDetailsEl.parentNode.classList.remove('hide_item');

      let countMem = (teamMembers) ? teamMembers.length : 0 ;
      // creating title of the list
      h4.textContent = `[${countMem}] Members for ${teamName}`;
      h4.setAttribute('class', 'listTitle');
      spnMsg.setAttribute('class', 'listMsg');
      spnMsg.textContent =
         '(Click on checkbox to add/remove members of custom team)';
      teamDetailsEl.appendChild(h4);
      teamDetailsEl.appendChild(spnMsg);

      // console.log(teamMembers);
      // iterate on the array of unique teams/affiliations
      showList.forEach(function (swMember) {
         let li = document.createElement('li');
         let chk = document.createElement('input');
         let img = document.createElement('img');
         let spn = document.createElement('span');

         // assign attributes to elements
         chk.type = 'checkbox';
         chk.id = swMember.id;
         chk.setAttribute('class', 'chkEdit');
         chk.checked = (teamMembers.indexOf(swMember.id) > -1) ? true : false;

         // image of person/character as found on the API
         img.setAttribute('src', swMember.image);
         img.setAttribute('alt', 'Image of ' + swMember.name);
         img.setAttribute('class', 'listImage');
         spn.textContent = swMember.name;

         // constructing the html elements to show details
         teamDetailsEl.appendChild(li);
         li.appendChild(chk);
         li.appendChild(img);
         li.appendChild(spn);
      });

      // show navigation, record count, and refresh page buttons
      document.getElementById('apiTeamNav').classList.remove('hide_item');
      // text to show user of record navigation
      let itemCount = document.getElementById('itemCount2');

      itemCount.textContent = (memList.length === 0) ?
         `No members found on API...` :
         `${curIndex+1} of ${memList.length}`;

      // hide previous button if page is at the beginning of the array
      // otherwise show previous button for navigation of list
      if (curIndex === 0) {
         document.getElementById('btnPrev2').classList.add('hide_item');
      } else {
         document.getElementById('btnPrev2').classList.remove('hide_item');
      };

      // hide next button if page is at the end of the array
      // otherwise show next button for navigation of list
      if ((curIndex + items + 1) > memList.length) {
         document.getElementById('btnNext2').classList.add('hide_item');
      } else {
         document.getElementById('btnNext2').classList.remove('hide_item');
      };
   }


   hideSWSlidingDiv(slideElement, teamElement) {
      // hide back the sliding div of member's details
      let ulDetails = slideElement;
      let ulID = ulDetails.id;
      let memDiv, slideDiv = '';
      // console.log(ulID);

      if (ulID === 'memberDetails') {
         memDiv = ulDetails.parentNode;
         slideDiv = memDiv.parentNode;
      } else {
         memDiv = ulDetails.parentNode.parentNode;
         slideDiv = memDiv.parentNode;
      }

      // remove all elements under <ul> 
      ulDetails.innerHTML = '';

      // hide sliding div with details of member
      slideDiv.classList.remove('open');
      slideDiv.classList.remove('slideDiv');
      ulDetails.classList.add('hide_item');

      // reset the div to initial state so transition will run again
      slideDiv.classList.add('slideDiv');

      // specific to manage local teams div
      if (ulID === 'localDetails') {
         slideDiv.classList.add('hide_item');
         memDiv.classList.add('hide_item');
         memDiv.children[2].classList.add('hide_item');
      };

      // show list of team members on right column
      teamElement.classList.remove('hide_item');
   }


   resetAPITeamDiv() {
      document.getElementById('apiTeamDetails').innerHTML = '';
      document.getElementById('apiTeamDiv').classList.add('hide_item');
   }

   refreshManageTeamDiv() {
      let inputBox = document.getElementById('txtTeamName');
      document.getElementById('apiTeamDiv').classList.add('hide_item');
      document.getElementById('apiTeamDetails').innerHTML = '';
      document.getElementById('apiTeamDiv').classList.add('hide_item');

      inputBox.value = '';
      inputBox.focus();
   }

   resetPage() {
      // hide elements
      document.getElementById('refreshPage').classList.add('hide_item');
      document.getElementById('btnManage').classList.add('hide_item');
      document.getElementById('swList').classList.add('hide_item');
      document.getElementById('teamDetails').classList.add('hide_item');
      document.getElementById('memberDetails').classList.add('hide_item');
      document.getElementById('slideDiv2').classList.add('hide_item');
      document.getElementById('teamNavButtons').classList.add('hide_item');
      document.getElementById('listDiv').classList.add('hide_item');

      // show elements
      document.getElementById('btnFetch').classList.remove('hide_item');
      document.getElementById('btnLocal').classList.remove('hide_item');
      document.getElementById('staticDiv').classList.remove('hide_item');
   }

}