// const assignLinks = [
//    {
//       label: "Week 01 -Notes",
//       url: "week01/index.html"
//    }
// ]

var select = document.getElementById('ol');
var array = ["html", "css", "js", "jquery", "Angularjs"];

for (var i = 0; i < array.length; i++) {
  var li = document.createElement("li");
  var link = document.createElement("a");
  link.setAttribute('href', '#');
  li.appendChild(link);
  var text = document.createTextNode(array[i]);
  link.appendChild(text);
  select.insertBefore(li, select.childNodes[i]);
}