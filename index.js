const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

const formatTime = (time) => {
  const hours = String(Math.floor(time / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
  const seconds = String(time % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

const parseTimeToSeconds = (timeString) => {
  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};

const createTimerAnimator = () => {
  let intervalId;

  return (seconds) => {
    if (intervalId) {
      clearInterval(intervalId);
    }

    let remainingSeconds = seconds;

    const updateTimer = () => {
      timerEl.textContent = formatTime(remainingSeconds);
      remainingSeconds--;

      if (remainingSeconds < 0) {
        clearInterval(intervalId);
      }
    };

    updateTimer();
    intervalId = setInterval(updateTimer, 1000);
  };
};

const animateTimer = createTimerAnimator();

buttonEl.addEventListener('click', () => {
  const inputTime = inputEl.value;
  const seconds = parseTimeToSeconds(inputTime);
  
  if (!isNaN(seconds)) {
    animateTimer(seconds);
  }

  inputEl.value = '';
});
