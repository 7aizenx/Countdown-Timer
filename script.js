document.addEventListener('DOMContentLoaded', function() {
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const eventDisplay = document.getElementById('event-display');
    const startButton = document.getElementById('start-countdown');
    const eventNameInput = document.getElementById('event-name');
    const eventDateInput = document.getElementById('event-date');
    
    // Set minimum date to today
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    eventDateInput.setAttribute('min', formattedDate);
    
    // Default to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    eventDateInput.value = tomorrow.toISOString().split('T')[0];
    
    let countdownInterval;
    let targetDate;
    
    startButton.addEventListener('click', function() {
        // Clear any existing interval
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }
        
        const eventName = eventNameInput.value || 'Your Special Day';
        const eventDate = new Date(eventDateInput.value);
        
        if (isNaN(eventDate.getTime())) {
            alert('Please select a valid date');
            return;
        }
        
        targetDate = eventDate;
        eventDisplay.textContent = `Countdown to ${eventName}: ${eventDate.toLocaleDateString()}`;
        
        // Start the countdown
        updateCountdown();
        countdownInterval = setInterval(updateCountdown, 1000);
    });
    
    function updateCountdown() {
        const now = new Date();
        const difference = targetDate - now;
        
        if (difference <= 0) {
            clearInterval(countdownInterval);
            daysElement.textContent = '0';
            hoursElement.textContent = '0';
            minutesElement.textContent = '0';
            secondsElement.textContent = '0';
            eventDisplay.textContent = `${eventNameInput.value || 'Your event'} has arrived! 🎉`;
            return;
        }
        
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        daysElement.textContent = days;
        hoursElement.textContent = hours;
        minutesElement.textContent = minutes;
        secondsElement.textContent = seconds;
        
        // Add animation effect
        daysElement.style.transform = 'scale(1.05)';
        setTimeout(() => {
            daysElement.style.transform = 'scale(1)';
        }, 100);
    }
    
    // Set a demo countdown on page load
    eventNameInput.value = "Demo Event";
    startButton.click();
});