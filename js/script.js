var apiKey = "e6676e78c5006f290530288e910ece07";
var currentWeather = document.querySelector(".current-weather");
var extendedWeather = document.querySelector(".extended-weather");
var cityInputEl = document.querySelector(".search-city");
var clearEl = document.querySelector(".clear");
var cityForm = document.querySelector("#city-form")
var historyEl = document.querySelector(".search-history");
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];

// function to get user input
function getCityInput(event) {
    event.preventDefault();
    var searchTerm = cityInputEl.value;
    clearCurrent();
    getWeatherByCity(searchTerm);
    get5DayForecast(searchTerm);
    searchHistory.push(searchTerm);
    localStorage.setItem("search", JSON.stringify(searchHistory));
    pastSearch(searchTerm);
}

// function to get current weathr data for user input city
function getWeatherByCity(cityName) {
    // fetch request to get weather by city name
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey)
        .then(function(response) {
            return response.json()
        })
        .then(function(weatherData) {
            // create a div for city name and icon
            var container = document.createElement("div");
            container.classList.add("container");
            // create a title with city name
            var h2 = document.createElement('h2');
            // create an icon pulled from api
            var currentIcon = document.createElement('img');
            currentIcon.classList.add("lg-icon");
            currentIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png");

            // append h2 and icon to container
            container.appendChild(h2);
            container.appendChild(currentIcon);

            // capitalize first letter of city name
            h2.innerText = cityName.charAt(0).toUpperCase() + cityName.slice(1);
            
             // add date

             var today = dayjs().format('dddd, MMMM D');
             console.log(today);

            var dateEl = document.createElement('h4');
            dateEl.innerText = today;

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
            currentWeather.appendChild(container);
            currentWeather.appendChild(dateEl);
            currentWeather.appendChild(ul);
            
    

            var forecastHeader = document.createElement('h3');
            forecastHeader.innerText = "5 Day Forecast: ";
            currentWeather.appendChild(forecastHeader);

        })
}

// function to get five day forecast from user input city
function get5DayForecast(cityName) {
    // fetch request to get 5 day forecast by city name
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + apiKey)
        .then(function(response) {
            console.log(response)
            return response.json()
        })
        .then(function(fiveDayData) {
            console.log(fiveDayData)
            
            // create a loop to make a weather card for each day, need to use array to not get data every 3 hours
            var day = [0, 8, 16, 24, 32];
            var forecast = fiveDayData.list;
            // for (var i = 0; i < 5; i++) {
                day.forEach(function (i) {
                var dailyForecast = forecast[i];
                // var date = fiveDayData.main[i].dt
                // console.log(date)

                // create a card
                var forecastEl = document.createElement("div");
                forecastEl.classList.add("card");

                // create an unordered list
                var ul2 = document.createElement('ul');

                // create and append a date to list item
                // change format of date to be readable
                var currentDate = dailyForecast.dt;
                currentDate = dayjs.unix(currentDate).format("MM/DD/YYYY");

                var dateEl = document.createElement('li');
                dateEl.innerText = currentDate;
                
                ul2.appendChild(dateEl);
                forecastEl.appendChild(dateEl);
                
                // create and append a weather icon list item
                var iconEl = document.createElement('img');
                iconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + dailyForecast.weather[0].icon + "@2x.png");


                ul2.appendChild(iconEl);
                forecastEl.appendChild(iconEl);

                // create and append a temperature list item
                var tempEl = document.createElement('li');
                tempEl.innerText = "Temp: " + dailyForecast.main.temp + " °F";
                
                ul2.appendChild(tempEl);
                forecastEl.appendChild(tempEl)
                
                // create and append a wind list item
                var windEl = document.createElement('li');
                windEl.innerText = "Wind: " + dailyForecast.wind.speed + " mph";
                
                ul2.appendChild(windEl);
                forecastEl.appendChild(windEl)

                // create and append a humidity list item
                var humEl = document.createElement('li');
                humEl.innerText = "Humidity: " + dailyForecast.main.humidity + " %";

                ul2.appendChild(humEl);
                forecastEl.appendChild(humEl);
                
                extendedWeather.appendChild(forecastEl);
                extendedWeather.appendChild(ul2);
            })
        })
}

// function to clear history
function clearHistory(event) {
    event.preventDefault();
    localStorage.removeItem("search");
    historyEl.innerHTML = "";
    return;
}

// turn search into button
var pastSearch = function() {
    historyEl.innerHTML = '';

    for (i = 0; i < searchHistory.length; i++) {
    var pastSearchEl = document.createElement("button");
    pastSearchEl.textContent = searchHistory[i];
    pastSearchEl.setAttribute("data-city", searchHistory[i]);
    historyEl.appendChild(pastSearchEl);

    }
    return;
}

// when past search button is clicked, display that city's weather
var pastSearchData = function(event) {
    var city = event.target.getAttribute("data-city");
    if(city) {
        clearCurrent();
        getWeatherByCity(city);
        get5DayForecast(city);
    }
}

// function to clear current search when new input is submitted
function clearCurrent() {
    var currentConditionsEl = document.querySelector(".current-weather");
    currentConditionsEl.innerText = "";

    var fiveDayConditionsEl = document.querySelector(".extended-weather");
    fiveDayConditionsEl.innerText = "";
    

    return;
}




// event listeners
pastSearch();
cityForm.addEventListener("submit", getCityInput);
historyEl.addEventListener("click", pastSearchData);
clearEl.addEventListener("click", clearHistory);


console.log(get5DayForecast, getWeatherByCity)

