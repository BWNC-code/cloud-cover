const apiKey = 'd5ef31a7c6df783ea28c65895fc0c6d9';
const locationInput = document.querySelector('#location');
const locationName = document.querySelector('#location-name');
const forecastImage = document.querySelector('#forecast-image');
const fourDayForecast = document.querySelector('#day-forecast');



//Get current weather for a given location
async function getCurrentWeather(lat, lon) {
    try {
        let currentWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        let currentWeatherData = await currentWeather.json();
        locationName.textContent = currentWeatherData.name;
        forecastImage.src = `https://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}.png`;
        forecastImage.alt = currentWeatherData.weather[0].description;
        console.log(currentWeatherData);
    }
    catch(error) {
        console.error(error);
    }
}

//Need function to get lat and lon from form input and run getCurrentWeather

async function getLatLon(location) {
    try {
        let latLon = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}`);
        let latLonData = await latLon.json();
        console.log(latLonData);
        return {
            lat: latLonData[0].lat,
            lon: latLonData[0].lon,
        };
    } catch (error) {
        console.error(error);
    }
}


//Function to listen for form submit and run weather update