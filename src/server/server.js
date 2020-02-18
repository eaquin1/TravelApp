const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const axios = require('axios');
const app = express();
const postRequest = './handle';
//Configure Express to use bodyParser as middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Cors for cross origin allowance
app.use(cors());

app.use(express.static('./dist'))
//Global API keys
const geoDataKey = process.env.GEO_USER;
const darkSkyKey = process.env.DARK_SKY_KEY;
const pixaBayKey = process.env.PIXABAY_KEY;

// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, '../..dist', 'index.html'));
// });
// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
});

const getLocation = async(location, geoKey) => {
const geonamesUrl = `http://api.geonames.org/searchJSON?q=${location}&username=${geoDataKey}`;
return axios.get(geonamesUrl).then(res => {
  return res.data.geonames[0];
  })
}

//Geonames Route
app.get('/geoNames', (req, res) => {
  const location = req.query.location;
  getLocation(location, geoDataKey).then(response => {
    res.end(JSON.stringify(response));
  })
});

const getWeather = async(key, lat, long, time) => {
  const darkSkyUrl = `https://api.darksky.net/forecast/${darkSkyKey}/${lat},${long},${time}`;
  const proxy = 'https://cors-anywhere.herokuapp.com/'
  return await axios.get(darkSkyUrl).then(response => {
    return response.data.daily.data[0]
  });
}
//Weather Route
app.get('/darkSky', (req, res) => {
  const lat = req.query.latitude;
  const long = req.query.longitude;
  const time = req.query.time;
  
  getWeather(darkSkyKey, lat, long, time).then(response => {
    //console.log(req.query);
    res.end(JSON.stringify(response));
  })
})

const getPhoto = async(key, location) => {
  //let location = document.getElementById('location').value;
  const pixaBayUrl = `https://pixabay.com/api/?key=${pixaBayKey}&q=${location}&image_type=photo`
  return await axios.get(pixaBayUrl).then(response => {
    if (response.data.totalHits != 0) {
    return response.data.hits[0].webformatURL;
    } else {
      return {error: 'No Results' };
    }
  })
};

//Photo Route
app.get('/photo', (req, res) => {
  const pic = req.query.location;
  getPhoto(pixaBayKey, pic).then(response => {
    res.end(JSON.stringify(response));
  })
});



module.exports = app;
