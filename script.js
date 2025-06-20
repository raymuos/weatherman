const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");



const apiKey = "daab47bd872093b8af7d239e3ee8eb93";

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

searchBtn.addEventListener("click", async () => {
    const city = cityInput.value.toLowerCase();

    if(city){
        try {
            const data = await getWeather(city);
            displayWeather(data);

        } catch (error) {
            displayError(error);
        }
    }
    
    else{
        displayError("Please enter a City");
    }
})


async function getWeather(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);

    const data = await response.json();
    return data;
}

function displayWeather(data){
    console.log(data)

    document.getElementById("cityName").textContent = data.name;
    document.getElementById("cityLat").textContent = (data.coord.lat > 0)? ` ${data.coord.lat.toFixed(2)}°N `: `${-(data.coord.lat).toFixed(2)}°S `;
    document.getElementById("cityLong").textContent = (data.coord.lon > 0)? ` ${data.coord.lon.toFixed(2)}°E `: ` ${-(data.coord.lon.toFixed(2))}°W `;
    document.getElementById("cityTemp").textContent = `${(data.main.temp - 273.15).toFixed(1)}°C`

    document.getElementById("cityHumid").textContent = `Humidity: ${data.main.humidity}%`
    document.getElementById("citySky").textContent = capitalize(data.weather[0].description)
    document.getElementById("cityWind").textContent = `Wind: ${((data.wind.speed) * 3.6).toFixed(2)} km/hr`
    document.getElementById("cityEmoji").textContent = getEmoji(data.weather[0].id)
}

function getEmoji(weatherId){
    switch(true){

        case (weatherId >= 200 && weatherId < 300): return '⛈️';
        case (weatherId >= 300 && weatherId < 400): return '🌧️';
        case (weatherId >= 500 && weatherId < 600): return '🌧️';
        case (weatherId >= 600 && weatherId < 700): return '❄️';
        case (weatherId >= 700 && weatherId < 800): return '🌫️';
        case (weatherId === 800): return '☀️';
        case (weatherId > 800 && weatherId < 804): return '⛅';
        case (weatherId === 804): return '☁️';

        default: return '❓';
    }
}

function displayError(error){

}