$(document).ready(function() {
    var searchArray = [];
    
    
    
    if ($("#temp").val() < 30 && $("#temp").val() > -50) {
        searchArray += "Cold Weather"
    } else if ($("#temp").val() > 30 && $("#temp") < 70) {
        searchArray += "Mild Weather"
    } else if ($("#temp") > 70) {
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
            var cardEl = $("<div class=card>");
            var recipeImage = $("<img>");
            var recipeSnip = $("<p>");
            cardEl.text(response.hits[i].recipe.label);
            recipeImage.attr("src",response.hits[i].recipe.image)
            recipeSnip.text(response.hits[i].recipe.url)
            $(".Int-Card").append(cardEl);
            $(cardEl).append(recipeImage)
            $(cardEl).append(recipeSnip)
        }
    
    
    
    
    
    
       });
    
    })