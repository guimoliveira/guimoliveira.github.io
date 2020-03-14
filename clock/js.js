var timersDiv = document.getElementById("timers");
var alarmsDiv = document.getElementById("alarms");

var timeDiv = document.getElementById("time");

var chronoDiv = document.getElementById("chrono");
var chronoButton = document.getElementById("chronoButton");

var audio = new Audio("alarm.mp3");

var iTimer = 0, iAlarm = 0;

var running = false;
var startTime;

function askPermission() {
  if (window.Notification && Notification.permission !== "granted") {
    Notification.requestPermission(function (status) {
      if (Notification.permission !== status) {
        Notification.permission = status;
      }
    });
  }
}

function notify(msg) {
  var not = new Notification(msg);	
  not.onclick = function(){
    audio.pause();
    audio.currentTime = 0;
  }
}

function addAlarm() {
  
  var br = document.createElement("br");

  var input = document.createElement("input");
  input.type = "time";
  input.className = "input alarm";
  input.id = "alarm" + iAlarm;

  var del = document.createElement("input");
  del.type = "button";
  del.className = "delete";
  del.value = "X";
  del.id = "delete" + iAlarm;

  del.onclick = function(){
    alarmsDiv.removeChild(input);
    alarmsDiv.removeChild(del);
    alarmsDiv.removeChild(br);
  };

  alarmsDiv.appendChild(input);
  alarmsDiv.appendChild(del);
  alarmsDiv.appendChild(br);

  iAlarm++;

  askPermission();

}

function addTimer() {

  var br = document.createElement("br");

  var input = document.createElement("input");
  input.type = "time";
  input.className = "input timer";
  input.id = "timer" + iTimer;

  var del = document.createElement("input");
  del.type = "button";
  del.className = "delete";
  del.value = "X";
  del.id = "delete" + iTimer;

  del.onclick = function(){
    timersDiv.removeChild(input);
    timersDiv.removeChild(del);
    timersDiv.removeChild(br);
  };

  timersDiv.appendChild(input);
  timersDiv.appendChild(del);
  timersDiv.appendChild(br);

  iTimer++;

  askPermission();

}

function update() {
  var timers = timersDiv.getElementsByClassName("timer");
  var alarms = alarmsDiv.getElementsByClassName("alarm");

  var today = new Date();

  var hour = today.getHours();
  var min = today.getMinutes();
  var sec = today.getSeconds();

  if (hour < 10) hour = "0" + hour;
  if (min < 10) min = "0" + min;
  if (sec < 10) sec = "0" + sec;

  timeDiv.innerHTML = hour + ":" + min + ":" + sec;

  for (let j = 0; j < alarms.length; j++) {
    let alarm = alarms[j];
    let time = alarm.value;

    let date = new Date(today.toDateString() + ' ' + time);

    let dif = Math.abs(date - today);

    if (dif <= 500) {
      audio.play();
      if (window.Notification && Notification.permission === "granted") {
        notify("Temporizador.");
      } else {
        alert("Alarme: " + time);
        audio.pause();
        audio.currentTime = 0;
      }
    }
  }

  for (let j = 0; j < timers.length; j++) {
    let timer = timers[j];
    let time = timer.value;

    if (timer == document.activeElement || time == "") continue;

    let date = new Date((new Date(today.toDateString() + ' ' + time)).getTime() - 1000);

    let hours = date.getHours();
    let mins = date.getMinutes();

    if (hours <= 0 && mins <= 0) {

      audio.play();

      if (window.Notification && Notification.permission === "granted") {
        notify("Temporizador.");
      } else {
        alert("Temporizador.");
        audio.pause();
        audio.currentTime = 0;
      }

      timer.value = "";
      continue;
    }

    if (hours < 10) hours = "0" + hours;
    if (mins < 10) mins = "0" + mins;

    timer.value = hours + ":" + mins;

  }

  if (running) {
    var dif = today.getTime() - startTime.getTime();

    var hours = parseInt(dif / 3600000) % 24;
    var mins = parseInt(dif / 60000) % 60;
    var secs = parseInt(dif / 1000) % 60;

    if (hours < 10) hours = "0" + hours;
    if (mins < 10) mins = "0" + mins;
    if (secs < 10) secs = "0" + secs;

    chronoDiv.innerHTML = hours + ":" + mins + ":" + secs;
  }

}

function startStop() {
  running = !running;

  if (running) {
    startTime = new Date();
    chronoButton.value = "Parar";
  } else {
    chronoButton.value = "Iniciar";
  }
}

try {
  addAlarm();
  addTimer();
  setInterval(update, 1000);
} catch (e) {
  document.body.innerHTML = "<center style='color: white'>Navegador incompatível</center>";
}
