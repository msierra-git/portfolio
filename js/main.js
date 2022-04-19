/*==========================================================
 *   Course Code:     WDD330 - Web Frontend Development II *
 *   Description:     Assignment 1 - Creating Portfolio    *
 *   Student Name:    A. Michael Sierra                    *
 *   Date:            April 2022                           *
 ==========================================================*/


function createMenu() {  
   var menuArrays = [
      {
         label:   "Week 01 Notes",
         url:     "week01/index.html"
      },
      {
         label:   "Week 02 Notes",
         url:     "week02/index.html"
      }
   ];
   var menuLinks = document.getElementById('ol');

   for (i = 0; i <= menuArrays.length - 1; i++) {
      var menuItem = document.createElement('li');     // create li element
      var itemLink = document.createElement('a');      // create a element
      var itemText = menuArrays[i].label;              // get label from array to variable
      var itemUrl =  menuArrays[i].url;                // get url from array to variable

      itemLink.setAttribute('href', itemUrl);          // assign url variable to href in <a> element
      itemLink.innerText = itemText;                   // assign label to text in <a> element
      menuItem.appendChild(itemLink);                  // append link <a> to item <li>

      menuLinks.appendChild(menuItem);                 // append item <li> to menu <ol>
   }
}
