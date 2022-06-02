// Further Functions - Chapter 11 - Codes
let allOutput = '';
let spacer    = '<br>&nbsp;&nbsp;* ';

// Function Properties and Methods
let test1 = '<br><br><b><i><< Function Properties and Methods >></i></b>';
function square(x) {
    return x*x;
};
let code1 = (!square.length) ? square.length : 'undefined';
let code2 = (!square().length) ? square.length : 'undefined';

function sayHello(){
    return `Hello, my name is ${ this.name }`;
}
const clark = { name: 'Clark' };
const bruce = { name: 'Bruce' };
let code3 = sayHello.call(clark);
let code4 = sayHello.call(bruce);
let code5 = square.call(null, 4);
let code6 = square.apply(null, [4]);

// Custom Properties
let test2 = '<br><br><b><i><< Custom Properties >></i></b>';
square.description= 'Squares a number that is provided as an argument';
let code7 = square.description;

// Memorization
let test3 = '<br><br><b><i><< Memorization >></i></b>';
function square(x){
    square.cache = square.cache || {};
    if (!square.cache[x]) {
        square.cache[x] = x*x;
    }
    return square.cache[x]
}
square(3);
square(-11);
let code8 = square.cache;

// Immediately Invoked Function Expression
let test4 = '<br><br><b><i><< Immediately Invoked Function Expression >></i></b>';
(function(){
    const temp = 'World';
    console.log(`Hello ${temp}`);
})();

// Temporary Variables
let test5 = '<br><br><b><i><< Temporary Variables >></i></b>';
let a = 1;
let b = 2;

(()=>{
    const temp = a;
    a = b;
    b = temp;
})();

let code9 = a;
let code10 = b;
// console.log(temp);
let code11 = 'Error: "temp is not defined"';


// Initialization Code
let test6 = '<br><br><b><i><< Initialization Code >></i></b>';
(function() {
    const name = 'Peter Parker'; // This might be obtained from a cookie in reality
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday', 'Friday','Saturday'];
    const date = new Date(),today = days[date.getDay()];
    console.log(`Welcome back ${name}. Today is ${today}`);    
})();

// Note that much of this can be achieved in ES6 by simply placing the code inside a block. 
// This is because variables have block scope when const or let are used.
{
    const name = 'Peter Parker'; // This might be obtained from a cookie in reality
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday', 'Friday','Saturday'];
    const date = new Date(),today = days[date.getDay()];
    console.log(`Welcome back ${name}. Today is ${today}`);
}

// Creating Self-contained Code Blocks
let test7 = '<br><br><b><i><< Creating Self-contained Code Blocks >></i></b>';
(function() {
    // block A
    const name = 'Block A';
    console.log(`Hello from ${name}`);
}());

(function() {
    // block B
    const name = 'Block B';
    console.log(`Hello from ${name}`);
}());

// Functions that Define and Rewrite Themselves
let test8 = '<br><br><b><i><< Functions that Define and Rewrite Themselves >></i></b>';
function party(){
    console.log('Wow this is amazing!');
    party = function(){
        console.log('Been there, got the T-Shirt');
    }
}
const beachParty = party; // note that the party function has not been invoked
beachParty();
party();

// Init-Time Branching
let test9 = '<br><br><b><i><< Init-Time Branching >></i></b>';
function ride(){
    if (window.unicorn) { 
        ride = function(){
            // some code that uses the brand new and sparkly unicorn methods
            return 'Riding on a unicorn is the best!';
        }
    } else {
        ride = function(){
            // some code that uses the older pony methods
            return 'Riding on a pony is still pretty good';
        }
    }
    return ride();
}
let code12 = ride();

// Recursive Functions
let test10 = '<br><br><b><i><< Recursive Functions >></i></b>';
function factorial(n) {
    if (n === 0) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}
let code13 = factorial(4);

