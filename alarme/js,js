var timersDiv = document.getElementById("timers");
var i = 0;

function add() {
  var br = document.createElement("br");

  var input = document.createElement("input");
  input.type = "time";
  input.className = "timer";
  input.id = "timer"+i;

  var del = document.createElement("input");
  del.type = "button";
  del.className = "delete";
  del.value = "X";
  del.id = "delete"+i;
  del.onclick = function(){
    timersDiv.removeChild(input);
    timersDiv.removeChild(del);
    timersDiv.removeChild(br);
  };

  timersDiv.appendChild(input);
  timersDiv.appendChild(del);
  timersDiv.appendChild(br);

  i++;

  if (window.Notification && Notification.permission !== "granted") {
      Notification.requestPermission(function (status) {
        if (Notification.permission !== status) {
          Notification.permission = status;
        }
      });
  }

}

function verify() {
  var timers = timersDiv.getElementsByClassName("timer");

  var today = new Date();

  for (var j = 0; j < timers.length; j++) {
    let timer = timers[j];
    let time = timer.value;

    let date = new Date(today.toDateString() + ' ' + time);

    let dif = Math.abs(date - today);

    if (dif <= 30000) {
      if (window.Notification && Notification.permission === "granted") {
        var t;
        function createNot() {
          var not = new Notification("Despertador - " + time + " - Clique para parar.");	
          t = setTimeout(createNot, 30000);
          not.onclick = function(){clearTimeout(t);}
        }
        createNot();
      } else {
        alert("Despertador: " + time);
      }
    }
  }

}

setInterval(verify, 60000);
