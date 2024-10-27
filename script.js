async function fetchWeather(city) {
    const apiKey = '64211804bef026aa51cf3ccdb5757d60';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
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

function displayWeather(data) {
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

// Function to display error message
function displayError(message) {
    const weatherDiv = document.querySelector('#results-container');
    weatherDiv.innerHTML = `<p style="color:red;">${message}</p>`;
}

// Event listener for the button
document.querySelector('#btn-get-weather').addEventListener('click', () => {
    const city = document.querySelector('#city-input').value;
    if (city) {
        fetchWeather(city);
    } else {
        displayError('Please enter a city name');
    }
});
