import { toTitleCase } from './utilities.js';

// Quake View handler
export default class StarWarsView {
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

   renderSWTeams(swList, listElement, curIndex, items) {
      // show 10 elements of the team list at a time
      if (!curIndex) {
         curIndex = 0;
      };
      let showList = swList.slice(curIndex, curIndex + items);
      // console.log(showList);

      listElement.innerHTML = '';

      // iterate on the array of unique teams/affiliations
      showList.forEach(function (swTeam, index) {
         let li = document.createElement('li');
         li.setAttribute('data-id', curIndex + index);
         li.setAttribute('class', 'listButton');
         li.textContent = swTeam;
         listElement.appendChild(li);
      });

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
      // console.log(memList);
      let teamDetailsEl = listElement;
      let h4 = document.createElement('h4');

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

            let li = document.createElement('li');
            li.textContent = `${toTitleCase(key)}: ${newValue}`;
            listElement.appendChild(li);            
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
      slideDiv.classList.remove('hide_item');

      slideDiv.classList.add('slideDiv');
      slideDiv.classList.add('open');
   }

   hideSWMemberDetails(membersElement, teamElement) {
      let memDetails = membersElement;
      let memDiv = memDetails.parentNode;
      let slideDiv = memDiv.parentNode;

      // hide sliding div with details of member
      slideDiv.classList.remove('open');
      slideDiv.classList.remove('slideDiv');
      slideDiv.classList.add('hide_item');
      memDetails.classList.add('hide_item');

      // show list of team members on right column
      teamElement.classList.remove('hide_item');
   }


   // renderQuake(quake, element) {
   //    let newElement = document.getElementById('quakeDetails');
   //    const quakeProperties = Object.entries(quake.properties);
   //    // console.log('renderQuake: ' + element);
   //    // console.log(quake.properties);
   //    // console.log(quakeProperties);

   //    // for the provided quake make a list of each of the properties associated with it. 
   //    // Then append the list to the provided element. Notice the first line of this method. 
   //    // Object.entries() is a slick way to turn an object into an array so that we can iterate over it easier! 

   //    newElement.innerHTML = '';
   //    // newElement.classList.add('listBorderTop');
   //    // let hd = document.createElement('h4');
   //    let btn = document.createElement('button');
   //    let liTitle = document.createElement('li'); 
   //    let slideDiv = document.getElementById('slideDiv');

   //    // hd.textContent = 'DETAILS';
   //    btn.textContent = "Back to List";
   //    btn.setAttribute('id','toggleView');
   //    btn.setAttribute('onclick','toggleView();');

   //    newElement.appendChild(btn);
   //    // newElement.appendChild(hd);

   //    // console.log('this is quakeProperties');
   //    // console.log(quakeProperties);
   //    // console.log(quakeProperties[25][1]);

   //    liTitle.textContent = quakeProperties[25][1];
   //    liTitle.classList.add('title_bold');
   //    newElement.appendChild(liTitle); 

   //    for (const [key, value] of quakeProperties) {
   //       if (value) {
   //          let newValue = 
   //             ((key === 'time' || key === 'updated') 
   //             ? new Date(value) : value);    

   //          let li = document.createElement('li');              
   //          li.textContent = `${key}: ${newValue}`;
   //          newElement.appendChild(li); 
   //       }
   //    }                  
   //    slideDiv.classList.add('open');
   //    slideDiv.classList.remove('hide_item');
   //    newElement.classList.remove('hide_item');
   //    element.classList.add('hide_item');
   // }
}