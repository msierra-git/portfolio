/*==========================================================
 *   Course Code:     WDD330 - Web Frontend Development II *
 *   Description:     Assignment 1 - Creating Portfolio    *
 *   Student Name:    A. Michael Sierra                    *
 *   Date:            April 2022                           *
 ==========================================================*/


// this function will create the same menu as the original createMenu fuinction but this time 
// using some of the features found on the book Javascript: Novice to Ninja, 2nd ed, chapters 2 to 4.
// created 24 April 2022.
function createMenu2() {  
   var menuArrays2 = [
      ["Week 01 Experience - The Journey Begins!", "week01/index.html"],      
      ["Week 02 Experience - Re-learning Javascripts Fundamentals", "week02/index.html"],
      ["Week 03 Experience - Full-on with Emergencies", "week03/index.html"],
      ["Week 04 Experience - Early and Distributed Readings", "week04/index.html"],
      ["Week 05 Experience - Learning Testing and Debugging", "week05/index.html"],
      ["Week 06 Experience - Midterm Checkin - ToDo Application - Project", "week06/index.html"],
      ["Week 07 Experience - More Functions and AJAX", "week07/index.html"],
      ["Week 08 Experience - Revisiting and Learning more HTML5 and CSS3", "week08/index.html"],
      ["Week 09 Experience - Window and API", "week09/index.html"]
      // ["Week 10 Experience", "week10/index.html"],
      // ["Week 11 Experience", "week11/index.html"],
      // ["Week 12 Experience", "week12/index.html"],
      // ["Week 13 Experience", "week13/index.html"],
      // ["Week 14 Experience", "week14/index.html"]
   ];
   const menuLinks = document.getElementById('ol');    // assign <ol> to variable

   for (const [wk_label, wk_url] of menuArrays2) {
      const menuItem = document.createElement('li');   // create <li> element
      const itemLink = document.createElement('a');    // create <a> element
      const itemText = wk_label;                       // get label from array to variable
      const itemUrl =  wk_url;                         // get url from array to variable

      itemLink.setAttribute('href', itemUrl);          // assign url variable to href in <a> element
      itemLink.innerText = itemText;                   // assign label to <a> element text
      menuItem.appendChild(itemLink);                  // append link <a> to item <li>
      menuLinks.appendChild(menuItem);                 // append item <li> to menu <ol>
   }
}


// this function will create a menu using an ordered list with links
// to corresponding pages, based on the value-pair array.
function createMenu() {  
   var menuArrays = [
      {label: "Week 01 Experience - The Journey Begins!", url: "week01/index.html"},      
      {label: "Week 02 Experience - Re-learning Javascripts Fundamentals", url: "week02/index.html"}
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
   var menuLinks = document.getElementById('ol');      // assign <ol> to variable

   for (i = 0; i <= menuArrays.length - 1; i++) {
      var menuItem = document.createElement('li');     // create <li> element
      var itemLink = document.createElement('a');      // create <a> element
      var itemText = menuArrays[i].label;              // get label from array to variable
      var itemUrl =  menuArrays[i].url;                // get url from array to variable

      itemLink.setAttribute('href', itemUrl);          // assign url variable to href in <a> element
      itemLink.innerText = itemText;                   // assign label to <a> element text
      menuItem.appendChild(itemLink);                  // append link <a> to item <li>
      menuLinks.appendChild(menuItem);                 // append item <li> to menu <ol>
   }
}

