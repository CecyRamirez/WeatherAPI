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
    const weatherDiv = document.querySelector('#weather-result');
    const htmlContent = `
        <h2>Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
    weatherDiv.innerHTML = htmlContent;
}

// Function to display error message
function displayError(message) {
    const weatherDiv = document.querySelector('#weather-result');
    weatherDiv.innerHTML = `<p style="color:red;">${message}</p>`;
}

// Event listener for the button
document.querySelector('#btn-getWeather').addEventListener('click', () => {
    const city = document.querySelector('#city-input').value;
    if (city) {
        fetchWeather(city);
    } else {
        displayError('Please enter a city name');
    }
});
