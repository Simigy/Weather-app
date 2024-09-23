"use strict"
const searchLocationInput = document.getElementById('searchLocation');

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (pos) {
        const lat = pos.coords.latitude;
        const long = pos.coords.longitude;
        console.log(lat);
        console.log(long);
        getWeatherData(`${lat},${long}`)
    })
} else {
    console.log('not Allowed');
}

async function getWeatherData(z) {
    let res = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${z}&days=3&key=4d51644c2f144dcf99d02716240906`);
    let data = await res.json()
    console.log(data);
    displayTodayWeather(data)
    displayTomorrow(data)
    displayAfterTomorrow(data)
}

searchLocationInput.addEventListener('input',function(e){
    getWeatherData(e.target.value)
})  





function displayTodayWeather(data){
    console.log('Helloooo');
console.log(data , 'from displayTodayWeather');
console.log(data.current.last_updated , "Date");
const todayDate = data.current.last_updated
let date  = new Date(todayDate);
    const todayWeekDay = date.toLocaleString('en-us',{weekday:'long'}); // اسم يوم الاسبوع "خميس"
    const todayDay = date.getDate() // يوم كام ف الشهر
    const todayMonth  = date.toLocaleString('en-us',{month:'long'}) // اسم الشهر
    const cityName = data.location.name;
    const todayDegree= data.current.temp_c;
    const todayCondition = data.current.condition.text;
    const humidity = data.current.humidity;
    console.log(humidity);
    cityToday.innerHTML = cityName;
    todayWeekDayMarkup.innerHTML = todayWeekDay;;
    dateToday.innerHTML= `${todayDay} ${todayMonth}`;
    tempToday.innerHTML = todayDegree;
    todayCond.innerHTML = todayCondition
    imgToday.setAttribute('src',data.current.condition.icon);
    humidityToday.innerHTML = humidity;
    windSpeedToday.innerHTML  = data.current.wind_kph;
    dirToday.innerHTML = data.current.wind_dir;
}


function displayTomorrow({forecast}){
console.log(forecast , 'forecast from displayTomorrow');
tomorrowDay.innerHTML = new Date(forecast.forecastday[1].date).toLocaleString('en-us',{weekday:'long'});
iconTomorrow.setAttribute('src',forecast.forecastday[1].day.condition.icon);
tMaxTemp.innerHTML = forecast.forecastday[1].day.maxtemp_c
tMinTemp.innerHTML = forecast.forecastday[1].day.mintemp_c
// console.log(forecast.forecastday[1].day);

}



function displayAfterTomorrow({forecast}){
    console.log(forecast , 'forecast from displayTomorrow');
    afterTomorrow.innerHTML = new Date(forecast.forecastday[2].date).toLocaleString('en-us',{weekday:'long'});
    iconAfterTom.setAttribute('src',forecast.forecastday[2].day.condition.icon);
    afterTomMaxTemp.innerHTML = forecast.forecastday[2].day.maxtemp_c
    afterTomMinTemp.innerHTML = forecast.forecastday[2].day.mintemp_c    
    }
    









