const apiKey = `9c58b609-5378-4b8e-be4a-9ed6ffe19476`;
const url =`http://api.airvisual.com/v2/nearest_city?key=${apiKey}`;

//http://api.airvisual.com/v2/nearest_city?key=9c58b609-5378-4b8e-be4a-9ed6ffe19476

// Methode Fetch GET pour récupéer le fichier JSON asynchrone
const errorInformation = document.querySelector('.error-information');
const loader = document.querySelector('.loader-container');

async function launchQuery(){
//    loader.className="loader-container";
    try {
        const requete = await fetch(url,{
            method:"GET"
        }).catch(()=>{
            throw new Error('Problème connexion Internet'); //  uniquement les erreurs réseaux.
        });
        if (!requete.ok){
            throw new Error(`${requete.status} : ${requete.statusText}`);
        } else {
            const datas = await requete.json();
            const cityName =datas.data.city;
            const countryName = datas.data.country;
            const temperature = datas.data.current.weather.tp;
            const icone = datas.data.current.weather.ic;

            // On peut créer un objet
            const dataObjets = {
                city:datas.data.city,
                country:datas.data.country,
                temperature:datas.data.current.weather.tp,
                icone:datas.data.current.weather.ic
            }
            console.log(dataObjets);

            //displayMeteo(cityName,countryName,temperature,icone);
            displayMeteo(dataObjets);

        }
    } catch (error){
        loader.classList.remove("active");
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

//function displayMeteo(name,country,temperature,icone) {
function displayMeteo(donnees) {
    city.textContent=`${donnees.city}`;
    pays.textContent=`${donnees.country}`;
    temp.textContent=`${donnees.temperature}`;
    imgIcon.setAttribute("src",`ressources/icons/${donnees.icone}.svg`);
    imgIcon.style.width="150px";
    loader.classList.remove('active');
    //console.log(loader.classList)
}
