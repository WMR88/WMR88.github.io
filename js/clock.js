setInterval(showTime, 1000);

function showTime() {
    date = new Date();

    hour = date.getHours();
    min = date.getMinutes();
    sec = date.getSeconds();
    am_pm = 'AM';

    if (hour > 12) {
        houur -= 12;
        am_pm = "PM";
    }
    if (hour === 0) {
        hour = 12;
        am_pm = "AM"
    }

    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
  
    let currentTime = hour + ":" 
    + min + ":" + sec + am_pm;
  
    document.getElementById("clock")
    .innerHTML = currentTime;
}
showTime();