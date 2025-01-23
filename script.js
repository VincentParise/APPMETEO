const apiKey = `9c58b609-5378-4b8e-be4a-9ed6ffe19476`;
const url =`http://api.airvisual.com/v2/nearest_city?key=${apiKey}`;

//http://api.airvisual.com/v2/nearest_city?key=9c58b609-5378-4b8e-be4a-9ed6ffe19476

// Methode Fetch GET pour récupéer le fichier JSON asynchrone
const errorInformation = document.querySelector('.error-information');

async function launchQuery(){

    try {
        const requete = await fetch(url,{
            method:"GET"
        });
        if (!requete.ok){
            throw new Error(`${requete.status}`);
        } else {
            const datas = await requete.json();
            const cityName =datas.data.city;
            const countryName = datas.data.country;
            const temperature = datas.data.current.weather.tp;
            const icone = datas.data.current.weather.ic;
            // console.log(datas.data);
            // console.log(cityName);
            // console.log(countryName);
            // console.log(temperature);
            displayMeteo(cityName,countryName,temperature,icone);

        }
    } catch (error){
        errorInformation.textContent=`${error}`;
    }
}

launchQuery();

// Affichage des éléments dans le DOM :
const city = document.querySelector('.city-name');
const pays = document.querySelector('.country-name');
const temp = document.querySelector('.temperature');
const infoIconContainer = document.querySelector('.info-icon-container');
const imgIcon = document.querySelector('.info-icon');

function displayMeteo(name,country,temperature,icone) {
    city.textContent=`${name}`;
    pays.textContent=`${country}`;
    temp.textContent=`${temperature}`;
    imgIcon.setAttribute("src",`ressources/icons/${icone}.svg`);

}
