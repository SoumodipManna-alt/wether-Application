console.log("hi");

let city_name=document.querySelector(".weather_city")
let datetime=document.querySelector(".weather_date_time")
let w_forecast=document.querySelector(".weather_forecast")
let w_temperature=document.querySelector(".weather_temperature")
let w_icon=document.querySelector(".weather_icon")
let w_minTem=document.querySelector(".weather_min")
let w_maxTem=document.querySelector(".weather_max")
let api="3e5074d26ae30569eb5be7ad119aee0b"
// let WEATHER_OF_KOLKATA=`https://api.openweathermap.org/data/2.5/weather?q=kolkata&APPID=3e5074d26ae30569eb5be7ad119aee0b`



// let url=`https://api.openweathermap.org/data/2.5/weather?q=${city_value}&APPID=${api}`;

let get_region=(code)=>new Intl.DisplayNames([code], { type: 'region' }).of(code)

let get_datetime=(dt)=>{
    // Original date string
// let dateStr = "Sun Dec 01 2024 00:07:24 GMT+0530 (India Standard Time)";

// Convert to a Date object
let date = new Date(dateStr);

// Format options
let options = {
  weekday: 'long',  // Sunday, Monday, etc.
  year: 'numeric',  // 2024
  month: 'long',    // December
  day: '2-digit',   // 01
  hour: '2-digit',  // 12
  minute: '2-digit', // 07
  second: undefined, // Exclude seconds
  hour12: true      // AM/PM format
};

// Get formatted date
let formattedDate = date.toLocaleString('en-US', options);


    return formattedDate;
}

function button_triggered(event,city_value) {
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${city_value}&APPID=${api}`;
    //event.preventDefault();
    fetch(url


    )
        .then(response => {
            return(response.json());
            //console.log(typeof response);

        })
        .then(data=>{
            // console.log(data.main);
            let name=data.name;
            // console.log(data.timezone);
            // console.log(data.weather);
            // console.log(data.sys);
            
            city_name.innerText=`${name},${get_region(data.sys.country)}`
            datetime.innerText=`${get_datetime(data.dt)}`
            w_temperature.innerHTML=`${data.main.temp}&#176`//here we have to write innerHtml for showing degree (&#176) it is a part of html
            
        })
        .catch(error => {
            console.log("Sorry bro can't fetch data");

        })
        .finally(() => {
            console.log("Finally got data");

        });
}

document.querySelector("#button").addEventListener('click',(event)=>{
    let city_value=document.getElementById("city_name").value
    event.preventDefault();
    console.log(city_value);
    
    button_triggered(event,city_value)
})
