import { getWeather } from './weather.js';
import { getAirQuality } from './airQuality.js';
import { getForecast } from './forecast.js';

document.getElementById('search-button').addEventListener('click', () =>{
    let inputSearch = document.getElementById('input-search').value;
    let transformInput = inputSearch.toLowerCase();
    let city = transformInput;

    if(city){
        getWeatherData(city);
    }else{
        alert('veuillez entrer une ville');
    }
})

async function  getWeatherData(city) {
    
    try {
        const weatherData = await getWeather(city);
        const forecastData = await getForecast(city);
        const airQualityData = await getAirQuality(city);

        displayWeather(weatherData);
        displayForecast(forecastData);
        displayAirQuality(airQualityData);
    } catch (error) {
        document.getElementById('error').classList.remove('hidden');
        console.log('erreur : ' + error.message);
    } finally{
        document.getElementById('loading').classList.add('hidden'); 
    }
    
}

function displayWeather(data){
    let para = document.getElementById('currentWeath'); 
    let newDiv = document.createElement('div');

    // Supprimer l'élément précédent s'il existe
    const existingData = document.getElementById('getCurrentWeathData');
    if (existingData) {
        para.removeChild(existingData);
    }
    newDiv.setAttribute("id","getCurrentWeathData");
    let text =`<h3>Météo actuelle à ${data.name}</h3>
                <p> Weather :  ${data['weather'][0]['main']} <br>
                    Description : ${data['weather'][0]['description']} <br>
                    Min temp : ${data.main.temp_min} °c <br>
                    Max temp : ${data.main.temp_max} °c <br>
                    Humidity : ${data.main.humidity} % <br>
                    Wind speed : ${data.wind.speed} m/s <br>
                    Deg : ${data.wind.deg} ° <br>
                    Pressure : ${data.main.pressure} hpa <br>
                    Visibility : ${data.main.visibility} km <br> 
                </p>`;
    newDiv.innerHTML = text; 
    para.appendChild(newDiv);
}

function displayForecast(data){
    let divEl = document.getElementById('forecastOfFourDay');
    const forecastItems = data.list.filter(item => item.dt_txt.includes("12:00:00"));
    forecastItems.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        divEl.innerHTML += `
            <div class="forecast-day">
                <h5>${date}</h5>
                <img src="http://openweathermap.org/img/wn/${item.weather[0].icon}.png" alt="${item.weather[0].description}">
                <p>
                    Temperature : ${item.main.temp} °C <br>
                    Min : ${item.main.temp_min} °C <br>
                    Max : ${item.main.temp_max} °C <br>
                    Humidité : ${item.main.humidity} % <br>
                </p>
            </div>
        `
    });
}

function displayAirQuality(data){
    let para = document.getElementById('currentAirQuality');
    let newDiv = document.createElement('div');

     // Supprimer l'élément précédent s'il existe
     const existingData = document.getElementById('getAirQualityData');
     if (existingData) {
         para.removeChild(existingData);
     } 
    newDiv.setAttribute("id","getAirQualityData");
    let text =` <h3>Qualité de l'air</h3>
                <p>Indice de qualité de l'air : ${data.list[0].main.aqi} <br>
                CO : ${data.list[0].components.co} ug/m<sup>3</sup> <br>
                NO : ${data.list[0].components.no} ug/m<sup>3</sup> <br>
                NO2 : ${data.list[0].components.no2} ug/m<sup>3</sup> <br>
                O3 : ${data.list[0].components.o3} ug/m<sup>3</sup> <br>
                SO2 : ${data.list[0].components.so2} ug/m<sup>3</sup> <br>
                PM2.5 : ${data.list[0].components.pm2_5} ug/m<sup>3</sup> <br>
                PM10 : ${data.list[0].components.pm10} ug/m<sup>3</sup> <br>
                NH3 : ${data.list[0].components.nh3} ug/m<sup>3</sup> <br>
                </p>`;
    newDiv.innerHTML = text; 
    para.appendChild(newDiv);
}
