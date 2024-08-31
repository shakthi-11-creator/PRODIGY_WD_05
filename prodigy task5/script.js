function fetchWeather() {
    const location = document.getElementById('locationInput').value;
    const apiKey = '09b3a48369e2b9289e9621fa518381d5';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Invalid city name, please try again.');
                } else {
                    throw new Error('Weather data not found');
                }
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(error => {
            console.error('Error:', error);
            displayError(error.message);
        });
}

function displayWeather(data) {
    const weather = `
        <h2>Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Condition: ${data.weather[0].main}</p>
        <p>Humidity: ${data.main.humidity}%</p>
    `;
    document.getElementById('weatherDisplay').innerHTML = weather;
}

function displayError(message) {
    const error = `<h2>${message}</h2>`;
    document.getElementById('weatherDisplay').innerHTML = error;
}
