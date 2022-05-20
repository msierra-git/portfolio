const imgBasePath = "//byui-cit.github.io/cit261/examples/";


export function showHikeList(hikes) {
   const hikeListElement = document.getElementById("hikes");
   hikeListElement.innerHTML = "";
   renderHikeList(hikes, hikeListElement);
}

// modified by M.Sierra
export function renderHikeList(hikes, parent) {
   hikes.forEach(hike => {
      let liItem = renderOneHike(hike);
      parent.appendChild(liItem);
      bindHikeListener(parent, liItem, hike, hikes);
   });
}

function renderOneHike(hike) {
   const item = document.createElement("li");

   item.innerHTML = ` <h2>${hike.name}</h2>
          <div class="image"><img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>
          <div class="details">
                  <div>
                      <h3>Distance</h3>
                      <p>${hike.distance}</p>
                  </div>
                  <div>
                      <h3>Difficulty</h3>
                      <p>${hike.difficulty}</p>
                  </div>
          </div>`;

   return item;
}

// added by M.Sierra
function showHikeDetails(hike, item) {
   let divDesc = document.createElement("div");
   divDesc.setAttribute("id", "hikeDetails");
   divDesc.innerHTML = `
                  <div>
                     <h3>Description</h3>
                     <p>${hike.description}</p>
                  </div>
                  <div>
                     <h3>Directions</h3>
                     <p>${hike.directions}</p>
                  </div>
   `;
   if (item.querySelector("#hikeDetails") === null) {
      item.appendChild(divDesc);
   }
   return item;
}

// added by M.Sierra
function bindHikeListener(parent, item, hike, hikes) {
   item.addEventListener("click", function () {
      parent.innerHTML = "";
      parent.appendChild(showHikeDetails(hike, item));
      // item.appendChild
      bindResetListener(parent, hikes);
   }, false);
}

// added by M.Sierra
function bindResetListener(parent, hikes) {
   let resetButton = document.createElement("button");
   resetButton.innerHTML = "View Full List";

   resetButton.addEventListener("click", (e) => {
      e.preventDefault();
      showHikeList(hikes);
   }, false);

   parent.appendChild(resetButton);
}