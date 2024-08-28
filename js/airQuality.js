 import { getWeather } from './weather.js';

const apiKey = '8e96cc80225e961a033630880bcca97d';

export async function getAirQuality (city) {
   
    try {
     
        const getData = await getWeather(city);
        let lat = getData.coord.lat;
        let lon = getData.coord.lon;
        const reponse = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`);
    
        if (!reponse.ok){
          throw new Error('Echec lors de la récuperation des données de pollution');
        }
     
       const airQualityData = await reponse.json();
      return airQualityData;
     
    } catch (error) {
        console.log('Erreur : ', error.message);
        return null;
    }
    
}
