var moment = require('moment-timezone');
moment().format();
let inputData = {};

const getLocation = async (location='Paris') => {
  const url = `http://localhost:8080/geoNames?location=${location}`;
  return await fetch(url).then(response => response.json());
}

const handleLocation = async() => {
  const location = document.getElementById('location').value;
  return await getLocation(location).then(response => {
    inputData["latitude"] = response.lat;
    inputData["longitude"] = response.lng;
    inputData["city"] = response.name;
  })
}

const countdown = () => {
  const location = document.getElementById('location').value;
  const departureDate = moment(document.getElementById('departureDate').value);
  const homeDate = moment(document.getElementById('homeDate').value);
  const currentDate = moment().startOf('day');
  const daysUntilTrip = departureDate.diff(currentDate, "days");
  const lengthOfTrip = homeDate.diff(departureDate, "days");
  //if trip is more than one week from current date, show future forecast
  //else, show current forecast
  const arrival = document.getElementById('arrival');
  arrival.innerHTML = `You are leaving for ${location} in ${daysUntilTrip} days, and staying for ${lengthOfTrip} days!`;
}
 
const getWeather = async (lat, long, time) => {
  const urlWeather = `http://localhost:8080/darkSky?latitude=${lat}&longitude=${long}&time=${time}`;
  return await fetch(urlWeather).then(response => {
    return response.json()
  });
};

const handleWeather = time => {
  const lat = inputData["latitude"];
  const lng = inputData["longitude"];
  var skyconsIcon = new Skycons({"color": "pink"});
  //Divided by 1000 because JavaScript uses milliseconds as the unit of measurement, whereas Unix Time is in seconds
  let travelTime = new Date(document.getElementById('departureDate').value).getTime()/1000;
  getWeather(lat, lng, travelTime).then(response => {
  const icon = response["icon"];
  document.getElementById('weather').innerHTML = `<h2>Weather Forecast</h2>
  <p>Typical weather for then is:</p>
   <p>Low: ${response["temperatureLow"].toFixed(0)} degrees Farenheit</p> 
   <p>High: ${response["temperatureHigh"].toFixed(0)} degrees Farenheit</p>
   <p>${response["summary"]}</p>`;
   skyconsIcon.set(document.getElementById("icon1"), icon);
   skyconsIcon.play();
  });
}
const getPhoto = async (image="flower") => {
  const photoURL = `http://localhost:8080/photo?location=${image}`;
  return await fetch(photoURL).then(response => {
    return response.json();
  })
};


export { getLocation, handleLocation, countdown, getWeather, handleWeather, getPhoto };
