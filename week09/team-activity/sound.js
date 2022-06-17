
let keyCount = { 65: 0, 83: 0, 68: 0, 70: 0, 71: 0, 72: 0, 74: 0, 75: 0, 76: 0};

const keys = document.querySelectorAll('.key');
// console.log(keys);

keys.forEach(key =>
   key.addEventListener('transitionend', removeTransition)
);

function playSound(e) {
   // console.log(e.keyCode);

   const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
   // console.log(key);

   const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
   // console.log(audio);

   if (audio) {
      audio.currentTime = 0;
      audio.play();

      key.classList.add('playing');
      // key.classList.remove('playing');
      // key.classList.toggle('playing');
      (keyCount[e.keyCode] < 10) ? keyCount[e.keyCode] += 1: keyCount[e.keyCode] = 0;
      
      // moving the button 10px down
      console.log(keyCount[e.keyCode]);
      let newMargin = (10 * keyCount[e.keyCode]) + 10;   
      key.style.marginTop = `${newMargin}px`;
   }   
}

function removeTransition(e) {
   if (e.propertyName !== 'transform') return;
   this.classList.remove('playing');
}

window.addEventListener('keydown', playSound);