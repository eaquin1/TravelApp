var moment = require('moment-timezone');
moment().format();
let inputData = {};

//Divided by 1000 because JavaScript uses milliseconds as the unit of measurement, whereas Unix Time is in seconds
//let time = new Date(document.getElementById('date').value).getTime()/1000;
// const clickListener = document.getElementById('submitButton').addEventListener('click', () => {
//   event.preventDefault();
//   let date = document.getElementById('date').value;
//   //console.log(date);
//   countdown();
//   getLocation()
//   .then((geoData) => {
//     getWeather(geoData["geonames"][0]["lat"], geoData["geonames"][0]["lng"]);  
//   })
//   getPhoto();
// })
const getLocation = async (location='Paris') => {
  const url = `http://localhost:8080/geoNames?location=${location}`;
  return await fetch(url).then(response => response.json());
}

const handleLocation = async() => {
  const location = document.getElementById('location').value;
  console.log(location);
  return await getLocation(location).then(response => {
    document.getElementById('latitude').textContent = response.lat;
    document.getElementById('longitude').textContent = response.lng;
    document.getElementById('city').textContent = response.name;
    inputData["latitude"] = response.lat;
    inputData["longitude"] = response.lng;
    inputData["city"] = response.name;
    //console.log("lat", typeof(document.getElementById('latitude')), "long", typeof(inputData["longitude"]), inputData["city"])
  })
}
const countdown = () => {
  const tripDate = moment(document.getElementById('date').value);
  const currentDate = moment().startOf('day');
  const daysUntilTrip = tripDate.diff(currentDate, "days");
  //if trip is more than one week from current date, show future forecast
  //else, show current forecast
  const arrival = document.getElementById('arrival');
  arrival.innerHTML = `Your trip is in ${daysUntilTrip} days!`;
}
 
const getWeather = async (lat, long, time) => {
  const urlWeather = `http://localhost:8080/darkSky?latitude=${lat}&longitude=${long}&time=${time}`;
  return await fetch(urlWeather).then(response => {
    return response.json()
  });
};

const handleWeather = time => {
  const lat = document.getElementById('latitude').textContent;
  const lng = document.getElementById('longitude').textContent;
  let travelTime = new Date(document.getElementById('date').value).getTime()/1000;
  getWeather(lat, lng, travelTime).then(response => {
    console.log(response);
  document.getElementById('weather').innerHTML = `Here is the weather: ${response["temperatureLow"]}`;
  });
}
const getPhoto = async image => {
  const photoURL = `http://localhost:8080/photo?location=${image}`;
  return await fetch(photoURL).then(response => {
    return response.json();
  })
};

const formHandler = event => {
  const currentCity = document.getElementById('location').value;
  countdown();
  handleLocation()
    .then(response => {
    handleWeather(response);
  });
  
  getPhoto(currentCity)
  .then(response => {
    document.getElementById('photo').innerHTML = `<img src="${response}" alt="${currentCity}">`
  });
}
export default formHandler;
