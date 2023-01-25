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

//display error to user

function displayError(error) {
    let errorMessage = document.getElementById("error-message");
    errorMessage.textContent = error;
    errorMessage.classList.remove("hidden");
}

function hideError() {
    let errorMessage = document.getElementById("error-message");
    errorMessage.classList.add("hidden");
}


/**
 * @param {*} lat 
 * @param {*} lon 
 * @returns Display current weather data
 */

async function getCurrentWeather(lat, lon) {
    try {
        hideError();
        let currentWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        let currentWeatherData = await currentWeather.json();
        locationName.textContent = `${currentWeatherData.name}, ${currentWeatherData.sys.country}`;
        forecastImage.src = `https://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}.png`;
        forecastImage.alt = currentWeatherData.weather[0].description;
        temperature.textContent = `Temperature: ${currentWeatherData.main.temp.toFixed()} °C`;
        weatherDescription.textContent = `Weather: ${currentWeatherData.weather[0].description.replace(/\b\w/g, l => l.toUpperCase())}`;
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
        hideError();
        let latLon = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}`);
        //Validate response
        if (latLon.status === 404 || latLon.status === 400) {
            displayErrorMessage(`Error code: ${latLon.status}`)
            throw new Error(`Error code: ${latLon.status}`);
        }
        let latLonData = await latLon.json();
        //Validate json
        if (!latLonData || !latLonData[0].lat || !latLonData[0].lon) {
            displayErrorMessage("Invalid location. Please enter a valid location.");
            throw new Error(`Invalid location: ${location}`);
        }
        return {
            lat: latLonData[0].lat,
            lon: latLonData[0].lon
        };
    } catch (error) {
        console.error(error);
        displayErrorMessage("There was an error with the API request. Please try again later.");
    }
}

//4 day forecast functions

//fetch forecast data
async function get4DayForecast(lat, lon) {
    try {
        hideError();
        let forecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        let forecastData = await forecast.json();
        let forecastList = forecastData.list;
        getForecastData(forecastList);
    } catch (error) {
        console.error(error);
        displayErrorMessage("There was an error with the API request. Please try again later.");
    }
}

//define array
let forecastArray = [];

//parse array and loop through to output to DOM

function getForecastData(forecastList) {
    let date;
    //only take 1 object per day at midday
    forecastList = forecastList.filter(forecast => {
        let date = new Date(forecast.dt * 1000);
        return date.getUTCHours() === 12;
    });

    forecastList.forEach(forecast => {
        if (forecast.weather !== null && forecast.main !== null) {
            date = new Date(forecast.dt * 1000);
            forecastArray.push(forecast);
        }
        console.log(forecastArray);
    });
    for (let i = 0; i < 4; i++) {
        let forecast = forecastArray[i];
        let date = new Date(forecast.dt * 1000);
        let options = {
            weekday: 'short'
        };
        let day = date.toLocaleDateString('en-US', options);
        let forecastDay = document.getElementById(`forecastDay${i+1}`);
        let forecastImage = document.getElementById(`forecastImage${i+1}`);
        let forecastTemp = document.getElementById(`forecastTemp${i+1}`);
        let forecastWeather = document.getElementById(`forecastWeather${i+1}`);
        let forecastWindSpeed = document.getElementById(`forecastWindSpeed${i+1}`);
        forecastDay.textContent = `${day} ${date.toLocaleDateString()}`;
        forecastImage.src = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
        forecastImage.alt = forecast.weather[0].description;
        forecastTemp.textContent = `Temperature: ${forecast.main.temp.toFixed()} °C`;
        forecastWeather.textContent = forecast.weather[0].description.replace(/\b\w/g, l => l.toUpperCase());
        forecastWindSpeed.textContent = `Wind Speed: ${forecast.wind.speed} m/s`;
    }
}


/**
 * Takes location name and gets coordinates, then uses coordinates to get current weather
 */
async function displayWeather(location) {
    try {
        const coordinates = await getLatLon(location);
        await getCurrentWeather(coordinates.lat, coordinates.lon);
        await get4DayForecast(coordinates.lat, coordinates.lon);
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
    let permission = await navigator.permissions.query({
        name: `geolocation`
    });
    if (permission.state === 'granted') {
        navigator.geolocation.getCurrentPosition(async position => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            await getCurrentWeather(lat, lon);
            await get4DayForecast(lat, lon);
        });
    } else if (permission.state === 'denied') {
        alert('Location permission is needed to use this feature');
    } else {
        const newPermission = confirm("This button needs your location to function properly, do you want to share your location?");
        if (newPermission) {
            navigator.geolocation.getCurrentPosition(async position => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                await getCurrentWeather(lat, lon);
                await get4DayForecast(lat, lon);
            });
        }
    }
});

//default location london loads on refresh

document.addEventListener("DOMContentLoaded", () => {
    displayWeather("London");
});