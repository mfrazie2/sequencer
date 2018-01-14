(function main() {
  let intervalTimer,
      stepNumber = 1;

  
  document.getElementById('start').addEventListener('click', function() { startInterval(100); });
  document.getElementById('stop').addEventListener('click', stopInterval);

  function startInterval(bpm) {
    let interval = convertBPMToMS(bpm);
    intervalTimer = setInterval(startSequencer, interval);
  }

  function stopInterval() {
    clearInterval(intervalTimer);
  }

  function convertBPMToMS(bpm) {
    return 1000 * (1 / ( bpm / 60 ));
  }

  function startSequencer() {
    if (stepNumber > 16) stepNumber = 1;
    let prevStepNumber;
    if (stepNumber === 1) {
      prevStepNumber = 16;
    } else {
      prevStepNumber = stepNumber - 1;
    }

    let currentEl = document.getElementsByClassName(`button${stepNumber}`)[0];
    let previousEl = document.getElementsByClassName(`button${prevStepNumber}`)[0];
    
    toggleActiveStep(currentEl);
    toggleActiveStep(previousEl);

    stepNumber++;
  }

  function toggleActiveStep(element) {
    element.classList.toggle('activeStep');
  }
})()