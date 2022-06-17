// Window Object examples

// console.log(window.alert('Hello'));
// returned undefined
// console.log(window.confirm('Do you wish to continue?'));
// will either return true or false depending no the button clicked
// console.log(window.prompt('Please enter your name:'));
// return null if cancel button is clicked
// otherwise will return the value typed in

let read1 = document.getElementById('reading1');

let spCmd1 = document.createElement('span');
let spVal1 = document.createElement('span');
spCmd1.setAttribute('class', 'cmd');
spCmd1.textContent = "window.navigator.userAgent >> ";
spVal1.textContent = window.navigator.userAgent;

let spCmd2 = document.createElement('span');
let spVal2 = document.createElement('span');
spCmd2.setAttribute('class', 'cmd');
spCmd2.textContent = "window.location.href >> ";
spVal2.textContent = window.location.href;

let spCmd3 = document.createElement('span');
let spVal3 = document.createElement('span');
spCmd3.setAttribute('class', 'cmd');
spCmd3.textContent = "window.location.protocol >> ";
spVal3.textContent = window.location.protocol;

let spCmd4 = document.createElement('span');
let spVal4 = document.createElement('span');
spCmd4.setAttribute('class', 'cmd');
spCmd4.textContent = "window.location.host >> ";
spVal4.textContent = window.location.host;

let spCmd5 = document.createElement('span');
let spVal5 = document.createElement('span');
spCmd5.setAttribute('class', 'cmd');
spCmd5.textContent = "window.location.hostname >> ";
spVal5.textContent = window.location.hostname;

let spCmd6 = document.createElement('span');
let spVal6 = document.createElement('span');
spCmd6.setAttribute('class', 'cmd');
spCmd6.textContent = "window.location.port >> ";
spVal6.textContent = window.location.port;

let spCmd7 = document.createElement('span');
let spVal7 = document.createElement('span');
spCmd7.setAttribute('class', 'cmd');
spCmd7.textContent = "window.location.pathname >> ";
spVal7.textContent = window.location.pathname;

let spCmd8 = document.createElement('span');
let spVal8 = document.createElement('span');
spCmd8.setAttribute('class', 'cmd');
spCmd8.textContent = "window.location.origin >> ";
spVal8.textContent = window.location.origin;

let spCmd9 = document.createElement('span');
let spVal9 = document.createElement('span');
spCmd9.setAttribute('class', 'cmd');
spCmd9.textContent = "window.location.toString() >> ";
spVal9.textContent = window.location.toString();

let spCmd10 = document.createElement('span');
let spVal10 = document.createElement('span');
spCmd10.setAttribute('class', 'cmd');
spCmd10.textContent = "window.screen.height >> ";
spVal10.textContent = window.screen.height;

let spCmd11 = document.createElement('span');
let spVal11 = document.createElement('span');
spCmd11.setAttribute('class', 'cmd');
spCmd11.textContent = "window.screen.width >> ";
spVal11.textContent = window.screen.width;

let spCmd12 = document.createElement('span');
let spVal12 = document.createElement('span');
spCmd12.setAttribute('class', 'cmd');
spCmd12.textContent = "window.screen.availHeight >> ";
spVal12.textContent = window.screen.availHeight;

let spCmd13 = document.createElement('span');
let spVal13 = document.createElement('span');
spCmd13.setAttribute('class', 'cmd');
spCmd13.textContent = "window.screen.availWidth >> ";
spVal13.textContent = window.screen.availWidth;

let spCmd14 = document.createElement('span');
let spVal14 = document.createElement('span');
spCmd14.setAttribute('class', 'cmd');
spCmd14.textContent = "window.screen.colorDepth >> ";
spVal14.textContent = window.screen.colorDepth;

let popup = '';
function openPopup() {
   popup = window.open('https://sitepoint.com', 'SitePoint',
      'width=400,height=400,resizable=yes', '_blank');
}

function closePopup() {
   let userRes = window.confirm('Do you wish to continue closing popup?');
   if (userRes) {
      popup.close();
   }
}

