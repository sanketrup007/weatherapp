const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=Seattle';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '744d5047f4msh83925d6528455c3p18ec65jsnbfb880ed7617',
    'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
  }
};

const convertTimestampToDateTime = (timestamp) => {
  const sunriseDate = new Date(timestamp * 1000);
  const formattedDateTime = sunriseDate.toLocaleString(); // Use a localized string for a readable date and time
  return formattedDateTime;
};

const getWeather = (city) => {
  cityName.innerHTML = city;
  fetch(`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`, options)
    .then(response => response.json())
    .then((response) => {
      console.log(response);

      cloud_pct.innerHTML = response.cloud_pct;
      temp.innerHTML = response.temp;
      temp2.innerHTML = response.temp;
      feels_like.innerHTML = response.feels_like;
      humidity.innerHTML = response.humidity;
      humidity2.innerHTML = response.humidity;
      min_temp.innerHTML = response.min_temp;
      max_temp.innerHTML = response.max_temp;
      wind_speed.innerHTML = response.wind_speed;
      wind_speed2.innerHTML = response.wind_speed;

      // Convert and display sunrise time
      sunrise.innerHTML = convertTimestampToDateTime(response.sunrise);
      sunset.innerHTML = convertTimestampToDateTime(response.sunset);
    })
    .catch(err => console.error(err));
};

function refreshPage(city) {
  // Check if the selected city is "Paris" and call getWeather accordingly
  if (city === 'Paris') {
    getWeather('Paris');
  } else if (city === 'New York') {
    getWeather('New York');
  } else if (city === 'Delhi') {
    getWeather('Delhi');
  } else {
    // Handle other cities or default behavior
  }
}

submit.addEventListener("click", (e) => {
  e.preventDefault();
  getWeather(city.value);
});

window.addEventListener('load', () => {
  const currentCity = window.location.hash.substring(1);
  if (currentCity) {
    getWeather(currentCity);
  } else {
    // If no city is specified in the URL, default to "Delhi"
    getWeather("Delhi");
  }
});

const fetchWeather = (city, elementPrefix) => {
  fetch(`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`, options)
    .then(response => response.json())
    .then((response) => {
      console.log(response);

      // Update DOM elements based on the provided elementPrefix
      document.getElementById(`cloud_pct_${elementPrefix}`).innerHTML = response.cloud_pct;
      document.getElementById(`temp_${elementPrefix}`).innerHTML = response.temp;
      document.getElementById(`feels_like_${elementPrefix}`).innerHTML = response.feels_like;
      document.getElementById(`humidity_${elementPrefix}`).innerHTML = response.humidity;
      document.getElementById(`min_temp_${elementPrefix}`).innerHTML = response.min_temp;
      document.getElementById(`max_temp_${elementPrefix}`).innerHTML = response.max_temp;
    })
    .catch(err => console.error(`Error fetching weather for ${city}: ${err}`));
};

submit.addEventListener("click", (e) => {
  e.preventDefault();
  getWeather(city.value);
});

// Example usage
fetchWeather("Mumbai", "mum");
fetchWeather("Pune", "pu");
fetchWeather("Tokyo", "to");
fetchWeather("Beijing", "be");
