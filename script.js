function formatDate(date) {
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

function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
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
  return `${day} ${hours}:${minutes}`;
}

function showTemp(response) {
  console.log(response);
  let temp = document.querySelector("#temp");
  temp.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("h1");
  cityElement.innerHTML = response.data.name;
  document.querySelector(".comment").innerHTML =
    response.data.weather[0].description;
  let humidityInput = document.querySelector("#humidity-input");
  humidityInput.innerHTML = response.data.main.humidity;
  let windInput = document.querySelector("#wind-input");
  windInput.innerHTML = Math.round(response.data.main.wind.speed);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatTime(response.data.dt * 1000);
}
function searchCity(city) {
  let apiKey = "10d192ec318619645a213567f8693645";
  let units = "metric";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?q=";
  let apiUrl = `${apiEndPoint}${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}
function handleCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleCity);
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
let pin = document.querySelector("#btn");
pin.addEventListener("click", currentPosition);
