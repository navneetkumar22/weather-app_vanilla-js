let apiKey = "urApiKey";
let searchInput = document.getElementById('seachInput');
let myLocation = searchInput.value;

let getWeather = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${myLocation}&units=metric&appid=${apiKey}`)
        .then(res => { return res.json() })
        .then(result => { console.log(result); })
        .catch(err => { console.log(err); })
}


let getDaily = () => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${myLocation}&cnt=6&units=metric&appid=${apiKey}`)
        .then(res => { return res.json() })
        .then(result => { console.log(result.list); })
        .catch(err => { console.log(err); })
}



const getSearch = () => {
    console.log(searchInput.value);
    getWeather();
    getDaily();
}