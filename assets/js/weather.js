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

        var temperatureDisplay = data.main.temp

        console.log(temperatureDisplay)


        if (temperatureDisplay !== null){

            var searchArray = [];


            if (temperatureDisplay < 30 && temperatureDisplay > -50) 
            {searchArray += "Cold Weather"
            } else if (temperatureDisplay> 30 && temperatureDisplay < 70) {
            searchArray += "Mild Weather"
            } else if ($(temperatureDisplay) > 70) {
            searchArray += 'Hot Weather'
            }




            var YOUR_APP_KEY = "f4b597f62e7762dd1104ed1206f93828";
            var YOUR_APP_ID = "58d62880";
            var searchTerm  = JSON.stringify(searchArray);
            var resultLength = "10";

            var apiQuery = "https://api.edamam.com/search?q="+searchTerm+"&app_id="+ YOUR_APP_ID +"&app_key="+ YOUR_APP_KEY +"&to="+resultLength;


                $.ajax ({            
                    url: apiQuery,
                    method: "GET"
                }).then(function(response) {
                    
                    console.log(response)

                    for (var i = 0; i < response.hits.length; i++) {

                        var cardEl = $('<div class="card col s12 m5">');
                        var recipeImage = $("<img>");
                        var recipeSnip = $("<p>");
                        $(".appendingCard").append('<div class=card>')
                        cardEl.text(response.hits[i].recipe.label);
                        recipeImage.attr("src",response.hits[i].recipe.image)
                        recipeSnip.text(response.hits[i].recipe.url)
                        $(".appendingCard").append(cardEl);
                        $(cardEl).append(recipeImage)
                        $(cardEl).append(recipeSnip)
                    }
               });             
        };
    })
}

$('#search').keydown(function (e) {

    let city = $('#search').val()
    if (e.which === 13) {
        $('#current-forecast').empty();
        e.preventDefault();
        getCurrentWeather(city);
        
    }
    
        
    
});
        