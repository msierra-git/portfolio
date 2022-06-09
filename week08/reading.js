// var canvas = document.getElementById("myCanvas"); 
// var context = canvas.getContext("2d"); 
// context.strokeStyle = "red";
// context.fillStyle = "rgba(0, 0, 255, 0.5)";
// context.fillRect(10, 10, 100, 100);   
// context.strokeRect(10, 10, 100, 100);
drawGradient();

function drawGradient() {
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	context.strokeStyle = "red";
	var gradient = context.createLinearGradient(0, 0, 0, 200);
	gradient.addColorStop(0, "blue");
	gradient.addColorStop(1, "white");
	context.fillStyle = gradient;
	context.fillRect(10, 10, 100, 100);
	context.strokeRect(10, 10, 100, 100);
}


// Drag and Drop example
var mice = document.querySelectorAll("#mouseContainer img");
var mouse = null;
for (var i=0; i < mice.length; i++) {
    mouse = mice[i];
	//  console.log(mouse);
	 mouse.addEventListener("dragstart", function (event) {
		event.dataTransfer.setData("text/plain", this.id); 
  });
}

var cat = document.getElementById("cat");
cat.addEventListener("dragover", function(event) {
	event.preventDefault();
}, false);
cat.addEventListener("drop", function(event) {
	// console.log("cat event called");
	var mouseHash = {
	mouse1: 'NOMNOMNOM',
	mouse2: 'Meow',
	mouse3: 'Purrrrrr ...'
	};

	var catHeading = document.getElementById("catHeading");
	var mouseID = event.dataTransfer.getData("text/plain");
	catHeading.innerHTML = mouseHash[mouseID];
	console.log(mouseID);
	var mousey = document.getElementById(mouseID);
	mousey.parentNode.removeChild(mousey);
	event.preventDefault();
}, false);


