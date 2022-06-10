showPeople();

function getJSON(url) {
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

function getPeople(url) {
  return getJSON(url);
}

function renderPeopleList(peoples, peopleListElement) {
  // I decided to use a table to display my list of ships. The shipList Element is that table and it has 2 children: thead and tbody...we need to put our ships into tbody...so I reference the second child.
  const list = peopleListElement.children[1];
  list.innerHTML = "";
  //loop through the ships
  peoples.forEach(function (people) {
    // console.log(people);
    //create elements for list...tr
    let listItem = document.createElement("tr");
    listItem.innerHTML = `
          <td><a href="${people.url}">${people.name}</a></td>
          <td>${people.gender}</td>
          <td>${people.height}</td>
          `;

    listItem.addEventListener("click", function (event) {
      //when clicked the default link behavior should be stopped, and the ship details function should be called...passing the value of the href attribute in
      event.preventDefault();
      getPersonDetails(people.url);
    });

    //add the list item to the list
    list.appendChild(listItem);
  });
}

function showPeople(url = "https://swapi.dev/api/people") {
  getPeople(url).then(function (data) {
    const results = data.results;
    formatPageNav(data.previous, data.next);

    const peopleListElement = document.getElementById("peoplelist");
    renderPeopleList(results, peopleListElement);

    // enable the next and prev buttons.
    if (data.next) {
      const next = document.getElementById("next");
      // normally we would prefer the addEventListener method of adding a listener. Using something like 'element.onEvent = event_function' has the limitation of only being able to hold one listener of the type we choose. In this case that is a good thing however. Because we are not re-creating the buttons each time we load a new batch of data we could end up with several listeners attached to each button by the last page. We won't have that issue here.
      next.onclick = () => {
        // notice to show the next page we just re-call the showShips function with a new URL
        showPeople(data.next);        
      };
    }
    if (data.previous) {
      const prev = document.getElementById("prev");

      prev.onclick = () => {
        showPeople(data.previous);
      };
    }
  });
}

// Additional Codes for stretch challenge
const listPersonDiv = document.getElementById('personDetails');

function formatPageNav(prev, next) {
  let prevButton = document.getElementById("prevB");
  let nextButton = document.getElementById("nextB");

  (!prev) ? prevButton.classList.add("hidden"): prevButton.classList.remove("hidden");
  (!next) ? nextButton.classList.add("hidden"): nextButton.classList.remove("hidden");
  resetPersonDetails();
}

function getPersonDetails(url) {
  //call getJSON functions for the provided url
  getPeople(url).then(function (data) {
    resetPersonDetails();
    renderPersonDetails(data);
  });
}

function resetPersonDetails() {
  listPersonDiv.innerHTML = "";
}

function renderPersonDetails(personData) {  
  let line1 = document.createElement('hr');
  let line2 = document.createElement('hr');
  let ul = document.createElement('ul');
  let hd4 = document.createElement('h4');
  
  hd4.textContent = "Details of " + personData["name"];
  listPersonDiv.appendChild(line1);
  line1.after(hd4);
  hd4.after(ul);
  
  for ( let key in personData) {
    let li = document.createElement('li');
    let spField = document.createElement('span');
    let spValue = document.createElement('span');

    spField.textContent = toTitleCase(key) + ": ";
    spValue.textContent = personData[key];
    spField.setAttribute("class", "personFieldName");

    li.appendChild(spField);
    spField.after(spValue);
    ul.appendChild(li);
  }
  
ul.after(line2);
}

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}