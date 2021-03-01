let startTime;
let elapsedTime = 0;
let timerIntervalID;

// Helper Fns

const print = (id, text) => {
  document.getElementById(id).innerHTML = text;
}

const showButton = btnFn => {
  // use arg 'play' to show play btn & hide pause btn
  const btnToShow = (btnFn === 'play' ? playButton : pauseButton);
  const btnToHide = (btnFn === 'play' ? pauseButton : playButton);

  btnToShow.style.display = "block";
  btnToHide.style.display = "none";
}

// Primary Fns

const timeToString = time => {
  let timeInHrs = time / 1000 / 60 / 60;
  let hh = Math.floor(timeInHrs);

  let timeInMins = (timeInHrs - hh) * 60;
  let mm = Math.floor(timeInMins);

  let timeInSecs = (timeInMins - mm) * 60;
  let ss = Math.floor(timeInSecs);

  let timeInMs = (timeInSecs - ss) * 100;
  let ms = Math.floor(timeInMs);

  let formattedHh = hh.toString().padStart(2, '0');
  let formattedMm = mm.toString().padStart(2, '0');
  let formattedSs = ss.toString().padStart(2, '0');
  let formattedMs = ms.toString().padStart(2, '0');

  return `${formattedMm}:${formattedSs}:${formattedMs}`;
}

const start = () => {
  startTime = Date.now() - elapsedTime;
  timerIntervalID = setInterval(function printTime() {
    elapsedTime = Date.now() - startTime;
    print('display', timeToString(elapsedTime));
  }, 30);

  showButton('pause');
}

const pause = () => {
  clearInterval(timerIntervalID);
  showButton('play');

}

const reset = () => {
  // stop interval
  // set elapsed to 0
  // set display to 00:00:00
  clearInterval(timerIntervalID);
  elapsedTime = 0;
  print('display', '00:00:00');
  showButton('play');
}


// Targeting buttons

let playButton = document.getElementById('playButton');
let pauseButton = document.getElementById('pauseButton');
let resetButton = document.getElementById('resetButton');

// Add event listeners to buttons

playButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
