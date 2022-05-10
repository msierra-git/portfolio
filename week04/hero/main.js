// document.forms.hero.heroName.focus();

const form = document.forms['hero'];
form.addEventListener('submit', makeHero, false);

// defaults
form.powers[1].checked = true;
form.category[0].checked = true;
form.origin.value = 'Born as Kal-El on the planet Krypton...';

function makeHero(event) {
   event.preventDefault(); // prevent the form from being submitted
   const hero = {}; // create an empty object
   
   hero.name = form.heroName.value; // create a name property based on the input field's value
   hero.realName = form.realName.value;
   // hero.powers = [];
   // for (let i=0; i < form.powers.length; i++) {
   //    if (form.powers[i].checked) {
   //       hero.powers.push(form.powers[i].value);
   //    }
   // }

   // refactoring for loop codes 
   hero.powers = [...form.powers].filter(box => box.checked).map(box => box.value);
   hero.category = form.category.value;
   hero.age = form.age.value;
   hero.city = form.city.value;
   hero.origin = form.origin.value;

   validateInline(hero);
   // convert object to JSON string and display in alert dialog 
   // alert(JSON.stringify(hero)); 

   return hero;
}

function validate(event) {
   const firstLetter = form.heroName.value[0];
   if (firstLetter.toUpperCase() === 'X') {
       event.preventDefault();
       alert('Your name is not allowed to start with X!');
   }
}

const label = form.querySelector('label');
const error = document.createElement('div');
error.classList.add('error');
error.textContent = '! Your name is not allowed to start with X.';
label.append(error);

function validateInline(hero) {
   //  const heroName = this.value.toUpperCase();
   //  const heroName1 = form.heroName.value.toUpperCase();
    if(hero.name.toUpperCase().startsWith('X')) {
      // event.preventDefault();
      error.style.display = 'block';
    } else {
      error.style.display = 'none';
      // convert object to JSON string and display in alert dialog 
      alert(JSON.stringify(hero)); 
    }
}