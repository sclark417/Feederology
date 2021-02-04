
$(document).ready(function() {

    function getCurrentWeather(searchValue) {
        console.log(searchValue)

        var apiKey = '2475c48a9f27efa0b6bdd756142d1e2f';
        var apiQuery = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=imperial&appid=${apiKey}`;

        //api call
        $.ajax({
            url: apiQuery,
            method: "GET",
        }).then(function(data) {
            $('#current-forecast').append(`
            <h2 class='city-name'>${data.name}</h2>
            <img style='inline' src = 'http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png' width='70px height='70px' alt='weather icon'>
            <p class='temp'>Temperature: ${parseFloat((data.main.temp).toFixed(0))}°F</p>
            <p class='humid'>Humidity: ${parseFloat((data.main.humidity).toFixed(0))}%</p>
            <p class='wind'>Wind Speed: ${parseFloat((data.wind.speed).toFixed(0))} MPH</p>
            `)
        })
    }
   
    $('#search').keydown(function (e) {

        let city = $('#search').val()
        if (e.which === 13) {
            $('#current-forecast').empty()
            e.preventDefault();
            getCurrentWeather(city)
         }
    })
});