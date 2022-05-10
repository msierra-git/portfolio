// << Forms Code Exercises >>
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

// --> Use placeholder attributes instead of assigning values using js
const input2 = form['search-box'];

// --> Custom actions in submitting the form //
form.addEventListener('submit', search, false);

function search(event) {
   //  alert(' Form Submitted');
   alert(`You Searched for: ${input2.value}`);
   event.preventDefault();
}



// << OOP Code Exercises >>
// --> ES6 introduced class declaration syntax
console.log('<< OOP in JavaScript >>');
console.log('<< Dice Class Exercises >>');
// The DICE class
class Dice {
   constructor(sides = 6) {
      Object.defineProperty(this, 'sides', {
         get() {
            return `This dice has ${sides} sides`;
         },
         set(value) {
            if (value > 0) {
               sides = value;
               return sides;
            } else {
               throw new Error('The number of sides must be positive');
            }
         }
      });

      this.roll = function () {
         return Math.floor(sides * Math.random() + 1)
      }
   }
   // moving inside the constructor
   // roll() {
   //    return Math.floor(this.sides * Math.random() + 1)
   // }

   static description() {
      return 'A way of choosing random numbers'
   }
}
// creating instance of the Dice class
const blueDice = new Dice(20);
console.log(blueDice);
console.log('Rolling Blue Dice: ' + blueDice.roll());

// using constructor to instantiate a copy of an object
const greenDice = new blueDice.constructor(10);
console.log('Green Dice sides: ' + greenDice.sides);

// static method is called from the Dice class
console.log('Dice static description: ' + Dice.description());

// Static methods are not available to instances of the class.
// console.log('Dice static description: ' + greenDice.description()); 
// Uncaught TypeError: greenDice.description is not a function

const yellowDice = new Dice;
yellowDice.sides = 10;
// yellowDice.sides = 0;    // will return the error
console.log('Yellow Dice: ' + yellowDice.sides);


console.log('');
console.log('<< Turtle Class Exercises >>');

// The TURTLE Class
class Turtle {
   constructor(name, color) {
      this.name = name;
      this.weapon = 'hands';
      let _color = color;
      this.setColor = color => {
         if (typeof color === 'string') {
            return _color = color;
         } else {
            throw new Error('Color must be a string');
         }
      }
      this.getColor = () => _color;
   }
   sayHi() {
      return `Hi dude, my name is ${this.name}`;
   }
   swim() {
      return `${this.name} paddles in the water`;
   }
   toString() {
      return `A turtle called ${this.name}`;
   }
   // will be created using prototype
   // attack() {
   //    return `Feel the power of my ${this.weapon}!`;
   // }
}

// instantiate Leonardo 
const leo = new Turtle('Leonardo');
leo.weapon = 'Katana Blades'; // overwrite weapon
leo.setColor('Blue');
console.log(leo);
console.log(leo.name + ' (object)');
console.log(leo.toString());
console.log('SayHI method: ' + leo.sayHi());
console.log('Color property: ' + leo.getColor());

// using Prototype to access the class and its properties
Turtle.prototype;
Turtle.prototype.weapon = 'Feet';
Turtle.prototype.food = 'Pizza';

// adding methods using prototype
Turtle.prototype.attack = function () {
   return `Feel the power of my ${this.weapon}!`;
}
Turtle.prototype.eat = function () {
   return `Mmm, this ${this.food} tastes great!`;
}

// instantiate Raphael
const raph = new Turtle('Raphael');
console.log(raph);
raph.weapon = 'Sai'; // overwrite weapon
raph.setColor('Red');
console.log(raph.name + ' (object)');
console.log(raph.toString());
console.log('SayHI method: ' + raph.sayHi());
console.log('Weapon property: ' + raph.weapon);
console.log('Attack method: ' + raph.attack());
console.log('Color property: ' + raph.getColor());

// instantiate Donatello
const don = new Turtle('Donatello', 'Purple');
console.log(don);
don.weapon = 'Bo Staff'; // overwrite weapon
console.log(don.name + ' (object)');
console.log(don.toString());
console.log('Weapon property: ' + don.weapon);
console.log('Color property: ' + don.getColor());

// instantiate Michelangelo
const mike = new Turtle('Michelangelo', 'Orange');
console.log(mike);
mike.weapon = 'Nunchakus'; // overwrite weapon
console.log(mike.name + ' (object)');
console.log(mike.toString());
console.log('Weapon property: ' + mike.weapon);
console.log('Eat method: ' + mike.eat());
console.log('Attack method: ' + mike.attack());
console.log('Color property: ' + mike.getColor());


console.log('');
console.log('<< NinjaTurtle Class Exercises >>');

// The NINJA-TURTLE Class
class NinjaTurtle extends Turtle {
   constructor(name) {
      super(name);
      this.weapon = 'hands';
   }
   attack() {
      return `Feel the power of my ${this.weapon}!`
   }
}

const team = new NinjaTurtle('A-Team');
console.log(team);
console.log('toString(): ' + team.toString());

console.log('');
console.log('<< Prototype Exercises >>');

// different ways to find out prototype
console.log(leo.constructor.prototype);
console.log(Object.getPrototypeOf(raph));
console.log(don.__proto__);
// prototype chain
console.log(Object.getPrototypeOf(Object.getPrototypeOf(raph)));