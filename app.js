const set_button = document.getElementById('set');
const setAlarmAt = document.getElementById('setAlarmAt')
const input_period = document.getElementById('period');


const audio = new Audio('audio.mp3');

//decleared in global scope accessable for all block scope
let hour;
let minutes;
let seconds;
let period;

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

}

setInterval(clock,1000);


const set_alarm = () => {

  let alarmTimeAt = setAlarmAt.value;
  alarmTimeAt = alarmTimeAt.split(":");
  let inputPeriod = input_period.value;

  let alarmHours = parseInt(alarmTimeAt[0]);
  let alarmMinutes = parseInt(alarmTimeAt[1]);

  const alarmDetails = document.querySelector('.alarm-details');

  alarmDetails.innerHTML = ''; //removing all the html 

  const p = document.createElement('p');

  p.textContent = `Alarm set for ${alarmHours}:${alarmMinutes}:${inputPeriod}`;

  alarmDetails.appendChild(p);
}





set_button.addEventListener('click', function() {

  set_alarm(); //displaying the alarm details in UI
  
  let alarmTimeAt = setAlarmAt.value;
  let inputPeriod = input_period.value;

  alarmTimeAt = alarmTimeAt.split(":");

  let selectedPeriod = inputPeriod.toUpperCase();


  let alarmHours = parseInt(alarmTimeAt[0]);
  let alarmMinutes = parseInt(alarmTimeAt[1]);


  let currentDate = new Date();
  // Copy of current date
  let alarmDate = new Date(currentDate);


  alarmDate.setHours(alarmHours, alarmMinutes, 0, 0);

  let timeDifference = alarmDate - currentDate;

if(period === selectedPeriod){
  setTimeout(function() {
    let interval = setTimeout(function() {
        audio.play(); 
    }, 0)

    setTimeout(function() {
        clearTimeout(interval);
    }, 10000)
},timeDifference)
}
})





