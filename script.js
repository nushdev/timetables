const timetable = {
  Monday: [
    { start: "08:00", end: "09:30", subject: "Chem 1 - HHX @ E1-08" },
    { start: "10:00", end: "10:30", subject: "Recess" },
    { start: "10:30", end: "12:00", subject: "EL 1 - DCKY @ E1-08" },
    { start: "12:00", end: "13:00", subject: "Math 1 - LSH @ E1-08" },
    { start: "13:00", end: "14:00", subject: "Lunch" },
    { start: "14:00", end: "15:00", subject: "Phys 1 - BG @ E1-08" },
    { start: "15:00", end: "16:00", subject: "Assembly - T @ Venue" },
    { start: "16:00", end: "17:30", subject: "CCA - T @ Venue" }
  ],
  Tuesday: [
    { start: "08:00", end: "09:30", subject: "Bio 1 - VWYL @ E1-08" },
    { start: "09:30", end: "10:30", subject: "PE - FKM/AKSY/DTYY/KLKF" },
    { start: "10:30", end: "11:00", subject: "Recess" },
    { start: "11:00", end: "12:30", subject: "CS 1 - CCES @ Com 3" },
    { start: "12:30", end: "18:30", subject: "Lunch" }
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

function getCurrentLesson() {
  const now = new Date();
  const day = now.toLocaleDateString('en-SG', { weekday: 'long' });
  const time = now.toTimeString().slice(0, 5); // HH:MM

  const today = timetable[day];
  if (!today) return "🎉 It's the weekend!";

  for (const slot of today) {
    if (time >= slot.start && time < slot.end) {
      return `🕒 Now: ${slot.subject} (${slot.start} – ${slot.end})`;
    }
  }
  return "😎 No lesson currently.";
}

function updateLesson() {
  document.getElementById("current-lesson").innerText = getCurrentLesson();
  const now = new Date();
  document.getElementById("current-time").innerText =
    "Current time: " + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

updateLesson();
setInterval(updateLesson, 1 * 1000); // update every 30s
