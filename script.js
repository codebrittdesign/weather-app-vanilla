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
  

  function displayWeather(response) {
    let cityElement = document.querySelector("#city");
    let tempElement = document.querySelector("#current-temp");
    let dateElement = document.querySelector(".dateandtime"); 
    let conditionsElement = document.querySelector("#conditions");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    
  
    cityElement.innerHTML = response.data.name;
    tempElement.innerHTML = Math.round(response.data.main.temp);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    conditionsElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = Math.round(
      response.data.main.humidity);
    windElement.innerHTML = Math.round(
      response.data.main.wind);
   }
  
  function searchCity(city) {
    let apiKey = "b7b9844b6ed8730b16766136ce5ada57";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    axios.get(apiURL).then(weatherDisplay);
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
  
  let displayDate = document.querySelector(".dateandtime");
  let currentTime = new Date();
  displayDate.innerHTML = now(currentTime);
  
  let submitCity = document.querySelector("#submit-city");
  submitCity.addEventListener("click", changeCity);
  
  