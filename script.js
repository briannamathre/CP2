//show cake recipe

document.getElementById("timeSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  
  const name = document.getElementById("recipeSearch").value.toLowerCase();
  if (name === "")
    return;
  console.log(name);

  let urlSearch = "https://api.edamam.com/search";
  urlSearch += "?q=" + name + "&app_id=80fdc886&app_key=8eb384a1085ea1a8fd9ec6923240169a";

  const diet = document.getElementById("dietRestrictions").value.toLowerCase();
  console.log(diet);
  if (diet === ""){}
  else{
    urlSearch += "&diet=" + diet;
  }

  const health = document.getElementById("health").value.toLowerCase();
  console.log(health);
  if (health === ""){}
  else{
    urlSearch += "&health=" + health;
  }

  const lowCal = document.getElementById("lowCal").value;
  const highCal = document.getElementById("highCal").value;
  console.log(lowCal);
  console.log(highCal);
  if (lowCal === "" || highCal === ""){}
  else{
     urlSearch += "&calories=" + lowCal + "-" + highCal;
  }

  fetch(urlSearch)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
  
  let recipes = "";
    
  calPerServing = function(calories, serving) {
    let cal = calories;
    let num = cal/serving;
    return Math.round(num);
  }

  timeChanger = function(minutes) {
    let min = minutes;
    let hours = 0;
    let output ="";
    while (min > 60){
      hours += 1;
      min -= 60;
    }
    if (hours === 0 && min === 0){return "not specified"};
    output += hours + " hr " + min + " min";
    return output;
  }

  for (let i=0; i < json.hits.length; i++) {
    recipes += "<div id = 'one-item'>"
      recipes += "<img src='" + json.hits[i].recipe.image +"'></img>";
      recipes += "<div id = 'basic-info'>";
        recipes += "<h3>";
          recipes += json.hits[i].recipe.label ;
        recipes += "</h3>";
        recipes += "<div id = 'servings'>";
          let time = timeChanger(json.hits[i].recipe.totalTime);
          recipes += "<p> Time: " + time + "</p>"

          let totalCal = Math.round(json.hits[i].recipe.calories);
          let servings = Math.floor(json.hits[i].recipe.yield);
          recipes += "<p> Servings: " + servings+ " servings </p>"
          let perServing = calPerServing(totalCal,servings);
          recipes += "<p> Cals per Serving : " +  perServing + " calories </p>"
          recipes += "<p> Total Calories : " + totalCal + " calories </p>"
        recipes += "</div>"; 
        recipes += "<div id = 'ingredients'>";
          recipes += "<ul>"
            for (let j=0; j < json.hits[i].recipe.ingredients.length; j++){
              recipes += "<li>" + json.hits[i].recipe.ingredients[j].text + "</li>";
            }
          recipes+= "</ul>";
        recipes += "</div>"
        recipes += "<div id = 'links'>";
          recipes += '<a href="'+ json.hits[i].recipe.url +'"> Get Full Recipe Here</a>';
        recipes += "</div>"
      recipes += "</div>";
    recipes += "</div>";
  }
  recipes+= '<ul class = "footer"> <li> <a href="https://github.com/briannamathre/creative1.git">GitHub</a></li></ul>';
      console.log(recipes);
      document.getElementById("recipeResults").innerHTML = recipes;
    });
});



