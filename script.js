/*function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}
let currentTime = new Date();
let todaysDate = document.querySelector("#date");
todaysDate.innerHTML = formatDate(currentTime);
*/
function formatTime(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${formatForecastHours(timestamp)}`;
}

function formatForecastHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${hours}:${minutes}`;
}

function showTemp(response) {
  let temp = document.querySelector("#temp");
  temp.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("h1");
  cityElement.innerHTML = response.data.name;
  document.querySelector(".comment").innerHTML =
    response.data.weather[0].description;
  let humidityInput = document.querySelector("#humidity-input");
  humidityInput.innerHTML = response.data.main.humidity;
  let windInput = document.querySelector("#wind-input");
  windInput.innerHTML = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatTime(response.data.dt * 1000);
  let icon = document.querySelector("#icon");
  icon.setAttribute =
    ("src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  icon.setAttribute = ("alt", `${response.data.weather[0].description}`);
  celTemp = Math.round(response.data.main.temp);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast-row");
  let forecast = null;
  forecastElement.innerHTML = null;
  for (let index = 1; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
  <div class="col-12 col-md-2">
        <div class="card">
              <div class="card-body">
                <h5 class="card-title">${formatForecastHours(
                  forecast.dt * 1000
                )}</h5>
                <h6>
                <img src= "http://openweathermap.org/img/wn/${
                  forecast.weather[0].icon
                }@2x.png";
                      alt="${forecast.weather[0].description}"></h6>
                <p class="card-text">${Math.round(
                  forecast.main.temp_max
                )}° | ${Math.round(forecast.main.temp_min)}°</p>
              </div>
              </div>
            </div>`;
  }
}
function searchCity(city) {
  let apiKey = "10d192ec318619645a213567f8693645";
  let units = "metric";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?q=";
  let apiUrl = `${apiEndPoint}${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);

  let apiUrlForecast = "https://api.openweathermap.org/data/2.5/forecast?q=";
  let forecastUrl = `${apiUrlForecast}${city}&appid=${apiKey}&units=${units}`;
  axios.get(forecastUrl).then(displayForecast);
}

function handleCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

function showFahTemp(event) {
  event.preventDefault();
  let fahFormula = (celTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(fahFormula);
}

function showCelTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celTemp);
}

function showMyPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "581586b0bf5ecf67c9088531a5578b65";
  let units = "metric";
  let apiAdress = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiAdress}lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}
function currentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showMyPosition);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleCity);
form.addEventListener("submit", toggleElements);

let celTemp = null;

let pin = document.querySelector("#btn");
pin.addEventListener("click", currentPosition);

let fahLink = document.querySelector("#fahrenheit");
fahLink.addEventListener("click", showFahTemp);

let celsius = document.querySelector("#centigrados");
celsius.addEventListener("click", showCelTemp);

function toggleElements() {
  let extras = document.querySelector("#toggle-extras");
  let units = document.querySelector("#units");
  let searchInput = document.querySelector("#search-input");
  extras.style.display = "block";
  units.style.display = "inline-block";
  searchInput.style.display = "none";
  searchInput.focus();
}
