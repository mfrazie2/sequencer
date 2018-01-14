(function main() {
  let intervalTimer,
      stepNumber = 1,
      isNewSequence = true;

  
  document.getElementById('start').addEventListener('click', function() { 
    isNewSequence ? startInterval(100) : null; 
  });
  document.getElementById('stop').addEventListener('click', stopInterval);

  function startInterval(bpm) {
    let interval = convertBPMToMS(bpm);
    intervalTimer = setInterval(startSequencer, interval);
  }
  
  function stopInterval() {
    clearInterval(intervalTimer);
    toggleActiveStep(getElementByStepNumber(stepNumber - 1));
    stepNumber = 1;
    isNewSequence = true;
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

    let currentEl = getElementByStepNumber(stepNumber);
    let previousEl = getElementByStepNumber(prevStepNumber);
    
    toggleActiveStep(currentEl);
    if (!isNewSequence) toggleActiveStep(previousEl);

    stepNumber++;
    isNewSequence = false;
  }

  function getElementByStepNumber(stepNumber) {
    return document.getElementsByClassName(`button${stepNumber}`)[0];
  }

  function toggleActiveStep(element) {
    element.classList.toggle('activeStep');
  }
})()