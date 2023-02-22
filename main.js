// Snippet
const qs = (sel) => document.querySelector(sel);

// Elements
const elContainer = qs('.container');
const elSearchInput = qs('.search-input');
const elSearchButton = qs('.search-button');
const elInvalid = qs('.invalid');
const elSummary = qs('.summary');
const elSummaryImage = qs('.summary-image');
const elTemperature = qs('.temperature');
const elDescription = qs('.description');
const elDetails = qs('.details');
const elHumidityText = qs('.humidity-text');
const elWindSpeedText = qs('.wind-speed-text');

// When search button is clicked
elSearchButton.addEventListener('click', () => {
  const apiKey = 'fca320f1f38f41de13d00180aeabbb0f';
  const city = elSearchInput.value;

  // Check input city
  if (city === '') {
    return;
  }

  // Fetch weather data from OpenWeather
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      // Invalid city
      if (data.cod === '404') {
        elContainer.style.height = '400px';
        elInvalid.style.display = 'block';
        elInvalid.classList.add('fadeIn');
        elSummary.style.display = 'none';
        elDetails.style.display = 'none';
        return;
      }

      console.log(data);

      // Process styles
      elInvalid.style.display = 'none';
      elInvalid.classList.remove('fadeIn');

      // Set summary image
      elSummaryImage.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

      // Set texts
      elTemperature.innerHTML = `${parseInt(data.main.temp)}°C`;
      elDescription.innerHTML = `${data.weather[0].description}`;
      elHumidityText.innerHTML = `${data.main.humidity}%`;
      elWindSpeedText.innerHTML = `${parseInt(data.wind.speed)} km/h`;

      // Finalize and display
      elSummary.style.display = '';
      elSummary.classList.add('fadeIn');
      elDetails.style.display = '';
      elDetails.classList.add('fadeIn');
      elContainer.style.height = '590px';
    });
});
