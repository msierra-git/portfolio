/*==========================================================
 *   Course Code:     WDD330 - Web Frontend Development II *
 *   Student Name:    A. Michael Sierra                    *
 *   Description:     Project 2 - Star Wars Team App       *
 *   Date:            June - July 2022                     *
 ==========================================================*/

 
export function getJSON(url) {
   return fetch(url)
      .then(function (response) {
         if (!response.ok) {
            throw Error(response.statusText);
         } else {
            return response.json();
         }
      })
      .catch(function (error) {
         console.log(error);
      });
}


export function toTitleCase(str) {
   return str.replace(
      /\w\S*/g,
      function (txt) {
         return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
   );
}
