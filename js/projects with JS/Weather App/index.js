const userTab=document.querySelector("[data-userWeather]");
const searchTab=document.querySelector("[data-searchWeather]");
const userContainer=document.querySelector(".weather-container");

const grantAccessContainer=document.querySelector(".grant-location-container");
const searchForm=document.querySelector("[data-searchForm]");
const lodingScreen=document.querySelector(".loading-container");
const userInfoContainer=document.querySelector(".user-info-container");
const errorContainer=document.querySelector(".error");

let API_KEY= "d1845658f92b31c64bd94f06f7188c9c";
let currentTab=userTab;
currentTab.classList.add("current-tab");

getFormSessionStorage();

function switchTab(clickedTab){
    if(clickedTab !== currentTab){
        currentTab.classList.remove("current-tab");
        currentTab=clickedTab;
        currentTab.classList.add("current-tab");
        

        if(!searchForm.classList.contains("active")){
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else{
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            getFormSessionStorage();
        }
    }
}
userTab.addEventListener("click",()=>{switchTab(userTab)});
searchTab.addEventListener("click",()=>{switchTab(searchTab)});

function getFormSessionStorage(){
    let localCoordinates= sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){
        grantAccessContainer.classList.add("active");
        
        
    }
    else{
        let coordinates=JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);

    }
}

async function fetchUserWeatherInfo(coordinates){
    const {lat,lon}=coordinates;
    grantAccessContainer.classList.remove("active");
    lodingScreen.classList.add("active");

    try{
        let responce = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        const data=await responce.json();
        lodingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);

    }catch (err) {
        lodingScreen.classList.remove("active");
        //hw
    }
}

async function renderWeatherInfo(weatherInfo){
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloud = document.querySelector("[data-cloud]");
    const ed=weatherInfo?.cod;

    console.log(weatherInfo);
    if(ed==="404"){
        userInfoContainer.classList.remove("active");
        errorContainer.classList.add("active");
    }
    else{
        errorContainer.classList.remove("active");
    //fetch values from weatherINfo object and put it UI elements
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    cloud.innerText = `${weatherInfo?.clouds?.all}%`;
    }
}


function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition)
    }
    else{
        //hw
        grantAccessContainer.classList.remove("active");

    }
}

function showPosition(position){
    const userLocation={
        lat:position.coords.latitude,
        lon:position.coords.longitude
    };
    sessionStorage.getItem("user-coordinates",JSON.stringify(userLocation));
    fetchUserWeatherInfo(userLocation);
}
const grantAccessBtn=document.querySelector("[data-grantAccess]");
grantAccessBtn.addEventListener('click',getLocation())

const searchInput=document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let cityName=searchInput.value;

    if(cityName === ""){
        return;
    }
    else{
        fetchSearchWeatherInfo(cityName);
    }
});

async function fetchSearchWeatherInfo(city){
    lodingScreen.classList.add("active");
    userContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");
    try{
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data=await response.json();
        lodingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }catch(arr){
        //hw
    }
}