const apiKey = 'd5ef31a7c6df783ea28c65895fc0c6d9';
const locationInput = document.querySelector('#location');
const locationName = document.querySelector('#location-name');
const forecastImage = document.querySelector('#forecast-image');
const temperature = document.querySelector(`#temperature`);
const weatherDescription = document.querySelector(`#weather-description`);
const windSpeed = document.querySelector(`#wind-speed`);
const fourDayForecast = document.querySelector('#day-forecast');
const errorMessage = document.querySelector("#error-message");
const geolocateBtn = document.querySelector('#geolocate');


/**
 * @param {*} lat 
 * @param {*} lon 
 * @returns Display current weather data
 */

async function getCurrentWeather(lat, lon) {
    try {
        let currentWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        let currentWeatherData = await currentWeather.json();
        locationName.textContent = currentWeatherData.name;
        forecastImage.src = `https://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}.png`;
        forecastImage.alt = currentWeatherData.weather[0].description;
        temperature.textContent = `Temperature: ${currentWeatherData.main.temp} °C`;
        weatherDescription.textContent = `Weather: ${currentWeatherData.weather[0].description}`;
        windSpeed.textContent = `Wind speed: ${currentWeatherData.wind.speed} m/s`;
        console.log(currentWeatherData);
    } catch (error) {
        console.error(error);
    }
}

/**
 * @param {*} location 
 * @returns latitude and longitude
 */

async function getLatLon(location) {
    try {
        let latLon = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}`);
        //Validate response
        if (latLon.status === 404 || latLon.status === 400) {
            throw new Error(`Error code: ${latLon.status}`);
        }
        let latLonData = await latLon.json();
        //Validate json
        if (!latLonData || !latLonData[0].lat || !latLonData[0].lon) {
            throw new Error(`Invalid location: ${location}`);
        }
        return {
            lat: latLonData[0].lat,
            lon: latLonData[0].lon
        };
    } catch (error) {
        console.error(error);
    }
}

//4 day forecast function

async function get4DayForecast(lat, lon) {
    try {
        let forecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        let forecastData = await forecast.json();
        console.log(forecastData);
        let forecastList = forecastData.list;
        let forecastArray = [];
        let date;
        forecastList.forEach(forecast => {
            if (forecast.weather !== null && forecast.main !== null) {
                date = new Date(forecast.dt * 1000);
                forecastArray.push(forecast);
            }
        });
        let day1 = forecastArray[0];
        let day1Date = new Date(day1.dt*1000);
        let day2 = forecastArray[1];
        let day3 = forecastArray[2];
        let day4 = forecastArray[3];
        forecastDay1.textContent = `${day1Date.toLocaleDateString()}`;
        forecastImage1.src = `https://openweathermap.org/img/wn/${day1.weather[0].icon}.png`;
        forecastImage1.alt = day1.weather[0].description;
        forecastTemp1.textContent = `Temperature: ${day1.main.temp} °C`;
        }catch (error) {
        console.error(error);
    }
}

/**
 * Takes location name and gets coordinates, then uses coordinates to get current weather
 */
async function displayWeather(location) {
    try {
        const coordinates = await getLatLon(location);
        await getCurrentWeather(coordinates.lat, coordinates.lon);
    } catch (error) {
        console.error(error);
    }
}


//Function to listen for form submit and run weather update

document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    displayWeather(locationInput.value);
});

//Function to listen for "Use my location button press and use browser geolocation api to run displayWeather"

geolocateBtn.addEventListener('click', async () => {
    navigator.geolocation.getCurrentPosition(async position => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        await getCurrentWeather(lat, lon);
    });
})