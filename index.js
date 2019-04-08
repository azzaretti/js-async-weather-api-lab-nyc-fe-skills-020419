const API_KEY = "2e47b83ae8e6f1e5a1b3c035ccad3be7"

function handleFormSubmit(event) {
  event.preventDefault()
  const input = document.getElementById('city')
  const city = input.value
  fetchCurrentWeather(city)
  fetchFiveDayForecast(city)
}

function fetchCurrentWeather(city) {
  fetch('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + API_KEY + '&units=imperial')
  .then((data) => {return data.json()})
  .then((json) => {displayCurrentWeather(json)})
  
}

function displayCurrentWeather(json) {
 const tempContainer = document.getElementById('temp')
 tempContainer.innerHTML = json.main.temp + 'ºF'
 
 const highTemp = document.getElementById('high')
 highTemp.innerHTML = json.main.temp_max + 'ºF'
 
 const lowTemp = document.getElementById('low')
 lowTemp.innerHTML = json.main.temp_min + 'ºF'
 
 const humidity = document.getElementById('humidity')
 humidity.innerHTML = json.main.humidity + '%' 
 
const cloudCover = document.getElementById('cloudCover')
cloudCover.innerHTML = json.clouds.all + '%'
}


function fetchFiveDayForecast(city) {
  fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + API_KEY + '&units=imperial')
  .then((data) => {return data.json()})
  .then((json) => {displayFiveDayForecast(json)})
}

function displayFiveDayForecast(json) {
  console.log(json)
  const forecasts = json.list
  createChart(json)
  let startingString = ''
  for(let forecast of forecasts){
    let forecastString = "<div>  <p>" + forecast.main.temp_min + "</p>" + forecast.main.temp_max + "<p>" + forecast.dt_txt + "</p></div>"
    startingString += forecastString
  }
 const aside = document.getElementById('forecast')
 aside.innerHTML = startingString
}

function createChart(json) {
let ctx = document.getElementById('WeatherChart').getContext('2d')
const labels = json.list.map((forecast) => {return forecast.dt_txt})
const temps = json.list.map((forecast) => {return forecast.main.temp})
let chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Forecast',
            data: temps,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

}



document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('submit', handleFormSubmit)
})
