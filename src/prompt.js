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

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "6bcbbb16338664d130a554dd9384b956";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  document.querySelector("#cityName").innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#tempName").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#weatherD").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidityD").innerHTML = response.data.main.humidity;
  document.querySelector("#windspeedD").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "6bcbbb16338664d130a554dd9384b956";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function clickSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#keyWord").value;
  searchCity(city);
}

function showFtemperature(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#tempName");

  cLink.classList.remove("active");
  fLink.classList.add("active");
  let fTemperature = (celsiusTemperature * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fTemperature);
}

function showCtemperature(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#tempName");
  cLink.classList.add("active");
  fLink.classList.remove("active");
  tempElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#form1");
searchForm.addEventListener("submit", clickSubmit);

let fLink = document.querySelector("#fLink");
fLink.addEventListener("click", showFtemperature);

let cLink = document.querySelector("#cLink");
cLink.addEventListener("click", showCtemperature);

searchCity("Singapore");
