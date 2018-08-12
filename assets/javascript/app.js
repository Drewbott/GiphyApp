var celebrities = ["Brad Pitt", ];

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayGifs() {
$("#gifsDiv").empty();

  var celebrity = $(this).attr("data-name");
  console.log(this)
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=flObyjxaDjlnvavqcHAbDN1rA8IGNVsy&q=" + celebrity + 
  "&limit=10"

  // Creating an AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
 console.log(response)
    // Creating a div to hold the movie
    var results = response.data;

    for (var i = 0; i < results.length; i++) {


    // var gifStill = results[i].images.fixed_height_still.url;
    var gifStill = results[i].images.fixed_height_still.url;
    var gifAnimate = results[i].images.fixed_height.url;
  
    
    var celebrityImage = $("<img class='img-responsive star'>")
    

    // var celebrityImage = $("img class='img-responsive' style='height: 300px;'>")
    
    celebrityImage.attr("src", gifStill);
    celebrityImage.attr("data-still", gifStill);
    celebrityImage.attr("data-animate", gifAnimate);
    celebrityImage.attr("data-state", "still");
    celebrityImage.attr("alt", "celebrity-image");


$("#gifsDiv").append(celebrityImage)


    // Putting the entire movie above the previous movies
    // $("#celebrities-view").prepend(gifsDiv);
    }
  }); 
}

$(document).on('click', '.star', function(){
  var state = $(this).attr('data-state');
  var moving = $(this).attr('data-animate');
  var still = $(this).attr('data-still');

  if(state === "still"){
    $(this).attr('src', moving);
    $(this).attr('data-state', 'animate');
  }
  else{
    $(this).attr('src', still);
    $(this).attr('data-state', 'still');
  }
})
// Function for displaying movie data
function renderButtons() {

  // Deleting the movies prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of movies
  for (var i = 0; i < celebrities.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of movie-btn to our button
    a.addClass("gifs-btn btn btn-danger ml-4 mb-3");
    // Adding a data-attribute
    a.attr("data-name", celebrities[i]);
    // Providing the initial button text
    a.text(celebrities[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where a movie button is clicked
$("#add-celebrity").on("click", function(event) {
  event.preventDefault();
  

  
  // This line grabs the input from the textbox
  var celebrity = $("#celebrity-input").val().trim();

  // Adding movie from the textbox to our array
  
  celebrities.push(celebrity);
  

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".gifs-btn", displayGifs);

// Calling the renderButtons function to display the intial buttons
renderButtons();