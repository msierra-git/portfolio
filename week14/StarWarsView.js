/*==========================================================
 *   Course Code:     WDD330 - Web Frontend Development II *
 *   Student Name:    A. Michael Sierra                    *
 *   Description:     Project 2 - Star Wars Team App       *
 *   Date:            June - July 2022                     *
 ==========================================================*/

 
import { toTitleCase } from './utilities.js';


// Star Wars View handler
export default class StarWarsView {

   renderSWTeams(swList, listElement, curIndex, items) {
      // build a list of teams on the page from an array of unique teams. 
      // this will add the id of the record as a data- property to the li. 
      // ie. <li data-id="">      

      // beginning of the array
      if (!curIndex) { curIndex = 0; };

      // get nemuber of records from the list based on the value of "items" variable.
      let showList = swList.slice(curIndex, curIndex + items);
      // console.log(showList);

      // reset the div where the list of teams will be shown
      listElement.innerHTML = '';

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
      // then hide the fetch button
      document.getElementById('refreshPage').classList.remove('hide_item');
      document.getElementById('teamNavButtons').classList.remove('hide_item');
      document.getElementById('btnFetch').classList.add('hide_item');

      // text to show user of record navigation
      let itemCount = document.getElementById('itemCount');
      itemCount.textContent = `${curIndex+1} of ${swList.length}`;

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
   }


   renderSWTeamMembers(memList, listElement, teamName) {
      // build a list of team members including the name and image as found on API.
      // will add the id of the person/character record as a data- property to the li. 
      // console.log(memList);
      let teamDetailsEl = listElement;
      let h4 = document.createElement('h4');

      // reset the div where the list of team members will be shown
      teamDetailsEl.innerHTML = '';

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
      let memDiv   = listElement.parentNode;
      let slideDiv = memDiv.parentNode;
      let liTitle = document.createElement('li'); 
      let memImg = document.createElement('img'); 
      let spanT = document.createElement('span'); 
      let btn = document.createElement('button');

      // creating the back button to view team list
      btn.textContent = "Back to List";
      btn.setAttribute('id','closeDetails');   

      // grabbing image from URL provided by API
      memImg.setAttribute('src', infoList.image);
      memImg.setAttribute('alt', 'Image of ' + infoList.name);
      memImg.setAttribute('class', 'memberImage');   
      
      // creating title of the list
      spanT.textContent = `Details of ${infoList.name}`;
      spanT.classList.add('memberTitle');
      liTitle.setAttribute('style', 'white-space: nowrap;');   

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
      listElement.classList.remove('hide_item');
      // slideDiv.classList.remove('hide_item');

      // slideDiv.classList.add('slideDiv');
      slideDiv.classList.add('open');
   }


   hideSWMemberDetails(membersElement, teamElement) {
      // hide back the sliding div of member's details
      let memDetails = membersElement;
      let memDiv = memDetails.parentNode;
      let slideDiv = memDiv.parentNode;

      // remove all elements under <ul> 
      memDetails.innerHTML = '';

      // hide sliding div with details of member
      slideDiv.classList.remove('open');
      slideDiv.classList.remove('slideDiv');
      memDetails.classList.add('hide_item');
      
      // reset the div to initial state so transition will run again
      slideDiv.classList.add('slideDiv');  

      // show list of team members on right column
      teamElement.classList.remove('hide_item');
   }


   // renderSWList(swList, listElement) {      
   //    listElement.innerHTML = '';
   //    // listElement.classList.add('listBorderTop');
   //    document.getElementById('refreshPage').classList.remove('hide_item');

   //    swList.forEach(function (swChar) {
   //       let li = document.createElement('li');
   //       li.textContent = swChar.affiliations;
   //       listElement.appendChild(li);
   //    });
   //    listElement.classList.add('full_height');
   // }

}