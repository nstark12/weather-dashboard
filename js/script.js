var apiKey = "e6676e78c5006f290530288e910ece07";

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
            var currentWeather = document.querySelector(".current-weather");
            var h2 = document.createElement('h2');
            h2.innerText = cityName;
            // append new title to currentWeather div
            currentWeather.appendChild(h2);
            // create list items
                var ul = document.createElement('ul');
                // temperature
                var li1 = document.createElement('li');
                li1.innerText = "Temp: " + weatherData.main.temp;
                // wind
                var li2 = document.createElement('li');
                li2.innerText = "Wind: " + weatherData.wind.speed;
                // humidity
                var li3 = document.createElement('li');
                li3.innerText = "Humidity: " + weatherData.main.humidity;
                // append list items to unordered list
                ul.appendChild(li1);
                ul.appendChild(li2);
                ul.appendChild(li3);
            // append unordered list to currentWeather div
            currentWeather.appendChild(ul);
        })
}

getWeatherByCity("Milwaukee");