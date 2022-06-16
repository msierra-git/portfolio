const keys = document.querySelectorAll('.key');

keys.forEach(key => 
   key.addEventListener('transitionend', removeTransition)
);

function playSound(e) {
   const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
   const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
   // console.log(audio);
   if (!audio) return;
   audio.currentTime = 0;
   audio.play();
   // console.log(key);
   key.classList.add('playing');
   // key.classList.remove('playing');
   // key.classList.toggle('playing');
}

function removeTransition(e) {
   if (e.propertyName !== 'transform') return;
   this.classList.remove('playing');
}

window.addEventListener('keydown', playSound);