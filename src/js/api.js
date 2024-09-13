import {
    handleError,
    setWeatherLoader, 
    setForecastLoader, 
    setAirPollutionLoader
} from './ui-helpers.js';

/**
 * Global variable declaration 
 * Declaration des variables Globale  */
/* https://api.openweathermap.org/geo/1.0/direct?q=paris&appid=8e96cc80225e961a033630880bcca97d */
const apiBaseUrl = 'https://api.openweathermap.org';
const apiKey = '8e96cc80225e961a033630880bcca97d';
const endPointName = {
    geo : "geo/1.0",
    data : "data/2.5"
}


/**
 * Function get geocode from city name {fonction obtenir le géocode à partir du nom de la ville}
 *  Fetch GPS coordinates from the city name
 * Récupérer les coordonnées GPS a partir du nom de la ville
 * @param {string} city -- city name
 * @returns {promise<object>} --lon {longitude} -->lat {latitude} coordinates
 */
const getGeocodeFromCityName = async (city) =>{
    const url = `${apiBaseUrl}/${endPointName.geo}/direct?q=${city}&appid=${apiKey}&units=metric`;
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`htpp status : , ${response.status}`);
        }
        const data = await response.json();
        if(!data.length){
            handleError("Impossible de trouver la ville selectionnée Merci de ressayer avec un non de ville/pays validé");
            setWeatherLoader(false);
            setForecastLoader(false);
            setAirPollutionLoader(false);
            return null;
        }
        const firstElement = data[0];
        const {lat, lon} = firstElement;
        return {lat, lon};

    }catch(error){
        handleError(error);
        setWeatherLoader(false);
        setForecastLoader(false);
        setAirPollutionLoader(false);
        return null;
    }

}


/**
 * Fetch weather data form a given location
 * @param {number} lat -- longitude
 * @param {number} lon -- latitude
 * @return {promise<object>} weather data
 */
const fetchWeatherByGeocode = async (lat, lon) => {
    const url = `${apiBaseUrl}/${endPointName.data}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        if(!response.ok){
            throw new Error("http satuts ", response.status);
        }
        const data = await response.json();
        return data
        
    } catch (error) {
        handleError(error);
        setWeatherLoader(false);
        return null;
    }
   
}


/**
 * Fetch forecast data form a given location
 * 
 * @param {number} lat -- latitude
 * @param {number} lon -- longitude
 * @return {promise<object>} forecast data
 */

const fetchForecastGeocode = async (lat , lon) =>{
    const url = `${apiBaseUrl}/${endPointName.data}/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        if(!response.ok){
            throw new Error('http error status', response.status);
        }
        const data = await response.json();
        return data;  
    } catch (error) {
        handleError(error);
        setForecastLoader(false);
        return null;
    }
}


/**
 * Fetch air pollution data form a given location
 * http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={API key}
 * @param {number} lat -- latitude
 * @param {number} lon -- longitude
 * @return {promise<object>} forecast data
 */

const fetchAirPollutionGeocode = async (lat , lon) =>{
    const url = `${apiBaseUrl}/${endPointName.data}/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        if(!response.ok){
            throw new Error('http error status', response.status);
        }
        const data = await response.json();
        return data
        
    } catch (error) {
        handleError(error)
        setAirPollutionLoader(false);
        return null;
    }
}


export {
    getGeocodeFromCityName, 
    fetchWeatherByGeocode, 
    fetchForecastGeocode, 
    fetchAirPollutionGeocode
};


