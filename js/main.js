/*==========================================================
 *   Course Code:     WDD330 - Web Frontend Development II *
 *   Description:     Assignment 1 - Creating Portfolio    *
 *   Student Name:    A. Michael Sierra                    *
 *   Date:            April 2022                           *
 ==========================================================*/


function createMenu() {  
   var menuArrays = [
      {label: "Week 01 Experience - The Journey Begins!", url: "week01/index.html"}      
      // {label: "Week 02 Experience", url: "week02/index.html"},
      // {label: "Week 03 Experience", url: "week03/index.html"},
      // {label: "Week 04 Experience", url: "week04/index.html"},
      // {label: "Week 05 Experience", url: "week05/index.html"},
      // {label: "Week 06 Experience", url: "week06/index.html"},
      // {label: "Week 07 Experience", url: "week07/index.html"},
      // {label: "Week 08 Experience", url: "week08/index.html"},
      // {label: "Week 09 Experience", url: "week09/index.html"},
      // {label: "Week 10 Experience", url: "week10/index.html"},
      // {label: "Week 11 Experience", url: "week11/index.html"},
      // {label: "Week 12 Experience", url: "week12/index.html"},
      // {label: "Week 13 Experience", url: "week13/index.html"},
      // {label: "Week 14 Experience", url: "week14/index.html"}
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