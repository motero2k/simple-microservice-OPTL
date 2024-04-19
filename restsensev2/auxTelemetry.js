function logTime() {
    // Get current date/time
    const currentTime = new Date();
    
    // Extract minutes and seconds
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    
    // Log the time
    console.log(`${minutes}:${seconds}`);
};

export function startClock() {
    // Log the time every second
    return setInterval(logTime, 1000);
};

export function stopClock(clockId) {
    // Stop the clock
    clearInterval(clockId);
};
