export const aThing = (times) => ({
  type: 'UPDATE_DEPARTURE_TIMES',
  times
})

//take "4:23 AM" format and
//return object with hours (24+ and minutes)
function to24Hour(sTime) {
  let am = sTime.substr(-2);
  let digits = sTime.match(/\d+/g);
  let hour = parseInt(digits[0]);
  let min = parseInt(digits[1]);
  if(am === 'PM') {
    if(hour !== 12)  hour += 12; 
  //trains run until  2:27 am in a single day so replies are over 24 hours
  } else if (hour < 3) {
    hour += 24;
  //12 AM
  } else if (hour === 12) {
    hour = 24;
  }
  return {hour: hour, min: min};
};

function getAPITime(time) {
  let hour = time.getHours();
  let min = time.getMinutes();
  let am =  hour >= 12 ? 'pm' : 'am';
  hour = hour % 12;
  if(hour === 0) hour = 12;
  if(min < 10) min = '0' + min;
  return hour + ':' + min + am;
};

function departHourMinutes(string) {
  let a = string.split(' '); 
  return {hour: parseInt(a[0]), min: parseInt(a[1])}
}


export const updateStartTime = (time, stn, dst, departTime) => {
  return function(dispatch) {
    let departHM = departHourMinutes(departTime);

    let tripTime = Date.now(); // + time * 1000;
    tripTime = new Date(tripTime);
    //if a time was selected
    if(departHM.hour > 0) {
      tripTime.setHours(departHM.hour, departHM.min);
    }
    //add biking time to station
    tripTime= new Date(tripTime.getTime() + time * 1000);

    let startHour = tripTime.getHours();
    let startMin = tripTime.getMinutes();
    let tripTimeAPIFormat = getAPITime(tripTime);

  
  function handler() {
     if(this.status == 200 &&
       this.responseXML != null) { 
        let times = this.responseXML.getElementsByTagName('trip');
        let timesArray = [];
        for(var i = 0; i < times.length; i++) {
          let orgTime = times[i].getAttribute('origTimeMin');
          let dstTime = times[i].getAttribute('destTimeMin');
          let fare = times[i].getAttribute('fare');
          let TT = times[i].getAttribute('tripTime');
          let time24 = to24Hour(orgTime);
          //only show trains you can actually catch
          if(time24.hour > startHour ||
              (time24.hour === startHour && time24.min > startMin)) {
              timesArray.push({
                orgTime: orgTime,
                dstTime: dstTime,
                tripTime: TT,
                fare: fare
             });
          }
        }
        dispatch(aThing(timesArray))
     } else {
        console.error('error fetching bart data')
     }
  }; 
  
  //https://xhr.spec.whatwg.org/
  let xhr = new XMLHttpRequest();
  xhr.onload = handler;
  xhr.open("GET", "http://api.bart.gov/api/sched.aspx?cmd=depart&a=4&orig=" + stn + "&dest=" + dst + "&time=" + tripTimeAPIFormat + "&key=MW9S-E7SL-26DU-VV8V" );
  xhr.send();
  }
}
