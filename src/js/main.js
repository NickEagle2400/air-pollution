import '../css/style.css';
import { Loader } from "@googlemaps/js-api-loader"

//axios
const axios = require('axios');

//urls
const baseUrl = "https://api.waqi.info/feed/"
const baseGeoUrl = "https://api.waqi.info/feed/geo:"

//constants
const loader = document.getElementById('loader');
const root = document.getElementById('root');

//api
const API_KEY = process.env.API_KEY;

//city input
const searchForm = document.getElementById('search-form');
const searchBtn = document.getElementById('search-btn');
const cityIn = document.getElementById('city-in');

//pollution Index
const airQindex = document.getElementById('aqi');
const aqiTime = document.getElementById('aqiTime');
const index = document.getElementById('index');

//pm2.5
const pm = document.getElementById('pm');
const pmToday = document.getElementById('pmToday');
const pmMin = document.getElementById('pmMin');
const pmMax = document.getElementById('pmMax');

//pm10
const pmp = document.getElementById('pmp');
const pmpToday = document.getElementById('pmpToday');
const pmpMin = document.getElementById('pmpMin');
const pmpMax = document.getElementById('pmpMax');

//ozone
const ozone = document.getElementById('ozone');
const ozoneToday = document.getElementById('ozoneToday');
const ozoneMin = document.getElementById('ozoneMin');
const ozoneMax = document.getElementById('ozoneMax');

//City info
const cityName = document.getElementById('cityName');
const cityRegion = document.getElementById('cityRegion');
const cityCountry = document.getElementById('cityCountry');

//btn Geolocation Api
const myPos = document.getElementById('myposition');

//loader
window.addEventListener('load', function(){
    this.setTimeout(function(){
        loader.style.display = "none";
        root.style.display = "block";
    },1000); 
});

//Submit
searchForm.addEventListener('submit', function(event){

    event.preventDefault();

    //Removing blank spaces
    let temp = cityIn.value;
    let city = "";
    temp = temp.split(" ");

    for(let i = 0; i<temp.length;i++){
        city = city.concat(temp[i]);
    }

    //Lower case
    city = city.toLowerCase();

    //Api Request
    axios.get(`${baseUrl}${city}/?token=${API_KEY}`)
        .then(function (response) {
            let data = response.data.data;
            if(response.status >= 200 && response.status <300) {
                loadData(data);
            }
            console.log(response);
        })
        .catch(function (error) {
            alert("The city is not in the database.");
            console.log(error);
        })
        .then(function () {
            // always executed
        });
})


//Get User Position
myPos.addEventListener('click', function(event){
    event.preventDefault();

    navigator.geolocation.getCurrentPosition(success, function(){
        alert("Error with Geolocation API");
    })

})

//Successfull Get User Position
function success(pos){

    let geoLat = pos.coords.latitude.toFixed(4);
    let geoLon = pos.coords.longitude.toFixed(4);

    //API request
    axios.get(`${baseGeoUrl}${geoLat};${geoLon}/?token=${API_KEY}`)
        .then(function (response) {
            console.log(response);
            let data = response.data.data;
            if(response.status >= 200 && response.status <300) {
                loadData(data);
            }
        })
        .catch(function (error) {
            alert("The city is not in the database.");
            console.log(error);
        })
        .then(function () {
            // always executed
        })
}

//check interval
function checkValue(value){
    if(value<=50){
        return 1;
    }
    else if(value >50 && value<=100){
        return 2;
    }
    else if(value >100 && value<=150){
        return 3;
    }
    else if(value >150 && value<=200){
        return 4;
    }
    else if(value >200 && value<=300){
        return 5;
    }
    else if(value >300 && value<=500){
        return 6;
    }
    return -1;
}

//Set border color
function setBorder(value,elem){
    switch(value){
        case 1: return elem.style.borderColor = "#009966";
        case 2: return elem.style.borderColor = "#FFDE33";
        case 3: return elem.style.borderColor = "#FF9933";
        case 4: return elem.style.borderColor = "#CC0133";
        case 5: return elem.style.borderColor = "#660099";
        case 6: return elem.style.borderColor = "#7E0122";
        default: return elem.style.borderColor = "#000";
    }
}

//Set innerHTML
function loadData(data){

        //with some cities (es: New York) api returns error and city name undefined (but it returns index pm pmp value )
        if(data.aqi!==undefined){
            airQindex.innerHTML = data.aqi;
        }

        let date = data.time.iso.split("T")[0].split("-");
        aqiTime.innerHTML = date[2] + "-" + date[1] + "-" + date[0];
        setBorder(checkValue(data.aqi),index);

        pmToday.innerHTML = data.iaqi?.pm25?.v;
        pmMin.innerHTML = data.forecast.daily.pm25[data.forecast.daily.pm25.length - 1].min;
        pmMax.innerHTML = data.forecast.daily.pm25[data.forecast.daily.pm25.length - 1].max;
        setBorder(checkValue(data.iaqi?.pm25?.v),pm);

        pmpToday.innerHTML = data.iaqi?.pm10?.v;
        pmpMin.innerHTML = data.forecast.daily.pm10[data.forecast.daily.pm10.length - 1].min;
        pmpMax.innerHTML = data.forecast.daily.pm10[data.forecast.daily.pm10.length - 1].max;
        setBorder(checkValue(data.iaqi?.pm10?.v),pmp);

        ozoneToday.innerHTML = data.forecast.daily.o3[data.forecast.daily.o3.length -1].avg;
        ozoneMin.innerHTML = data.forecast.daily.o3[data.forecast.daily.o3.length - 1].min;
        ozoneMax.innerHTML = data.forecast.daily.o3[data.forecast.daily.o3.length - 1].max;
        setBorder(checkValue(data.forecast.daily.o3[data.forecast.daily.o3.length -1].avg),ozone);
        
        //check and split city name
        let cityInfo = data.city.name.split(',')
        cityName.innerHTML = cityInfo[0];
        if(cityInfo[1]!==undefined){
            cityRegion.innerHTML = cityInfo[1];
        }
        else{
            cityRegion.innerHTML = "";
        }

        if(cityInfo[2]!==undefined){
            cityCountry.innerHTML = cityInfo[2];
        }
        else{
            cityCountry.innerHTML = "";
        }

        //Create map
        const loader = new Loader({});
        
        loader.load().then(() => {

            let map = new google.maps.Map(document.getElementById("map"), {
                center: { lat: data.city.geo[0], lng: data.city.geo[1] },
                zoom: 12,
            });
        });
}