function moveWin() {
   window.moveTo(0, 0);
}

function resizeWin() {
   popup.resizeTo(600, 400);
}

read1.appendChild(spCmd1);
read1.appendChild(spVal1);
read1.appendChild(document.createElement("br"));
read1.appendChild(spCmd2);
read1.appendChild(spVal2);
read1.appendChild(document.createElement("br"));
read1.appendChild(spCmd3);
read1.appendChild(spVal3);
read1.appendChild(document.createElement("br"));
read1.appendChild(spCmd4);
read1.appendChild(spVal4);
read1.appendChild(document.createElement("br"));
read1.appendChild(spCmd5);
read1.appendChild(spVal5);
read1.appendChild(document.createElement("br"));
read1.appendChild(spCmd6);
read1.appendChild(spVal6);
read1.appendChild(document.createElement("br"));
read1.appendChild(spCmd7);
read1.appendChild(spVal7);
read1.appendChild(document.createElement("br"));
read1.appendChild(spCmd8);
read1.appendChild(spVal8);
read1.appendChild(document.createElement("br"));
read1.appendChild(spCmd9);
read1.appendChild(spVal9);
read1.appendChild(document.createElement("br"));
read1.appendChild(spCmd10);
read1.appendChild(spVal10);
read1.appendChild(document.createElement("br"));
read1.appendChild(spCmd11);
read1.appendChild(spVal11);
read1.appendChild(document.createElement("br"));
read1.appendChild(spCmd12);
read1.appendChild(spVal12);
read1.appendChild(document.createElement("br"));
read1.appendChild(spCmd13);
read1.appendChild(spVal13);
read1.appendChild(document.createElement("br"));
read1.appendChild(spCmd14);
read1.appendChild(spVal14);
read1.appendChild(document.createElement("br"));


// Cookies
document.cookie = 'name=Superman'
document.cookie = 'hero=true'
document.cookie = 'city=Metropolis'
// override values
document.cookie = 'name=Batman'
document.cookie = 'city=Gotham'
console.log(document.cookie);

// reading and formatting cookies
const cookies = document.cookie.split("; ");
for (crumb of cookies) {
   const [key, value] = crumb.split("=");
   console.log(`The value of ${key} is ${value}`);
}

// setting expiration for cookies
const expiryDate = new Date();
const tomorrow = expiryDate.getTime() + 1000 * 60 * 60 * 24;
expiryDate.setTime(tomorrow);
document.cookie = `name=Batman; expires=${expiryDate.toUTCString()}`;

// secure cookies
document.cookie = 'name=Batman; secure';

// deleting cookies
document.cookie = 'name=Batman; expires=Thu, 01 Jan 1970 00:00:01 GMT';

console.log(document.cookie);


// window.setTimeout( () => alert("Time's Up!"), 3000);
// window.setTimeout( () => alert("Time's Up!"), 3000);
// window.clearTimeout(5);

// function chant(){ console.log('Beetlejuice'); }
// const summon = window.setInterval(chant,1000);
// window.clearInterval(summon);

// const person = {
//    name: 'Superman',
//    introduce() { 
//        console.log(`Hi, I'm ${this.name}`);
//    }
// };               
// setTimeout(person.introduce, 50);


// Animation
// const squareElement = document.getElementById('square');
// let angle = 0;

// setInterval( () => {
//     angle = (angle + 2) % 360;
//     squareElement.style.transform = `rotate(${angle}deg)`
// }, 1000/60);

const squareElement = document.getElementById('square');
let angle = 0;
let continueAnimation = true;

function rotate() {
   if(!continueAnimation){return};
   angle = (angle + 2) % 360;
   squareElement.style.transform = `rotate(${angle}deg)`

   window.requestAnimationFrame(rotate);   
}
const id = requestAnimationFrame(rotate);

function startRotate() {
   continueAnimation = true;
   requestAnimationFrame(rotate);
}

function cancelRotate() {
   continueAnimation = false;
}