// Fetch weather data from the server API
async function fetchWeather(city) {
    try {
        const url = `http://localhost:3000/weather?city=${encodeURIComponent(city)}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        displayError(error.message);
    }
}

// Display weather information in the HTML
function displayWeather(data) {
    const resultContainer = document.querySelector('#results-container');
    const resultsDiv = document.querySelector('#city-result');
    const temperatureDiv = document.querySelector('#temperature-result');
    const weatherDiv = document.querySelector('#weather-result');
    const humidityDiv = document.querySelector('#humidity-result');
    const windSpeedDiv = document.querySelector('#wind-speed-result');

    resultContainer.style.display = 'flex';

    resultsDiv.innerHTML = `Weather in ${data.name}`;
    temperatureDiv.innerHTML = `<h3>Temperature</h3><p>${data.main.temp} °C</p>`;
    weatherDiv.innerHTML = `<h3>Weather</h3><p>${data.weather[0].description}</p>`;
    humidityDiv.innerHTML = `<h3>Humidity</h3><p>${data.main.humidity}%</p>`;
    windSpeedDiv.innerHTML = `<h3>Wind Speed</h3><p>${data.wind.speed} m/s</p>`;
}

// Display error message in the HTML
function displayError(message) {
    const errorDiv = document.querySelector('#error-container');
    errorDiv.innerHTML = `<p style="color:red;">Error: ${message}</p>`;
}

// Event listener for the "Get Weather" button
document.querySelector('#btn-get-weather').addEventListener('click', () => {
    const city = document.querySelector('#city-input').value;
    if (city) {
        fetchWeather(city);
    } else {
        displayError('Please enter a city name');
    }
});


// Display weather information in the HTML
function displayWeather(data) {
    console.log("encontró city")
    const result= document.querySelector('#results-container');
    const resultsDiv = document.querySelector('#city-result');
    const temperatureDiv = document.querySelector('#temperature-result');
    const weatherDiv = document.querySelector('#weather-result');
    const humidityDiv = document.querySelector('#humidity-result');
    const windSpeedDiv = document.querySelector('#wind-speed-result');
    
    if (result.style.display === 'none') {
        result.style.display = 'flex';
    }

    const resultsContent=`
        Weather in ${data.name}
    `;
    const temperatureContent = `
        <h3>Temperature</h3>
        <p>${data.main.temp} °C</p>
    `;
    const weatherContent = `
        <h3>Weather</h3>
        <p>${data.weather[0].description}</p>
    `;
    const humidityContent = `
        <h3>Humidity</h3>
        <p>${data.main.humidity}%</p>
    `;
    const windSpeedContent = `
        <h3>Wind Speed</h3>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
    resultsDiv.innerHTML = resultsContent;
    temperatureDiv.innerHTML = temperatureContent;
    weatherDiv.innerHTML = weatherContent;
    humidityDiv.innerHTML = humidityContent;
    windSpeedDiv.innerHTML = windSpeedContent;
}

// Display error message in the HTML
function displayError(message) {
    const errorDiv = document.querySelector('#results-container');
    errorDiv.innerHTML = `<p style="color:red;">Error: ${message}</p>`;
}

// Event listener for the "Get Weather" button
document.querySelector('#btn-get-weather').addEventListener('click', () => {
    const city = document.querySelector('#city-input').value;
    if (city) {
        fetchWeather(city);
        console.log("There is a city")
    } else {
        displayError('Please enter a city name');
    }
});
