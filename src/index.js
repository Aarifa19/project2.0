function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#description-element");
  let humidityElement = document.querySelector("#humidity-element");
  let windElement = document.querySelector("#wind-element");
  let iconElement = document.querySelector("#icon-element");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" />`;
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

function flexDisplayApi(response) {
  let flexDays = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
  let today = new Date().toLocaleString("en-us", { weekday: "short" });
  let currentIndex = flexDays.indexOf(today);

  let dailyWeather = response.data.daily;

  dailyWeather.forEach((day, index) => {
    if (index !== currentIndex && index <= 5) {
      let iconUrl = day.condition.icon_url;
      let minTemperature = Math.round(day.temperature.minimum);
      let maxTemperature = Math.round(day.temperature.maximum);
      if (index !== currentIndex) {
        let dayHtml = `
      <div class="flex">
        <div class="flexDay" id="flexDay">${flexDays[index]}</div>
         <div class="flexIcon">
      <img src="${iconUrl}" alt="Weather Icon"></div>
        <div class="temperatureFlex">
      <div class="flexMinTemp" id="flexMaxTemp"><strong>${maxTemperature}&deg</strong></div>
        <div class="flexMaxTemp" id="flexMinTemp">${minTemperature}&deg</div>
        </div>
        </div>
 `;
        flexBox.innerHTML += dayHtml;
      }
    }
  });
}
function flexDetails(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let flexCity = searchInputElement.value;
  let flexApiKey = "ca5ct04d9bd0coba87f454389b7fdd40";
  let flexUrl = `https://api.shecodes.io/weather/v1/forecast?query=${flexCity}&key=${flexApiKey}&units=metric`;

  axios.get(flexUrl).then(flexDisplayApi);
}
let flexBox = document.querySelector("#flexContainer");
searchForm.addEventListener("submit", flexDetails);
search("polokwane");
