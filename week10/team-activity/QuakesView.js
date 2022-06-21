// Quake View handler
export default class QuakesView {
   renderQuakeList(quakeList, listElement) {
      // build a list of the quakes...include the title and time of each quake then append the list to listElement. 
      // You should also add the id of the quake record as a data- property to the li. ie. <li data-id="">
      
      // listElement.innerHTML = quakeList.features
      //    .map(quake => {
      //       return `
      //          ${quake.properties.title}, ${new Date(
      //                   quake.properties.time
      //                )}
      //          `;
      //    })
      //    .join('');

      listElement.innerHTML = '';
      quakeList.features.forEach(function (quake) {
         let li = document.createElement('li');
         li.setAttribute('data-id', quake.id);
         li.textContent = quake.properties.title + ' - [Date] ' + new Date(quake.properties.time);
         listElement.appendChild(li);
      });

   }

   renderQuake(quake, element) {
      const quakeProperties = Object.entries(quake.properties);
      // console.log('renderQuake: ' + element);
      // console.log(quake.properties);
      // console.log(quakeProperties);
      
      // for the provided quake make a list of each of the properties associated with it. 
      // Then append the list to the provided element. Notice the first line of this method. 
      // Object.entries() is a slick way to turn an object into an array so that we can iterate over it easier! 
      
      element.innerHTML = '';
      for (const [key, value] of quakeProperties) {
         let li = document.createElement('li');
         li.setAttribute('data-id', quake.id);
         li.textContent = `${key}: ${value}`;
         element.appendChild(li);
      }

      // let btn = document.createElement('button');
      // btn.setAttribute('id', 'btnLocation');
      // btn.textContent = 'Fetch Again';
      // element.after(btn);

   }
}