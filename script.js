const timetable = {
    Monday: [
        { start: "08:00", end: "09:30", subject: "Chem 1 - HHX @ E1-08" },
        { start: "09:30", end: "10:00", subject: "Recess" }, // Adjusted recess time for clearer display
        { start: "10:00", end: "11:30", subject: "EL 1 - DCKY @ E1-08" }, // Adjusted EL time
        { start: "11:30", end: "12:30", subject: "Math 1 - LSH @ E1-08" },
        { start: "12:30", end: "13:30", subject: "Lunch" },
        { start: "13:30", end: "15:00", subject: "Phys 1 - BG @ E1-08" },
        { start: "15:00", end: "16:00", subject: "Assembly - T @ Venue" },
        { start: "16:00", end: "17:30", subject: "CCA - T @ Venue" }
    ],
    Tuesday: [
        { start: "08:00", end: "09:30", subject: "Bio 1 - VWYL @ E1-08" },
        { start: "09:30", end: "10:30", subject: "PE - FKM/AKSY/DTYY/KLKF" },
        { start: "10:30", end: "11:00", subject: "Recess" },
        { start: "11:00", end: "12:30", subject: "CS 1 - CCES @ Com 3" },
        { start: "12:30", end: "18:30", subject: "Lunch" } // This lunch slot looks very long. Consider if it's correct.
    ],
    Wednesday: [
        { start: "08:00", end: "09:30", subject: "Hum 1 - HPS @ E1-08" },
        { start: "09:30", end: "10:30", subject: "Math 1/2 - LSH + CVL" },
        { start: "10:30", end: "11:00", subject: "Recess" },
        { start: "11:00", end: "12:30", subject: "Phys 1 - BG @ E1-08" },
        { start: "12:30", end: "13:30", subject: "Lunch" },
        { start: "13:30", end: "15:00", subject: "CCE - T @ Venue" },
        { start: "15:00", end: "16:30", subject: "EL 1 - DCKY @ E1-08" }
    ],
    Thursday: [
        { start: "08:00", end: "09:30", subject: "Hum 1 - HPS @ E1-08" },
        { start: "09:30", end: "10:30", subject: "PE - FKM/AKSY/DTYY/KLKF" },
        { start: "10:30", end: "11:00", subject: "Recess" },
        { start: "11:00", end: "12:30", subject: "HCL/CL/HD/MHML @ Labs" },
        { start: "12:30", end: "13:30", subject: "Lunch" },
        { start: "13:30", end: "15:00", subject: "Art 1 - GKWB @ Art Studio" }
    ],
    Friday: [
        { start: "08:00", end: "08:30", subject: "Mentoring" },
        { start: "08:30", end: "10:00", subject: "HCL/CL/MHML/HD @ Labs" },
        { start: "10:00", end: "10:30", subject: "Recess" },
        { start: "10:30", end: "11:30", subject: "EL 1 - DCKY @ E1-08" },
        { start: "11:30", end: "12:30", subject: "Math 1/2 - LSH/CVL" },
        { start: "12:30", end: "13:30", subject: "Lunch" },
        { start: "13:30", end: "15:00", subject: "DV D&E 1 - PCH/AJ @ D&E Lab" },
        { start: "15:00", end: "17:30", subject: "CCA - T @ Venue" }
    ]
};

const currentLessonEl = document.getElementById("current-lesson");
const currentTimeEl = document.getElementById("current-time");
const dailyTimetableEl = document.getElementById("daily-timetable");

/**
 * Gets the current time in HH:MM format.
 * @returns {string} Current time as a string (e.g., "09:00").
 */
function getCurrentTimeHHMM() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

/**
 * Gets the current lesson based on the current time and day.
 * @param {string} currentDay - The current day of the week (e.g., "Monday").
 * @param {string} currentTime - The current time in HH:MM format.
 * @returns {object|null} The current lesson object, or null if no lesson is found.
 */
function findCurrentLesson(currentDay, currentTime) {
    const todaySchedule = timetable[currentDay];
    if (!todaySchedule) return null;

    for (const slot of todaySchedule) {
        if (currentTime >= slot.start && currentTime < slot.end) {
            return slot;
        }
    }
    return null;
}

/**
 * Updates the "What's Happening Now?" display.
 */
function updateCurrentLessonDisplay() {
    const now = new Date();
    const day = now.toLocaleDateString('en-SG', { weekday: 'long' });
    const currentTime = getCurrentTimeHHMM();

    const currentLesson = findCurrentLesson(day, currentTime);

    if (!timetable[day]) {
        currentLessonEl.innerHTML = "🎉 **It's the weekend!** No schedule today.";
        return;
    }

    if (currentLesson) {
        currentLessonEl.innerHTML = `🕒 **Now:** ${currentLesson.subject} (${currentLesson.start} – ${currentLesson.end})`;
    } else {
        // Check if all lessons for the day have finished
        const todaySchedule = timetable[day];
        const lastLesson = todaySchedule[todaySchedule.length - 1];
        if (lastLesson && currentTime >= lastLesson.end) {
            currentLessonEl.innerHTML = "✅ **All lessons for today are done!**";
        } else {
            currentLessonEl.innerHTML = "😌 **No lesson currently.** Enjoy the break!";
        }
    }
}

/**
 * Renders the full timetable for the current day.
 */
function renderDailyTimetable() {
    const now = new Date();
    const day = now.toLocaleDateString('en-SG', { weekday: 'long' });
    const currentTime = getCurrentTimeHHMM();

    const todaySchedule = timetable[day];
    if (!todaySchedule) {
        dailyTimetableEl.innerHTML = "<p>No timetable available for today.</p>";
        return;
    }

    let html = '<ul>';
    todaySchedule.forEach(slot => {
        const isCurrent = (currentTime >= slot.start && currentTime < slot.end);
        const highlightClass = isCurrent ? 'highlight-current' : '';
        html += `<li class="${highlightClass}">
                    <span class="time-slot">${slot.start} – ${slot.end}</span>
                    <span class="subject-name">${slot.subject}</span>
                </li>`;
    });
    html += '</ul>';
    dailyTimetableEl.innerHTML = html;
}

/**
 * Updates the current time display.
 */
function updateCurrentTimeDisplay() {
    const now = new Date();
    currentTimeEl.innerText = now.toLocaleTimeString('en-SG', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

// Initial calls and interval setup
function initializeTracker() {
    updateCurrentTimeDisplay();
    updateCurrentLessonDisplay();
    renderDailyTimetable();
}

initializeTracker();
setInterval(initializeTracker, 1 * 1000); // Update every 1 second
