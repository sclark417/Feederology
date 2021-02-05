function getCurrentWeather(searchValue) {
  console.log(searchValue);

  var apiKey = "2475c48a9f27efa0b6bdd756142d1e2f";
  var apiQuery = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=imperial&appid=${apiKey}`;

  //api call
  $.ajax({
    url: apiQuery,
    method: "GET",
  }).then(function (data) {
    console.log(data);

    $("#current-forecast").append(`
        <h4 class='city-name'>${data.name}</h4>
        <img style='inline' src = 'http://openweathermap.org/img/wn/${
          data.weather[0].icon
        }@2x.png' width='70px height='70px' alt='weather icon'>
        <p class='temp'>Temperature: ${parseFloat(
          data.main.temp.toFixed(0)
        )}°F</p>
        <p class='humid'>Humidity: ${parseFloat(
          data.main.humidity.toFixed(0)
        )}%</p>
        <p class='wind'>Wind Speed: ${parseFloat(
          data.wind.speed.toFixed(0)
        )} MPH</p>


        



        `);

    var temperatureDisplay = data.main.temp;

    console.log(temperatureDisplay);

    if (temperatureDisplay !== null) {
      var searchArray = [];

      var healthySelector = document.getElementById("healthySelector");
      var nutFreeSelector = document.getElementById("nutFreeSelector");
      var alcoholFreeSelector = document.getElementById("alcoholFreeSelector");
      var glutenFreeSelector = document.getElementById("glutenFreeSelector");
      var sugarFreeSelector = document.getElementById("sugarFreeSelector");
      var lowSodiumSelector = document.getElementById("lowSodiumSelector");

      var spanHealthySelector = document.getElementById("spanHealthySelector");
      var spanNutFreeSelector = document.getElementById("spanNutFreeSelector");
      var spanAlcoholFreeSelector = document.getElementById(
        "spanAlcoholFreeSelector"
      );
      var spanGlutenFreeSelector = document.getElementById(
        "spanGlutenFreeSelector"
      );
      var spanSugarFreeSelector = document.getElementById(
        "spanSugarFreeSelector"
      );
      var spanLowSodiumFreeSelector = document.getElementById(
        "spanLowSodiumFreeSelector"
      );

      if (temperatureDisplay < 10 && temperatureDisplay > -50) {
        searchArray += " Very Cold Weather";
      } else if (temperatureDisplay > 10 && temperatureDisplay < 30) {
        searchArray += "Cold Weather";
      } else if (temperatureDisplay > 30 && temperatureDisplay < 40) {
        searchArray += "Chilly Weather";
      } else if (temperatureDisplay > 40 && temperatureDisplay < 50) {
        searchArray += "Mild Weather";
      } else if (temperatureDisplay > 50 && temperatureDisplay < 60) {
        searchArray += "Warm Weather";
      } else if (temperatureDisplay > 60 && temperatureDisplay < 80) {
        searchArray += "Hot Weather";
      } else if (temperatureDisplay > 80) {
        searchArray += "Very Hot Weather";
      }

      var healthLabelArray = [];

      switch (healthySelector.checked) {
        case (healthySelector.checked = true):
          healthLabelArray =
            healthLabelArray + "&health=" + spanHealthySelector.textContent;
          break;
        case (healthySelector.checked = false):
          healthLabelArray = healthLabelArray;
          break;
      }

      switch (nutFreeSelector.checked) {
        case (nutFreeSelector.checked = true):
          healthLabelArray =
            healthLabelArray + "&health=" + spanNutFreeSelector.textContent;
          break;
        case (nutFreeSelector.checked = false):
          healthLabelArray = healthLabelArray;
          break;
      }

      switch (alcoholFreeSelector.checked) {
        case (alcoholFreeSelector.checked = true):
          healthLabelArray =
            healthLabelArray + "&health=" + spanAlcoholFreeSelector.textContent;
          break;
        case (alcoholFreeSelector.checked = false):
          healthLabelArray = healthLabelArray;
          break;
      }

      switch (glutenFreeSelector.checked) {
        case (glutenFreeSelector.checked = true):
          healthLabelArray =
            healthLabelArray + "&health=" + spanGlutenFreeSelector.textContent;
          break;
        case (glutenFreeSelector.checked = false):
          healthLabelArray = healthLabelArray;
          break;
      }

      switch (sugarFreeSelector.checked) {
        case (sugarFreeSelector.checked = true):
          healthLabelArray =
            healthLabelArray + "&health=" + spanSugarFreeSelector.textContent;
          break;
        case (sugarFreeSelector.checked = false):
          healthLabelArray = healthLabelArray;
          break;
      }

      switch (lowSodiumSelector.checked) {
        case (lowSodiumSelector.checked = true):
          healthLabelArray =
            healthLabelArray +
            "&health=" +
            spanLowSodiumFreeSelector.textContent;
          break;
        case (lowSodiumSelector.checked = false):
          healthLabelArray = healthLabelArray;
          break;
      }

      console.log(healthLabelArray);

      var YOUR_APP_KEY = "f4b597f62e7762dd1104ed1206f93828";
      var YOUR_APP_ID = "58d62880";
      var searchTerm = JSON.stringify(searchArray);
      var resultLength = "10";
      var healthLabels = JSON.stringify(healthLabelArray).toLowerCase();
      var healthLabelsAdjusted = healthLabels.replace(/ /g, "");
      var healthLabelsAdjustedTwice = healthLabelsAdjusted
        .substring(9)
        .slice(0, -1);

      if (healthLabels !== "[]") {
        var apiQuery =
          "https://api.edamam.com/search?q=" +
          searchTerm +
          "&app_id=" +
          YOUR_APP_ID +
          "&app_key=" +
          YOUR_APP_KEY +
          "&to=" +
          resultLength +
          "&health=" +
          healthLabelsAdjustedTwice;

        console.log(apiQuery);
      } else {
        var apiQuery =
          "https://api.edamam.com/search?q=" +
          searchTerm +
          "&app_id=" +
          YOUR_APP_ID +
          "&app_key=" +
          YOUR_APP_KEY +
          "&to=" +
          resultLength;

        console.log(apiQuery);
      }

      $.ajax({
        url: apiQuery,
        method: "GET",
      }).then(function (response) {
        console.log(response);

        for (var i = 0; i < response.hits.length; i++) {
          var cardEl = $('<div class="card col s12 m5" id="recipe">');
          var recipeImage = $("<img>");
          var recipeSnip = $("<p>");

          cardEl.text(response.hits[i].recipe.label);
          recipeImage.attr("src", response.hits[i].recipe.image);
          recipeSnip.append(response.hits[i].recipe.url);

          $(".appendingCard").append(cardEl);
          $(cardEl).append(recipeImage);
          $(cardEl).append(recipeSnip);
        }

        $("#recipe").mouseover(function () {
          $("#recipe").animate({ height: "10%", width: "10%" });
        });

        $("#recipe").mouseout(function () {
          $("#recipe").animate({ height: "auto", width: "auto" });
        });
        ``;
      });
    }
  });
}

$("#search").keydown(function (e) {
  let city = $("#search").val();
  if (e.which === 13) {
    $("#current-forecast").empty();
    e.preventDefault();
    getCurrentWeather(city);
  }
});
