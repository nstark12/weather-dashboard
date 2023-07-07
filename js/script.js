var apiKey = "e6676e78c5006f290530288e910ece07";
var currentWeather = document.querySelector(".current-weather");
var extendedWeather = document.querySelector(".extended-weather");
var cityInputEl = document.querySelector(".search-city");
var cityForm = document.querySelector("#city-form")
var searchHistory = [];

function getCityInput(event) {
    event.preventDefault();
    var cityName = cityInputEl.value;
    clearCurrent();
    getWeatherByCity(cityName);
    get5DayForecast(cityName);
}

function getWeatherByCity(cityName) {
    // fetch request to get weather by city name
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey)
        .then(function(response) {
            console.log(response)
            return response.json()
        })
        .then(function(weatherData) {
            console.log(weatherData)
            // create a title with city name
            var h2 = document.createElement('h2');
            // capitalize first letter of city name
            h2.innerText = cityName.charAt(0).toUpperCase() + cityName.slice(1);
            // append new title to currentWeather div
            currentWeather.appendChild(h2);
            // create list items
                var ul = document.createElement('ul');
                // temperature
                var li1 = document.createElement('li');
                li1.innerText = "Temp: " + weatherData.main.temp + " °F";
                // wind
                var li2 = document.createElement('li');
                li2.innerText = "Wind: " + weatherData.wind.speed + " mph";
                // humidity
                var li3 = document.createElement('li');
                li3.innerText = "Humidity: " + weatherData.main.humidity + " %";
                // append list items to unordered list
                ul.appendChild(li1);
                ul.appendChild(li2);
                ul.appendChild(li3);
            // append unordered list to currentWeather div
            currentWeather.appendChild(ul);
        })
}

function get5DayForecast(cityName) {
    // fetch request to get 5 day forecast by city name
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + apiKey)
        .then(function(response) {
            console.log(response)
            return response.json()
        })
        .then(function(fiveDayData) {
            console.log(fiveDayData)
            // create a loop to make a weather card for each day

            var forecast = fiveDayData.list;
            for (var i = 0; i < 5; i++) {
                var dailyForecast = forecast[i];
                // var date = fiveDayData.main[i].dt
                // console.log(date)
                var ul2 = document.createElement('ul');
                var tempEl = document.createElement('li');
                tempEl.innerText = "Temp: " + dailyForecast.main.temp + " °F";
                
                ul2.appendChild(tempEl);
                extendedWeather.appendChild(ul2);
                console.log(tempEl)

            }

        })
}

function clearCurrent() {
    var currentConditionsEl = document.querySelector(".current-weather");
    currentConditionsEl.innerText = "";

    var fiveDayConditionsEl = document.querySelector(".extended-weather");
    fiveDayConditionsEl.innerText = "";

    return;
}

// event listener for city search
cityForm.addEventListener("submit", getCityInput)

console.log(cityForm)