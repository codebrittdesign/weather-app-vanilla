function now(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let dayList = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[dayList];

  if (hours > 12) {
      hours = hours - 12;
  }
  if (hours < 10) {
      hours = '0' + hours;
  }
  if (minutes < 10) {
      minutes = '0' + minutes;
  }

  return `${day}, ${hours}:${minutes}`;

}

function formatDays(time) {

  let date = new Date(time * 1000);
  let day = date.getDay ();

  let days = [ 
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

return days[day];
}
function showForecast(response) {

  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  let days = ["Sunday", "Monday", "Tuesday", "Wednesday"];

  forecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      

  forecastHTML = forecastHTML + `

  <div class="col-sm-3">
    <div class="card">
      <div class="card-body">
        <h5 class="forecast-day">${formatDays(forecastDay.dt)}</h5>
        <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" width="75" alt="" />
        <ul>
          <li>
            <span class="label">high</span> <span id="high"> ${Math.round(forecastDay.temp.max)}</span>
          </li>

          <li>
            <span class="label">low</span> <span id="low"> ${Math.round(forecastDay.temp.min)}</span>
          </li>
        </ul>
      </div>
    </div>
    </div>
  `;
  }});
  
forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}


let displayDate = document.querySelector(".dateandtime");
let currentTime = new Date();
displayDate.innerHTML = now(currentTime);

function getForecast(coordinates) {
  let apiKey = "b7b9844b6ed8730b16766136ce5ada57";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
axios.get(apiUrl).then(showForecast);
}

function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let conditionsElement = document.querySelector("#conditions");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  fahrenheitTemp = response.data.main.temp;
  
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  conditionsElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

let apiKey = "b7b9844b6ed8730b16766136ce5ada57";
let city = "Atlanta";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

axios.get(apiUrl).then(displayTemperature);

function searchCity(city) {
  let apiKey = "b7b9844b6ed8730b16766136ce5ada57";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiURL).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#submit-city").value;
  searchCity(city);
}

function changeCity(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("input");
  let newCity = document.querySelector("#city");
  newCity.innerHTML = `${searchedCity.value}`;
  searchCity(searchedCity.value);
}

function showFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  let celsiusTemp = (tempElement.innerHTML - 32) * 5 / 9;
  tempElement.innerHTML = Math.round(celsiusTemp);
}

let fahrenheitTemp = null;

let submitCity = document.querySelector("#submit-city");
submitCity.addEventListener("click", changeCity);


let toFahrenheit = document.querySelector("#fahrenheit");
toFahrenheit.addEventListener("click", showFahrenheit);

let toCelsius = document.querySelector("#celsius");
toCelsius.addEventListener("click", showCelsius);

searchCity("Atlanta");
showForecast();
