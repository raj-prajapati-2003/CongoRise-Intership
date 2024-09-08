const targetDateInput = document.getElementById('target-date');
const startButton = document.getElementById('start-timer');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

let countdownInterval;

// Start the countdown timer
function startCountdown() {
    const targetDate = new Date(targetDateInput.value);
    if (isNaN(targetDate.getTime())) {
        alert('Please select a valid date and time.');
        return;
    }

    clearInterval(countdownInterval);

    countdownInterval = setInterval(() => {
        const now = new Date();
        const timeRemaining = targetDate - now;

        if (timeRemaining <= 0) {
            clearInterval(countdownInterval);
            daysElement.textContent = '00';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            alert('Countdown finished!');
            return;
        }

        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        daysElement.textContent = days.toString().padStart(2, '0');
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
    }, 1000);
}

// Event listener for the start button
startButton.addEventListener('click', startCountdown);
