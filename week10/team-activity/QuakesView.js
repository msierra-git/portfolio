// Quake View handler
export default class QuakesView {
   renderQuakeList(quakeList, listElement) {
      // build a list of the quakes...include the title and time of each quake then append the list to listElement. 
      // You should also add the id of the quake record as a data- property to the li. ie. <li data-id="">
      
      listElement.innerHTML = '';
      // listElement.classList.add('listBorderTop');
      document.getElementById('refreshPage').classList.remove('hide_item');
      quakeList.features.forEach(function (quake) {
         let li = document.createElement('li');
         li.setAttribute('data-id', quake.id);
         li.textContent = quake.properties.title + ' - [Date] ' + new Date(quake.properties.time);
         listElement.appendChild(li);
      });
      listElement.classList.add('full_height');
   }

   renderQuake(quake, element) {
      let newElement = document.getElementById('quakeDetails');
      const quakeProperties = Object.entries(quake.properties);
      // console.log('renderQuake: ' + element);
      // console.log(quake.properties);
      // console.log(quakeProperties);
      
      // for the provided quake make a list of each of the properties associated with it. 
      // Then append the list to the provided element. Notice the first line of this method. 
      // Object.entries() is a slick way to turn an object into an array so that we can iterate over it easier! 

      newElement.innerHTML = '';
      // newElement.classList.add('listBorderTop');
      // let hd = document.createElement('h4');
      let btn = document.createElement('button');
      let liTitle = document.createElement('li'); 
      let slideDiv = document.getElementById('slideDiv');

      // hd.textContent = 'DETAILS';
      btn.textContent = "Back to List";
      btn.setAttribute('id','toggleView');
      btn.setAttribute('onclick','toggleView();');

      newElement.appendChild(btn);
      // newElement.appendChild(hd);
   
      // console.log('this is quakeProperties');
      // console.log(quakeProperties);
      // console.log(quakeProperties[25][1]);

      liTitle.textContent = quakeProperties[25][1];
      liTitle.classList.add('title_bold');
      newElement.appendChild(liTitle); 

      for (const [key, value] of quakeProperties) {
         if (value) {
            let newValue = 
               ((key === 'time' || key === 'updated') 
               ? new Date(value) : value);    
               
            let li = document.createElement('li');              
            li.textContent = `${key}: ${newValue}`;
            newElement.appendChild(li); 
         }
      }                  
      slideDiv.classList.toggle('open');
   }
}

