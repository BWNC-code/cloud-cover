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
    }
    catch(error) {
        console.error(error);
    }
}
