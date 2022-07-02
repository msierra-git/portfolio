
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
      })
   ;
}

export function toTitleCase(str) {
   return str.replace(
     /\w\S*/g,
     function(txt) {
       return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
     }
   );
 }
 
// export const getLocation = function (options) {
//    return new Promise(function (resolve, reject) {
//       navigator.geolocation.getCurrentPosition(resolve, reject, options);
//    });
// };

// export function getLocation(options) {
//    // console.log('getLocation function');
//    return new Promise(function (resolve, reject) {
//       navigator.geolocation.getCurrentPosition(resolve, reject, options);
//    });
// }
