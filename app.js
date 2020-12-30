window.addEventListener("load",() =>{

    let temperatureDegree = document.querySelector(".temperature-degree");
    let temperatureDescription = document.querySelector(".temperature-description");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");

    const api = "https://api.openweathermap.org/data/2.5/onecall?lat=35.681236&lon=139.767125&units=metric&lang=ja&appid=2c999f909c3726a9c348568ff5447935";
    const temperatureSpan = document.querySelector(".temperature span");

    fetch(api)
        .then(response =>{
            return response.json();
        })
        .then(data =>{
            const temperature = data.current.temp;
            const description = data.current.weather[0].description;
            const timezone = data.timezone;
            const icon = data.current.weather[0].main;
            let celsius = (temperature  - 32) * 5 / 9;

            temperatureDegree.textContent = temperature;
            temperatureDescription.textContent = description;
            locationTimezone.textContent = timezone; 
            setIcons(icon, document.querySelector(".icon"));

            temperatureSection.addEventListener("click",()=>{
                if(temperatureSpan.textContent === "F"){
                    temperatureSpan.textContent = "C";
                    temperatureDegree.textContent = Math.floor(celsius);
                }else{
                    temperatureSpan.textContent = "F";
                    temperatureDegree.textContent = temperature;
                }
            });
        })

    //skyconsのアイコンをセット
    function setIcons(icon,iconID){
        const skycons = new Skycons({color:"white"});
        const currentIcon = getIcon(icon).toUpperCase();
        skycons.play();
        return skycons.set(iconID,Skycons[currentIcon]);
    }


    //天気アイコンの取得
    function getIcon(icon){
        switch (icon){
            case "Thunderstorm":
                return "thunder";
            case "Drizzle":
                return "showers-day";
            case "Rain":
                return "rain";
            case "Snow":
                return "snow";
            case "Atmosphere":
                return "hail";
            case "Clear":
                return "clear-day";
            case "Clouds":
                return "cloudy";
        }    
    }
});