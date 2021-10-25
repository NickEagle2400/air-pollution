import '../css/style.css';
import { Loader } from "@googlemaps/js-api-loader"

const axios = require('axios');
const baseUrl = "https://api.waqi.info/feed/"
const baseGeoUrl = "https://api.waqi.info/feed/geo:"

//constants
const loader = document.getElementById('loader');
const root = document.getElementById('root');

const searchForm = document.getElementById('search-form');
const searchBtn = document.getElementById('search-btn');
const cityIn = document.getElementById('city-in');

const cityName = document.getElementById('cityName');
const cityRegion = document.getElementById('cityRegion');
const cityCountry = document.getElementById('cityCountry');

const pm = document.getElementById('pm');
const pmToday = document.getElementById('pmToday');
const pmMin = document.getElementById('pmMin');
const pmMax = document.getElementById('pmMax');

const pmp = document.getElementById('pmp');
const pmpToday = document.getElementById('pmpToday');
const pmpMin = document.getElementById('pmpMin');
const pmpMax = document.getElementById('pmpMax');

const ozone = document.getElementById('ozone');
const ozoneToday = document.getElementById('ozoneToday');
const ozoneMin = document.getElementById('ozoneMin');
const ozoneMax = document.getElementById('ozoneMax');

const airQindex = document.getElementById('aqi');
const aqiTime = document.getElementById('aqiTime');
const index = document.getElementById('index');

const myPos = document.getElementById('myposition');

//loader
window.addEventListener('load', function(){
    this.setTimeout(function(){
        loader.style.display = "none";
        root.style.display = "block";
    },1000); 
});


searchForm.addEventListener('submit', function(event){

    event.preventDefault();

    let temp = cityIn.value;
    let city = "";
    temp = temp.split(" ");
    for(let i = 0; i<temp.length;i++){
        city = city.concat(temp[i]);
    }
    city = city.toLowerCase();
    
    cityIn.value = "";

    axios.get(`${baseUrl}${city}/?token=${process.env.API_KEY}`)
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


myPos.addEventListener('click', function(event){
    event.preventDefault();

    navigator.geolocation.getCurrentPosition(success, function(){
        alert("Error with Geolocation API");
    })

})

function success(pos){

    let geoLat = pos.coords.latitude.toFixed(4);
    let geoLon = pos.coords.longitude.toFixed(4);

    console.log(geoLat);
    axios.get(`${baseGeoUrl}${geoLat};${geoLon}/?token=${process.env.API_KEY}`)
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
        })
}




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

function checkBorder(value,elem){
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

function loadData(data){
    
        if(data.aqi!==undefined){
            airQindex.innerHTML = data.aqi;
        }
        console.log(data);
        let date = data.time.iso.split("T")[0].split("-");
        aqiTime.innerHTML = date[2] + "-" + date[1] + "-" + date[0];
        checkBorder(checkValue(data.aqi),index);

        pmToday.innerHTML = data.iaqi?.pm25?.v;
        pmMin.innerHTML = data.forecast.daily.pm25[data.forecast.daily.pm25.length - 1].min;
        pmMax.innerHTML = data.forecast.daily.pm25[data.forecast.daily.pm25.length - 1].max;
        checkBorder(checkValue(data.iaqi?.pm25?.v),pm);

        pmpToday.innerHTML = data.iaqi?.pm10?.v;
        pmpMin.innerHTML = data.forecast.daily.pm10[data.forecast.daily.pm10.length - 1].min;
        pmpMax.innerHTML = data.forecast.daily.pm10[data.forecast.daily.pm10.length - 1].max;
        checkBorder(checkValue(data.iaqi?.pm10?.v),pmp);

        ozoneToday.innerHTML = data.forecast.daily.o3[data.forecast.daily.o3.length -1].avg;
        ozoneMin.innerHTML = data.forecast.daily.o3[data.forecast.daily.o3.length - 1].min;
        ozoneMax.innerHTML = data.forecast.daily.o3[data.forecast.daily.o3.length - 1].max;
        checkBorder(checkValue(data.forecast.daily.o3[data.forecast.daily.o3.length -1].avg),ozone);
        
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

        const loader = new Loader({
            /*apiKey: "YOUR_API_KEY",
            version: "weekly",
            ...additionalOptions,*/
        });
        
        loader.load().then(() => {

            let map = new google.maps.Map(document.getElementById("map"), {
                center: { lat: data.city.geo[0], lng: data.city.geo[1] },
                zoom: 12,
            });
        });
}
/*
const cityName = document.getElementById('cityName');
cityName.innerHTML = process.env.API_KEY; */






