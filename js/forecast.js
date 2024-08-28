const apiKey = '8e96cc80225e961a033630880bcca97d';

export async function getForecast(city) {
    try{
        
        const reponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
        
        if(!reponse.ok){
            throw new Error('Echec lors de la récupération des données');
        }
        
        const data = await reponse.json();
        return data;
        
    } catch (error) {
        console.log('Erreur : ', error.message);
        return null;
    }
    
}

