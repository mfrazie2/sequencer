(function main() {
  let intervalTimer,
      stepNumber = 1,
      isNewSequence = true,
      isRunning = false;

  let sequence = [
    [1,4], [], [3], [],
    [2,4], [], [3], [],
    [1,4], [], [3], [],
    [2,4], [], [1], [5,2],
  ];

  /*
    // let sequence = [
    //   [9], [9], [9], [9],
    //   [9], [9], [9], [9],
    //   [9], [9], [9], [9],
    //   [9], [9], [9], [9],
    // ];
  */

  document.addEventListener('keyup', startStopOnSpace);
  addEventListener('start', startListener);

  function convertBPMToMS(bpm) {
    return 1000 * (1 / ( bpm / 60 )) / 4;
  }

  function runSequencer() {
    if (stepNumber > 16) stepNumber = 1;
    let prevStepNumber;
    if (stepNumber === 1) {
      prevStepNumber = 16;
    } else {
      prevStepNumber = stepNumber - 1;
    }

    let currentEl = getElementByStepNumber(stepNumber);
    let previousEl = getElementByStepNumber(prevStepNumber);

    toggleActiveStep(currentEl);
    if (!isNewSequence) toggleActiveStep(previousEl);

    playStepSounds(stepNumber);

    stepNumber++;
    isNewSequence = false;
  }

  function startInterval(bpm) {
    let interval = convertBPMToMS(bpm);
    isRunning = true;
    intervalTimer = setInterval(runSequencer, interval);
    runSequencer();
  }

  function stopInterval() {
    clearInterval(intervalTimer);
    if (isRunning) toggleActiveStep(getElementByStepNumber(stepNumber - 1));
    stepNumber = 1;
    isNewSequence = true;
    isRunning = false;
  }

  /* LISTENERS START */
    function startListener() {
      startInterval(95);
      addEventListener('stop', stopListener);
      removeEventListener('start', startListener);
    }

    function stopListener() {
      stopInterval();
      removeEventListener('stop', stopListener);
      addEventListener('start', startListener);
    }

    function startStopOnSpace(e) {
      if (e.keyCode === 32) {
        if (isRunning) {
          stopListener();
        } else {
          startListener();
        }
      }
    }
  /* LISTENERS END */


  /* HELPERS START */
    function getElementByStepNumber(stepNumber) {
      return document.getElementsByClassName(`button${stepNumber}`)[0];
    }

    function toggleActiveStep(element) {
      element.classList.toggle('activeStep');
    }

    function playStepSounds(stepNumber) {
      let step = sequence[stepNumber - 1];
      step.forEach(playSound);
    }

    function playSound(buttonNumber) {
      let audio = document.querySelector(`audio[data-button="${buttonNumber}"]`);
      audio.currentTime = 0;
      audio.play();
    }

    function addEventListener(id, listener) {
      document.getElementById(id).addEventListener('click', listener);
    }

    function removeEventListener(id, listener) {
      document.getElementById(id).removeEventListener('click', listener);
    }
  /* HELPERS END */
})()