// Callbacks
let test11 = '<br><br><b><i><< Callbacks >></i></b>';
function wait(message, callback, seconds){
    setTimeout(callback,seconds * 1000);
    console.log(message);
}
function selfDestruct(){
    console.log('BOOOOM!');
}
wait('This tape will self-destruct in five seconds ... ', selfDestruct, 5);
console.log('Hmmm, should I accept this mission or not ... ?');


// Promises
let test12 = '<br><br><b><i><< Promises >></i></b>';
// Syntax...
// const promise = new Promise( (resolve, reject) => {
//     // initialization code goes here
//     if (success) {
//         resolve(value);
//     } else {
//         reject(error);
//     }
// });
const dice = {
    sides: 6,
    roll() {
        return Math.floor(this.sides * Math.random()) + 1;
    }
}
console.log('Before the roll');    
const roll = new Promise( (resolve,reject) => {
const n = dice.roll();
if(n > 1){
    setTimeout(()=>{resolve(n)},n*200);
} else {
    setTimeout(()=>reject(n),n*200);
}
});
roll.then(result => console.log(`I rolled a ${result}`) )
    .catch(result => console.log(`Drat! ... I rolled a ${result}`) );
console.log('After the roll');

// Generalized Functions
let test13 = '<br><br><b><i><< Generalized Functions >></i></b>';
function random(a,b=1) {
    // if only 1 argument is provided, we need to swap the values of a and b
    if (b === 1) {
        [a,b] = [b,a];
    } 
    return Math.floor((b-a+1) * Math.random()) + a;
    }
function random(a,b,callback) {
    if (b === undefined) b = a, a = 1; 

    const result = Math.floor((b-a+1) * Math.random()) + a;
    if(callback) {
        result = callback(result);
    }
    return result;
}
let code14 = random(7);
let code15 = random(11,15);
let code16 = random(1,5,square());

// Closures
let test14 = '<br><br><b><i><< Closures >></i></b>';
function outer() {
    const outside = 'Outside!';
    function inner() {
        const inside = 'Inside!';
        console.log(outside);
        console.log(inside);
    }
    console.log(outside);
    inner();
}
function closure() {
    const a = 1.8;
    const b = 32;
    return c => c * a + b;
}
const toFahrenheit = closure();
let code17 = toFahrenheit(30);

// Generators
let test15 = '<br><br><b><i><< Generators >></i></b>';
function* fibonacci(a,b) {
    let [ prev,current ] = [ a,b ];
    while(true) {
        [prev, current] = [current, prev + current];
        yield current;
    }
}
const sequence = fibonacci(1,1);
let code18 = sequence.next();
let code19 = sequence.next();
let code20 = sequence.next();



allOutput = test1 +
    spacer + code1 +
    spacer + code2 +
    spacer + code3 +
    spacer + code4 +
    spacer + code5 +
    spacer + code6 +
    test2 +
    spacer + code7 +
    test3 + 
    spacer + JSON.stringify(code8) +
    test4 + 
    spacer + 'look in Javascript Console!' +
    test5 +
    spacer + code9 +
    spacer + code10 +
    spacer + code11+
    test6 + 
    spacer + 'look in Javascript Console!' +
    test7 +
    spacer + 'look in Javascript Console!' +
    test8 +
    spacer + 'look in Javascript Console!' +
    test9 +
    spacer + code12 +
    test10 + 
    spacer + code13 +
    test11 +
    spacer + 'look in Javascript Console!' + spacer +
    'then wait for "Boom!" explosion in 5 seconds...' +
    test12 +
    spacer + 'look in Javascript Console!' +
    test13 +
    spacer + code14 +
    spacer + code15 +
    spacer + code16 +
    test14 +
    spacer + code17 +
    test15 +
    spacer + JSON.stringify(code18) +
    spacer + JSON.stringify(code19) +
    spacer + JSON.stringify(code20);
    
document.getElementById('divOutput').innerHTML = 
    '<b>JS Code Outcomes...</b> ' + allOutput + '';