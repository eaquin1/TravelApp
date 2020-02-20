const formHandler = event => {
  const currentCity = document.getElementById('location').value;
  client.countdown();
  client.handleLocation()
    .then(response => {
    client.handleWeather(response);
  });
  
  client.getPhoto(currentCity)
  .then(response => {
    document.getElementById('photo').innerHTML = `<img src="${response}" alt="${currentCity}">`
  });
}

export { formHandler };
