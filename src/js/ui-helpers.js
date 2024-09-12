/** START -- {MANAGING DATA LOADS}*/

/**
 *  Set loader for weather details
 */
const setWeatherLoader = (isLoading) => {
    const weatherDetailsDiv = document.getElementById('weather-detail');

    if(isLoading){
        weatherDetailsDiv.innerHTML = `<div class="loader"></div>`;
    }else{
        weatherDetailsDiv.innerHTML = "";
    }
    return;
}
/**
 * Set loader for forecast details
 */
const setForecastLoader = (isLoading) => {
    const forecastDetailsDiv = document.getElementById("forecast-detail");
    if(isLoading){
        forecastDetailsDiv.innerHTML = `<div class="loader"></div>`;
    }else{
        forecastDetailsDiv.innerHTML = "";
    }
    return;
}
/**
 * Set loader for air pollution details
 */
const setAirPollutionLoader = (isLoading) => {
    const airPollutionDetailsDiv = document.getElementById("air-pollution-detail");
    if(isLoading){
        airPollutionDetailsDiv.innerHTML = `<div class="loader"></div>`;
    }else{
        airPollutionDetailsDiv.innerHTML = "";
    }
    return;
}

/**END -- {MANAGING DATA LOADS} */

/** START -- {ERROR MANAGEMENT}*/

/**
 * Handle errors during API fetch or processing
 * @param {string} message --Error message to display
 */
const handleError = (message) => {
    const errorElementDiv = document.getElementById("error");
    errorElementDiv.textContent = message;
    errorElementDiv.style.display = "block";
}

/**
 * Reset errors shown in UI
 */
const resetError = () => {
    const errorElementDiv = document.getElementById('error');
    errorElementDiv.textContent = "";
}

/**END -- {ERROR MANAGEMENT} */

/**START -- {DATA DISPLAY IN THE USER INTERFACE} */

/**
 * Display weather data
 * @param {object} weatherData -- the weather data object.
*/
const displayWeatherDetails = (weatherDetails) => {
    
    const weatherDetailsDiv = document.getElementById('weather-detail');
    //clear the previous data
    weatherDetailsDiv.innerHTML = "";

    const currentWeatherHTML = `
                            <div id="weather-details-container">
                                <h4>Météo actuelle à ${weatherDetails.name}</h4>
                                <img src="https://openweathermap.org/img/w/${weatherDetails.weather[0].icon}.png" alt="${weatherDetails.weather[0].description}"/>
                                <p>Température : ${weatherDetails.main.temp} °C</p>
                                <p>Min temp : ${weatherDetails.main.temp_min} °C</p>
                                <p>Max temp : ${weatherDetails.main.temp_max} °C</p>
                                <p>Humidité : ${weatherDetails.main.humidity} %</p>
                                <p>Pression : ${weatherDetails.main.pressure} hPa</p>
                                <p>Vitesse du vent : ${weatherDetails.wind.speed} m/s</p>
                            </div>
                            `;
    weatherDetailsDiv.innerHTML = currentWeatherHTML;
}

/**
 * Display forecast data
 * @param {object} forecastData -- the forecast data object.
*/
const displayForecast = (forecastData) => {
    let forecastDetailsDiv = document.getElementById("forecast-detail");

    //Clear previous data
    forecastDetailsDiv.innerHTML = "";

    let forecastHTML = `
        <div class="forecast-section">
            <h4>Prévisions à 5 jours pour ${forecastData.city.name} ${forecastData.city.country}</h4>
            <div class="forecast-container">
    `;

    const dailyForecasts = new Map();
    forecastData.list.forEach((forecastEntry) => {
        const date = new Date(forecastEntry.dt * 1000).toLocaleDateString();
        if(!dailyForecasts.has(date)){
            dailyForecasts.set(date, forecastEntry);
        }
    })

    dailyForecasts.forEach((day) => {

        forecastHTML += `
            <div class="forecast-card">
                <h4>${new Date(day.dt * 1000).toLocaleDateString()}</h4>
                <img src="https://openweathermap.org/img/w/${day.weather[0].icon}.png" alt ="${day.weather[0].description}" class="weather-icon"/>
                <p><strong>Temp : </strong> ${day.main.temp.toFixed(1)} °C</p>
                <p><strong>Min : </strong> ${day.main.temp_min.toFixed(1)} °C</p>
                <p><strong>Max : </strong> ${day.main.temp_max.toFixed(1)} °C</p>
                <p><strong>Humidity : </strong> ${day.main.humidity.toFixed(1)} %</p>
            </div>
        `;
    });
    forecastHTML += `</div> </div>`;
    forecastDetailsDiv.innerHTML = forecastHTML;   
};

/**
 * Display air pollution data
 * @param {object} airPollutionData -- the air pollution data object.
*/

const displayAirPollution = (airPollutionData) => {

    const airPollutionDiv = document.getElementById('air-pollution-detail');
    //clear previous data 
    airPollutionDiv.innerHTML = "";
    const airPollutionHTML = ` 
        <div id="air-pollution-details-container">
            <h4>Qualité de l'air</h4>
            <p>Indice de qualité de l'air : ${airPollutionData.list[0].main.aqi}</p>
            <p>CO : ${airPollutionData.list[0].components.co} ug/m<sup>3</sup></p>
            <p>NO : ${airPollutionData.list[0].components.no} ug/m<sup>3</sup></p>
            <p>NO<sub>2</sub> : ${airPollutionData.list[0].components.no2} ug/m<sup>3</sup></p>
            <p>O<sub>3</sub> : ${airPollutionData.list[0].components.o3} ug/m<sup>3</sup></p>
            <p>SO2 : ${airPollutionData.list[0].components.so2} ug/m<sup>3</sup></p>
            <p>PM2.5 : ${airPollutionData.list[0].components.pm2_5} ug/m<sup>3</sup></p>
            <p>PM10 : ${airPollutionData.list[0].components.pm10} ug/m<sup>3</sup></p>
            <p>NH3: ${airPollutionData.list[0].components.nh3} ug/m<sup>3</sup></p> 
        </div>
    `;
    airPollutionDiv.innerHTML = airPollutionHTML;
}
/**
 * Displays weather data on the UI
 * @param {object} weatherData -- the weather data object.
 * @param {object} forecastData -- the weather forecast data object.
 * @param {object} airPollutionData -- the air pollution data object.
 * @returns {void}
 */
const displayWeather = (weatherData, forecastData, airPollutionData) => {
    if(Object.keys(weatherData || {}).length){
        displayWeatherDetails(weatherData);
    }
    if(Object.keys(forecastData || {}).length){
        displayForecast(forecastData);
    }
    if(Object.keys(airPollutionData || {}).length){
        displayAirPollution(airPollutionData); 
    }
};

/**END -- {ERROR DATA DISPLAY IN THE USER INTERFACE} */


export {
    setWeatherLoader, 
    setForecastLoader, 
    setAirPollutionLoader,
    handleError, 
    resetError, 
    displayWeather,  
};