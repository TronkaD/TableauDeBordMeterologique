import {
    getGeocodeFromCityName, 
    fetchWeatherByGeocode, 
    fetchForecastGeocode, 
    fetchAirPollutionGeocode
} from './api.js';

import {
    handleError, 
    displayWeather,
    setWeatherLoader, 
    setForecastLoader, 
    setAirPollutionLoader
} from './ui-helpers.js';

/**
 * Updates the UI with the fetched weather, forecast and air pollution data.
 * @param {object} weatherData -- the weather data object.
 * @param {object} forecastData -- the weather forecast data object.
 * @param {object} airPollutionData -- the air pollution data object.
 * @returns {void}
 */

const updateUI = (weatherData, forecastData, airPollutionData) => {
    setWeatherLoader(false);
    setForecastLoader(false);
    setAirPollutionLoader(false);
    displayWeather(weatherData, forecastData, airPollutionData);
}

/**
 * Fetch weather data
 * @param {string} --city name
 * @return {void}
 */

const fetchWeatherData = async (city) => {
    
    if(!city){
        //afficher une erreur
    }
    setWeatherLoader(true);
    setForecastLoader(true);
    setAirPollutionLoader(true); 

    const geoCode = await getGeocodeFromCityName(city);
    if(!Object.keys(geoCode || {}).length){
        handleError("Impossible de récuperer les coordonnées GPS")
    }

    const {lat, lon} = geoCode;
    const weatherDataPromise = fetchWeatherByGeocode(lat, lon);
    const forecastDataPromise = fetchForecastGeocode(lat, lon);
    const airPollutionDataPromise = fetchAirPollutionGeocode(lat, lon);
    const [weatherData, forecastData, airPollutionData] = await Promise.all([weatherDataPromise, forecastDataPromise, airPollutionDataPromise]);
    //Appeller toute les fonctions pour récuperer la donnée
    updateUI(weatherData, forecastData, airPollutionData);
}

/**
 * Initialize event listeners to the ui
 * Initialiser les récepteurs d'événements de l'interface utilisateur
 */
const setupEventListeners = () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    /**
     * Function that will handle event click for search button
     * Fonction qui gérera l'événement clic pour le bouton de recherche
     */

    const  handleClickSearchButton = (event) => {
        event.preventDefault();
        const city = searchInput.value.trim();
        if(city){
            //get geoloc data
            fetchWeatherData(city);
        }
    }

    const handleKeyPressSearchInput = (event) => {
        if(event.key === 'Enter'){
            event.preventDefault();
            const city = searchInput.value.trim();
            if(city){
                //get geoloc data
                fetchWeatherData(city);
            }
        }
    }

    searchButton.addEventListener('click', handleClickSearchButton);
    searchInput.addEventListener('keypress', handleKeyPressSearchInput);
}

/**
 * Initializes the UI components and event listeners
 */
const init = () => {
    setupEventListeners();
}

export default init;