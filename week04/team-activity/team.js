let currentPlayer = 1;
let board = document.querySelector("#ticTac");

// version #1 for adding event listener
// board.addEventListener('touchend', (a) => {
//    if (a.target.innerHTML.length > 0) {
//       // stretch challenge -- add rule for user to choose empty slot
//       alert("Choose another field!");
//    } else {
//       a.target.innerHTML = playerEntry()
//    }
// }, false);


board.addEventListener('click', handler, false);
// board.addEventListener('touchend', handler, false);


function handler(event) {
   if (event.target.innerHTML.length > 0) {
      // stretch challenge -- add rule for user to choose empty slot
      alert("Choose another field!");
   } else {
      event.target.innerHTML = playerEntry()
   }
}


function playerEntry() {
   if (currentPlayer === 1) {
      currentPlayer = 2;
      return 'X';
   } else {
      currentPlayer = 1;
      return 'O';
   }
}

function reset() {
   const divBoard = document.querySelector('#ticTac');
   for (let i = 0; i < divBoard.children.length; i++) {
      divBoard.children[i].innerText = '';
   }
}