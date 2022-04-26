/* Defining Table
* Input: function to get the number from a user within the textbox
* Processing: Compute the sum of all the numbers, up to the entered value by the user
* Output: Show the rounded total amount to the user.
*/

function getUserValues() {
   const userNumber1 = parseInt(document.getElementById('txtNumber1').value);
   const userNumber2 = parseInt(document.getElementById('txtNumber2').value);
   const userNumbers = [userNumber1, userNumber2];
   return userNumbers;
}

function computeTotal() {    
   // Get value from the user     
   const maxNumber = getUserValues();

   let total = 0;
   for (let i = 1; i <= (maxNumber[0]); i++) {
      total += i;
   }
   
   // Display the answer to the user
   showOutput(total);
}

function addNumbers() {
   const userNumbers = getUserValues();
   showOutput(userNumbers[0] + userNumbers[1]);
}

function subtractNumbers() {
   const userNumbers = getUserValues();
   showOutput(userNumbers[0] - userNumbers[1]);
}

function multiplyNumbers() {
   const userNumbers = getUserValues();
   showOutput(userNumbers[0] * userNumbers[1]);
}

function showOutput(outcome) {
   // Display the answer to the user. 
   document.getElementById('divOutput').innerHTML=outcome; 
}