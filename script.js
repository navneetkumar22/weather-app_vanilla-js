let apiId = "0d94c6acf027134d94d41107d7c1bd2a";
// let searchInput = document.getElementById('search-field');
// let myLocation = searchInput.value;

let getWeather = (lat, lon) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiId}`)
        .then(res => { return res.json() })
        .then(result => {

            console.log(result);
            let iconDiv = document.querySelector('.icon');
            iconDiv.innerHTML = `
                            <img src="http://openweathermap.org/img/w/${result.weather[0].icon}.png" alt="weather-icon">
            `;

            let tempDiv = document.querySelector('.temperature');
            tempDiv.innerHTML = `
                             <h1 id="temP">${Math.floor(result.main.temp)}<span class="degree">&#8451;</span></h1>
                             <p>${result.weather[0].main}</p>
            `;


            let statusDiv = document.querySelector('.status');
            statusDiv.innerHTML = `
            <div class="status-card">
                <p>Wind Status</p>
                <h1>${result.wind.speed}<span class="small">mph</span></h1>
            </div>
            <div class="status-card">
                <p>Humidity</p>
                <h1>${result.main.humidity}<span class="small">%</span></h1>
            </div>
            <div class="status-card">
                <p>Visibility</p>
                <h1>${Math.round(result.visibility / 1609)} <span class="small">miles</span></h1>
            </div>
            <div class="status-card">
                <p>Air Pressure</p>
                <h1>${result.main.pressure} <span class="small">mb</span></h1>
            </div>`

        })
        .catch(err => { console.log(err); })
}


// get next 5 days forecast

let getDaily = (lat, lon) => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=6&units=metric&appid=${apiId}`)
        .then(res => { return res.json() })
        .then(result => {

            for (let i = 1; i < result.list.length; i++) {

                let cardsDiv = document.querySelector('.cards');
                cardsDiv.innerHTML += `
                         <div class="card">
                             <p class="date">${Date.now()}</p>
                             <img src="http://openweathermap.org/img/w/${result.list[i].weather[0].icon}.png" alt="rain">
                             <div class="temp">
                                 <p>${Math.floor(result.list[i].main.temp_max)}&deg;C</p>
                                 <p>${Math.floor(result.list[i].main.temp_min)}&deg;C</p>
                             </div>
                         </div>`

                console.log(result.list[1]);
            }


        })
        .catch(err => { console.log(err); })
}

// getWeather();
// getDaily();

const getSearch = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);

            currentLong = position.coords.longitude;
            currentLat = position.coords.latitude;

            getWeather(currentLong, currentLat);
            getDaily(currentLong, currentLat);
        })
    }
}
