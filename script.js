if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
    .then(() => console.log("Service Worker Registered"));
}

// Function to calculate equally spaced times during the day
function generateReminderTimes() {
  const startOfDay = 8; // Start at 8:00 AM
  const endOfDay = 20; // End at 8:00 PM
  const numberOfReminders = 5;
  const interval = (endOfDay - startOfDay) / (numberOfReminders - 1);
  
  const times = [];
  for (let i = 0; i < numberOfReminders; i++) {
    const time = startOfDay + i * interval;
    const hours = Math.floor(time);
    const minutes = Math.round((time - hours) * 60);
    times.push(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`);
  }
  return times;
}

// Render reminders
function renderReminders() {
  const reminderList = document.getElementById("reminder-list");
  reminderList.innerHTML = ""; // Clear previous reminders

  reminderTimes.forEach((time, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <span>${time}</span>
      <button onclick="completeReminder(${index})" id="btn-${index}">Complete</button>
    `;
    reminderList.appendChild(listItem);
  });
}

// Complete a reminder
function completeReminder(index) {
  reminderTimes.splice(index, 1); // Remove the completed reminder
  renderReminders(); // Re-render the list
}

// Generate reminder times and render them
const reminderTimes = generateReminderTimes();
renderReminders();
