const apiKey = 'd5ef31a7c6df783ea28c65895fc0c6d9';
const location = "London";

//Get location data from name
async function getCoordinates() {
    try {
      const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${apiKey}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

 //Get current weather for a given location

function getWeather(location) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=london&appid=${apiKey}`)
.then(response => {
  console.log(response);
})
.catch(err => {
  console.error(err);
});
}

// Listen for form submission
document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    getWeather();
})