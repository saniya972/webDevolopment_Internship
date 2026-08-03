const apiKey = "3bf578255d8792e0fa168e9ceeae54fe";

const cityInput = document.getElementById("city");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weatherIcon");
const error = document.getElementById("error");

const getWeather = async () => {

    const city = cityInput.value.trim();

    if (city === "") {
        error.innerText = "Please enter a city name.";
        return;
    }

    error.innerText = "";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        const {
            name,
            weather,
            main,
            wind: windData
        } = data;

        cityName.innerText = name;
        temperature.innerText = `${main.temp}°C`;
        condition.innerText = weather[0].description;
        humidity.innerText = `${main.humidity}%`;
        wind.innerText = `${windData.speed} km/h`;

        const icon = weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    } catch (err) {

        cityName.innerText = "--";
        temperature.innerText = "--°C";
        condition.innerText = "--";
        humidity.innerText = "--%";
        wind.innerText = "-- km/h";
        weatherIcon.src = "";
        error.innerText = err.message;

    }

};
searchBtn.addEventListener("click", getWeather);


cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        getWeather();
    }
});