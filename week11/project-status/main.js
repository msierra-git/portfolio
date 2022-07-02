import { getJSON } from "./utilities.js";

import StarWars from './StarWars.js';

let arrTest = new StarWars();
// arrTest.getStarWarsAllInfo();
console.log(arrTest.getStarWarsAllInfo());

// // Make a list of Unique Teams from API
// let starwars = [];
// const baseURL = 'https://akabab.github.io/starwars-api/api';

// async function getStarWarsInfo(baseURL) {
//    const query = baseURL + '/all.json';

//    // use the getJSON function and the position provided to build out the correct URL to get the data we need.  
//    // Store it into variable, then return it

//    // fetch the data
//    starwars = await getJSON(query);

//    console.log(starwars);
//    return starwars;
// }

// getStarWarsInfo(baseURL);

// async function getJSON(url) {
//    return fetch(url)
//       .then(function (response) {
//          if (!response.ok) {
//             console.log('error...');
//             throw Error(response.statusText);
//          } else {
//             return response.json();
//          }
//       })
//       .catch(function (error) {
//          console.log('error...');
//          console.log(error);
//       })
//    ;
// }

// console.log(getJSON(baseURL));