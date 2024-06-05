const apiKey = "fd32499ffb661a7557777b6f24fb5590";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        switch (data.weather[0].main.toLowerCase()) {
            case "clouds":
                weatherIcon.src = "Images/clouds.png";
                break;
            case "clear":
                weatherIcon.src = "Images/clear.png";
                break;
            case "rain":
                weatherIcon.src = "Images/rain.png";
                break;
            case "drizzle":
                weatherIcon.src = "Images/drizzle.png";
                break;
            case "mist":
                weatherIcon.src = "Images/mist.png";
                break;
            case "snow":
                weatherIcon.src = "Images/snow.png";
                break;
            default:
                weatherIcon.src = ""; // Set a default image if weather condition doesn't match
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim(); // Trim any leading/trailing spaces
    if (city !== "") {
        checkWeather(city);
    } else {
        // Show error message if no city is entered
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
});

// Initial weather check for a default city
checkWeather(); // You might want to set a default city here
