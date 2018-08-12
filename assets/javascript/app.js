var celebrities = ["Brad Pitt", ];

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayGifs() {

  var celebrity = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=flObyjxaDjlnvavqcHAbDN1rA8IGNVsy&q=" + celebrity + 
  "&limit=10&offset=0&rating=G&lang=en"

  // Creating an AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
 console.log(response)
    // Creating a div to hold the movie
    var gifsDiv = $("<div id='images'>");
    var rtDiv = $('<div>');
    // Storing the rating data
    var rating = response.Rated;

    // Creating an element to have the rating displayed
    var pOne = $("<h2 class='text-center'>").text("Rated: " + rating);

    // Displaying the rating
    rtDiv.append(pOne);

    // Storing the release year
    var released = response.Released;

    // Creating an element to hold the release year
    var pTwo = $("<h3 class='text-center'>").text("Released: " + released);

    // Displaying the release year
    rtDiv.append(pTwo);

    // Storing the plot
    var plot = response.Plot;

    // Creating an element to hold the plot
    var pThree = $("<p class='text-center'>").text("Plot: " + plot);

    // Appending the plot
    rtDiv.append(pThree);

    // Retrieving the URL for the image
    var imgURL = response.Poster;

    // Creating an element to hold the image
    var image = $("<img class='img-responsive mx-auto' style='display:block'>").attr("src", imgURL);

    // Appending the image
    gifsDiv.append(rtDiv)
    gifsDiv.append(image);
    

    // Putting the entire movie above the previous movies
    $("#celebrities-view").prepend(gifsDiv);
  });

}

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