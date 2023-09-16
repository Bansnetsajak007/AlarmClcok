const set_button = document.getElementById('set');
const setAlarmAt = document.getElementById('setAlarmAt');
const input_period = document.getElementById('period');
const ringtoneSelect = document.getElementById('ringtone'); // Added ringtone select element

const audioElement = document.getElementById('audio');
let audio;

let hour;
let minutes;
let seconds;
let period;

const alarmKey = 'savedAlarm';

const clock = () => {
  const display_time = document.getElementById('time');

  const date = new Date();

  hour = date.getHours();
  minutes = date.getMinutes();
  seconds = date.getSeconds();
  period = hour >= 12 ? 'PM' : 'AM';

  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  const time = `${hour}:${minutes}:${seconds}:${period}`;

  display_time.innerText = time;
};

setInterval(clock, 1000);

const set_alarm = () => {
  let alarmTimeAt = setAlarmAt.value;
  alarmTimeAt = alarmTimeAt.split(':');
  let inputPeriod = input_period.value;
  const selectedRingtone = ringtoneSelect.value; // Get the selected ringtone

  let alarmHours = parseInt(alarmTimeAt[0]);
  let alarmMinutes = parseInt(alarmTimeAt[1]);

  const alarmDetails = document.querySelector('.alarm-details');

  alarmDetails.innerHTML = ''; // Removing all the HTML

  const p = document.createElement('p');

  p.textContent = `Alarm set for ${alarmHours}:${alarmMinutes}:${inputPeriod}`;

  alarmDetails.appendChild(p);

  // Save the alarm time, period, and ringtone to localStorage
  const alarmData = {
    hours: alarmHours,
    minutes: alarmMinutes,
    period: inputPeriod,
    ringtone: selectedRingtone,
  };
  localStorage.setItem(alarmKey, JSON.stringify(alarmData));
};

set_button.addEventListener('click', function () {
  set_alarm(); // Displaying the alarm details in UI

  let alarmTimeAt = setAlarmAt.value;
  let inputPeriod = input_period.value;
  const selectedRingtone = ringtoneSelect.value; // Get the selected ringtone

  alarmTimeAt = alarmTimeAt.split(':');

  let selectedPeriod = inputPeriod.toUpperCase();

  let alarmHours = parseInt(alarmTimeAt[0]);
  let alarmMinutes = parseInt(alarmTimeAt[1]);

  let currentDate = new Date();
  // Copy of current date
  let alarmDate = new Date(currentDate);

  alarmDate.setHours(alarmHours, alarmMinutes, 0, 0);

  let timeDifference = alarmDate - currentDate;

  if (period === selectedPeriod) {
    setTimeout(function () {
      let interval = setTimeout(function () {
        audio = new Audio(selectedRingtone); // Use the selected ringtone
        audio.play();
      }, 0);

      setTimeout(function () {
        clearTimeout(interval);
      }, 10000);
    }, timeDifference);
  }
});

// Check if there is a saved alarm and set it
const savedAlarmData = localStorage.getItem(alarmKey);
if (savedAlarmData) {
  const alarmData = JSON.parse(savedAlarmData);
  setAlarmAt.value = `${alarmData.hours}:${alarmData.minutes}`;
  input_period.value = alarmData.period;
  ringtoneSelect.value = alarmData.ringtone; // Set the selected ringtone
  set_alarm();
}