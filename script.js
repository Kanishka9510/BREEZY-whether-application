const apiKey = "a7e81b9263b868bef7c272b601a55855";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (response.status === 404) {
            document.querySelector(".weather").style.display = "none";
            document.querySelector(".error").style.display = "block";
        } else {
            const data = await response.json();

            console.log(data);

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

            const weatherCondition = data.weather[0].main.toLowerCase();

            switch (weatherCondition) {
                case "clouds":
                    weatherIcon.src = "images/clouds.png";
                    break;
                case "clear":
                    weatherIcon.src = "images/clear.png";
                    break;
                case "rain":
                    weatherIcon.src = "images/rain.png";
                    break;
                case "drizzle":
                    weatherIcon.src = "images/drizzle.png";
                    break;
                case "mist":
                    weatherIcon.src = "images/mist.png";
                    break;
                default:
                    weatherIcon.src = "images/default.png"; 
            }

            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".error").style.display = "block";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
