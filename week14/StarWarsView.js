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
      if (!curIndex) { curIndex = 0; };
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
      if ((curIndex+items+1) > swList.length) {
         document.getElementById('btnNext').classList.add('hide_item');
      } else {
         document.getElementById('btnNext').classList.remove('hide_item');
      };
   }
   

   renderSWTeamMembers(memList, listElement, teamName) {
      console.log(memList);
      let teamDetailsEl = document.getElementById(listElement);
      let h4 = document.createElement('h4');
      
      teamDetailsEl.innerHTML = '';
      h4.textContent = `${memList.length} Members of ${teamName}`;
      h4.setAttribute('class', 'listTitle');
      teamDetailsEl.appendChild(h4);
      
      // iterate on the array of unique teams/affiliations
      memList.forEach(function (swMember) {
         let li = document.createElement('li');
         // let div = document.createElement('div');
         let img = document.createElement('img');
         let spn = document.createElement('span');
         
         li.setAttribute('data-id',  swMember.id);
         img.setAttribute('src', swMember.image);
         img.setAttribute('alt', 'Image of ' + swMember.name);
         img.setAttribute('class', 'listImage');
         spn.textContent = swMember.name;
         // li.textContent = swMember.name;

         teamDetailsEl.appendChild(li);
         li.appendChild(img);
         li.appendChild(spn);
         // li.appendChild(div);
         // div.appendChild(img);
         // div.appendChild(spn);
      });

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

