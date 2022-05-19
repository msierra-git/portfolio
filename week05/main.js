/*==========================================================
 *   Course Code:     WDD330 - Web Frontend Development II *
 *   Student Name:    A. Michael Sierra                    *
 *   Description:     Chapter 10 Reading Exercises         *
 *   Date:            Week 05 - May 2022                   *
 ==========================================================*/

 'use strict';

// unicorn();
// main.js:11 Uncaught ReferenceError: unicorn is not defined


// Stack Traces
// function three(){ unicorn(); }
// function two(){ three(); }
// function one(){ two(); }
// one();
// Uncaught ReferenceError: unicorn is not defined
//     at three (main.js:15:19)
//     at two (main.js:16:17)
//     at one (main.js:17:17)
//     at main.js:18:1


// pi = 3.142;
// main.js:26 Uncaught ReferenceError: pi is not defined


// version 1.0
// function amIOldEnough(age){
//    if (age < 12) {
//        alert(age);
//        return 'No, sorry.';
//    } else if (age < 18) {
//        return 'Only if you are accompanied by an adult.';
//    }
//    else {
//        return 'Yep, come on in!';
//    }
// };


// console.log(amIOldEnough(21));
// outcome when condition is (age = 12)
// No, sorry.
// outcome when condition is changed to (age < 12)
// Yep, come on in!


// using Console
// function amIOldEnough(age){
//    console.log(age);
//        if (age < 12) {
//        console.log(`In the if with ${age}`);
//        return 'No, sorry.';
//        } else if (age < 18) {
//        console.log(`In the else-if with ${age}`);
//        return 'Only if you are accompanied by an adult.';
//        } else {
//        console.log(`In the else with ${age}`);
//        return 'Yep, come on in!';
//    }
// };
// outcome from the revised function (line #44)
// main.js:53 21
// main.js:61 In the else with 21
// main.js:44 Yep, come on in!


// Debugger
// function amIOldEnough(age){
//    debugger;
//        if (age < 12) {
//        debugger;
//        return 'No, sorry.';
//        } else if (age < 18) {
//        debugger;
//        return 'Only if you are accompanied by an adult.';
//        } else {
//        debugger;
//        return 'Yep, come on in!';
//    }
// };


// Error Objects
// const error = new Error();
// const error = new Error('Oops, something went wrong');
// const error = new TypeError('You need to use numbers in this function');


// Throwing Exceptions
// throw 2;
// throw 'Up';
// throw { toys: 'out of pram' };
// throw new Error('Something has gone badly wrong! MS');

// Sample
function squareRoot(number) {
   'use strict';
   if (number < 0) {
       throw new RangeError(`You can't find the square root of negative numbers`)
       }
   return Math.sqrt(number);
};

// console.log(squareRoot(121));
// console.log(squareRoot(-1));
// outcome >> 
// main.js:103 Uncaught RangeError: You can't find the square root of negative numbers
// at squareRoot (main.js:103:14)
// at main.js:109:13


//  Exception Handling
function imaginarySquareRoot(number) {
   'use strict';
   let answer;
   try {
      // return String(squareRoot(number));
      answer = String(squareRoot(number));
   } catch(error) {
      // return squareRoot(-number)+'i';
      answer = squareRoot(-number)+"i";
   } finally {
      return `+ or - ${answer}`;
   }
};

// console.log(imaginarySquareRoot(-49)); // no error message shown
// outcome >> 
// + or - 7i


// Tests
function itSquareRoots4() {
   return squareRoot(4) === 2;
};

console.log(itSquareRoots4());

// installing Jest for TDD framework -- it is created by Facebook!!!
// jest --version 
// mine is 28.1.0
// note that "jest -v" does NOT work. need to use "jest --version" instead