function squareRoot(number) {
   'use strict';
   if (number < 0) {
      throw new RangeError("You can't find the square root of negative numbers")
   }
   return Math.sqrt(number);
};

test('square root of 4 is 2', () => {
   expect(squareRoot(4)).toBe(2);
});
// Michael@MS-MacBook-Pro week05 % jest -c {}
//  PASS  ./squareroot.test.js
//  ✓ square root of 4 is 2 (3 ms)

// Test Suites: 1 passed, 1 total
// Tests:       1 passed, 1 total
// Snapshots:   0 total
// Time:        0.526 s
// Ran all test suites.