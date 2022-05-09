// --> Different ways to access form and elements //
// const form = document.forms[0];
// const form = document.getElementsByTagname('form')[0];
// const form = document.forms.search;
const form = document.forms['search'];

// const [input,button] = form.elements;
// const input = form.elements.searchInput;
const input = form['searchInput'];
input.value = 'Search Here';

// --> Adding form events //
// input.addEventListener('focus',  () => alert('focused'), false);
// input.addEventListener('blur',   () => alert('blurred'), false);
// input.addEventListener('change', () => alert('changed'), false);

// --> Adding default values using form events //
input.addEventListener('focus', function () {
   if (input.value === 'Search Here') {
      input.value = ''
   }
}, false);

input.addEventListener('blur', function () {
   if (input.value === '') {
      input.value = 'Search Here';
   }
}, false);

// --> Custom actions in submitting the form //
form.addEventListener ('submit', search, false);
function search(event) {
   //  alert(' Form Submitted');
   alert(`You Searched for: ${input.value}`);
   event.preventDefault();
}