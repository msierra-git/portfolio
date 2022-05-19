'use strict';


//  version #4 with exceptions
function factorsOf(n) {
   if (Number.isNaN(Number(n))) {
      throw new RangeError('Argument Error: Value must be an integer');
   }
   if (n < 0) {
      throw new RangeError('Argument Error: Number must be positive');
   }
   if (!Number.isInteger(n)) {
      throw new RangeError('Argument Error: Number must be an integer');
   }
   const factors = [];
   for (let i = 1, max = Math.sqrt(n); i <= max; i++) {
      if (n % i === 0) {
         factors.push(i, n / i);
      }
   }
   return factors.sort((a, b) => a - b);
}

// version #3 refactored
// function factorsOf(n) {
//    const factors = [];
//    for (let i = 1, max = Math.sqrt(n); i <= max; i++) {
//       if (n % i === 0) {
//          factors.push(i, n / i);
//       }
//    }
//    return factors.sort((a, b) => a - b);
// }

// version #2 updated function
// function factorsOf(n) {
//    const factors = [];
//    for (let i = 1; i <= n; i++) { // change on this line
//       if (n / i === Math.floor(n / i)) {
//          factors.push(i);
//       }
//    }
//    return factors;
// }

// version #1
// function factorsOf(n) {
//    const factors = [];
//    for (let i = 1; i < n; i++) {
//       if (n / i === Math.floor(n / i)) {
//          factors.push(i);
//       }
//    }
//    return factors;
// }


test('factors of 12', () => {
   expect(factorsOf(12)).toEqual([1, 2, 3, 4, 6, 12]);
});

test('2 is prime', () => {
   expect(isPrime(2)).toBe(true);
});

test('10 is not prime', () => {
   expect(isPrime(10)).not.toBe(true);
});

// << First run >>
// Michael@MS-MacBook-Pro week05 % jest -c {}
//  PASS  ./squareroot.test.js
//  FAIL  ./numberCruncher.test.js
//   ● factors of 12
// 
//     ReferenceError: factorsOf is not defined
// 
//       1 | test('factors of 12', () => {
//     > 2 |    expect(factorsOf(12)).toEqual([1,2,3,4,6,12]);
//         |    ^
//       3 | });
// 
//       at Object.expect (numberCruncher.test.js:2:4)
// 
// Test Suites: 1 failed, 1 passed, 2 total
// Tests:       1 failed, 1 passed, 2 total
// Snapshots:   0 total
// Time:        0.676 s, estimated 1 s
// Ran all test suites.


// << Second Run >>
// Michael@MS-MacBook-Pro week05 % jest -c {}
//  FAIL  ./numberCruncher.test.js
//   ● factors of 12
// 
//     expect(received).toEqual(expected) // deep equality
// 
//     - Expected  - 1
//     + Received  + 0
// 
//     @@ -2,7 +2,6 @@
//         1,
//         2,
//         3,
//         4,
//         6,
//     -   12,
//       ]
// 
//       13 |
//       14 | test('factors of 12', () => {
//     > 15 |    expect(factorsOf(12)).toEqual([1,2,3,4,6,12]);
//          |                          ^
//       16 | });
//       17 |
//       18 | // First run
// 
//       at Object.toEqual (numberCruncher.test.js:15:26)
// 
//  PASS  ./squareroot.test.js
// 
// Test Suites: 1 failed, 1 passed, 2 total
// Tests:       1 failed, 1 passed, 2 total
// Snapshots:   0 total
// Time:        0.674 s, estimated 1 s
// Ran all test suites.


//  << Third Run using the updated function >>
// Michael@MS-MacBook-Pro wdd330 % jest -c {}
//  PASS  portfolio/week05/numberCruncher.test.js
//  PASS  portfolio/week05/squareroot.test.js

// Test Suites: 2 passed, 2 total
// Tests:       2 passed, 2 total
// Snapshots:   0 total
// Time:        0.552 s, estimated 1 s
// Ran all test suites.


it('should throw an exception for non-numerical data', () => {
   expect(() => factorsOf('twelve')).toThrow();
});

it('should throw an exception for negative numbers', () => {
   expect(() => factorsOf(-2)).toThrow();
});

it('should throw an exception for non-integer numbers', () => {
   expect(() => factorsOf(3.14159)).toThrow();
});

test('non-numerical data returns not prime', () => {
   expect(isPrime('two')).toBe(false);
});

test('non-integer numbers return not prime', () => {
   expect(isPrime(1.2)).toBe(false);
});

test('negative numbers return not prime', () => {
   expect(isPrime(-1)).toBe(false);
});

// Michael@MS-MacBook-Pro wdd330 % jest -c {}
//  FAIL  portfolio/week05/numberCruncher.test.js
//   ● should throw an exception for non-numerical data
// 
//     expect(received).toThrow()
// 
//     Matcher error: received value must be a function
// 
//     Received has type:  array
//     Received has value: []
// 
//       123 |
//       124 | it('should throw an exception for non-numerical data', () => {
//     > 125 |    expect(factorsOf('twelve')).toThrow();
//           |                                ^
//       126 | });
//       127 |
//       128 | it('should throw an exception for negative numbers', () => {
// 
//       at Object.toThrow (portfolio/week05/numberCruncher.test.js:125:32)
// 
//   ● should throw an exception for negative numbers
// 
//     expect(received).toThrow()
// 
//     Received function did not throw
// 
//       127 |
//       128 | it('should throw an exception for negative numbers', () => {
//     > 129 |    expect(() => factorsOf(-2)).toThrow();
//           |                                ^
//       130 | });
//       131 |
//       132 | it('should throw an exception for non-integer numbers', () => {
// 
//       at Object.toThrow (portfolio/week05/numberCruncher.test.js:129:32)
// 
//   ● should throw an exception for non-integer numbers
// 
//     expect(received).toThrow()
// 
//     Received function did not throw
// 
//       131 |
//       132 | it('should throw an exception for non-integer numbers', () => {
//     > 133 |    expect(() => factorsOf(3.14159)).toThrow();
//           |                                     ^
//       134 | });
//       135 |
//       136 | test('non-numerical data returns not prime', () => {
// 
//       at Object.toThrow (portfolio/week05/numberCruncher.test.js:133:37)
// 
//  PASS  portfolio/week05/squareroot.test.js
// 
// Test Suites: 1 failed, 1 passed, 2 total
// Tests:       3 failed, 7 passed, 10 total
// Snapshots:   0 total
// Time:        0.729 s, estimated 1 s
// Ran all test suites.


// version #2
function isPrime(n) {
   try {
      return factorsOf(n).length === 2;
   } catch (error) {
      return false;
   }
}

// version #1
// function isPrime(n) {
//    return factorsOf(n).length === 2;
// }

// <<<< Final Output >>>>
// Michael@MS-MacBook-Pro wdd330 % jest -c {}
//  PASS  portfolio/week05/numberCruncher.test.js
//  PASS  portfolio/week05/squareroot.test.js

// Test Suites: 2 passed, 2 total
// Tests:       10 passed, 10 total
// Snapshots:   0 total
// Time:        0.624 s, estimated 1 s
// Ran all test suites.