# Film Ticket Booking Application

Run this command to get the backend started:

```console
$ json-server --watch db.json
```

Test your server by visiting this route in the browser:

[http://localhost:3000/films](http://localhost:3000/films)

Then, open the `index.html` file on your browser to run the application.

Write your code in the `src/script.js` file. The base URL for our API will be
[http://localhost:3000](http://localhost:3000).

Create a html [emmet]template and hardcode it, allocating,

* navbar section
* side menu section
* poster section
* card showing info section

NB: Don't forget to link it to the JavaScript file and the CSS file too.

Have the html template as,
```<DOCTYPE html>
  <head>
    <meta charset="UTF-8" />
    <title>Film Booking App</title>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/1.11.8/semantic.min.css"
    />
    <link rel="stylesheet" href="./src/style.css" />
    
  </head>
  <body>
    <!-- navbar -->
    <div class="heading">
      <div class="item">
        <h2 class="ui header">
          <div class="content">FLATDANGO</div>
          <div class="sub header" id="subtitle">BUY MOVIE TICKETS</div>
        </h2>
      </div>
    </div>
    <div class="ui centered grid">
      <div class="four wide column">
        <div class="list-container">
          <!-- side menu -->
          <ul class="ui divided list" id="films">
            <li class="film item">Film titles will go here.</li>
          </ul>
        </div>
      </div>

      <!-- poster -->
      <div class="four wide column">
        <img
          id="poster"
          src="./assets/anika-mikkelson-dWYjy9zIiF8-unsplash.jpg"
          alt="[FILM TITLE]"
        />
      </div>

      <!-- showing info -->
      <div class="four wide column">
        <div class="ui cards" id="showing">
          <div class="card">
            <div id="title" class="title">[FILM TITLE]</div>
            <div id="runtime" class="meta">[RUNTIME] minutes</div>
            <div class="content">
              <div class="description">
                <div id="film-info">[FILM DESCRIPTION]</div>
                <span id="showtime" class="ui blue label">[SHOWTIME]</span>
                <span id="ticket-num">[X]</span> remaining tickets
              </div>
            </div>
            <div class="extra content">
              <button id="buy-ticket" class="ui blue button">
                Buy Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <script src="./src/script.js"></script>
  </body>
</html>
```




Define the base url and remove the hardcoded list placeholder element and then create a function `fetchMovies()` that takes the base `url` as a parameter argument.

Create another function `displayMovie()` that takes a parameter argument`movie` to display the film menu. Then create a list element and set the cursor to a pointer, then append the created list element to the unordered list. Add a click event to the function.

Up until now, this is our code,

```//create fetch function
async function fetchMovies(url) {
await fetch(url)
.then((response) => response.json())
.then((movies) => {
movies.forEach((movie) => {
displayMovie(movie);
});
});
}
// display films menu
function displayMovie(movie) {
const li = document.createElement("li");
li.style.cursor = "pointer";
li.textContent = movie.title.toUpperCase();
unorderedListElement.appendChild(li);
addClickEvent();
}
```

The next thing would be to add a click event function to each an every film in the menu, perform an iteration then attach an event listener followed by a function call  `showMovieDetails(movie)`

```// add click event to films
function addClickEvent() {
  //let children = unorderedListElement.children;

  // loop through
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    child.addEventListener("click", () => {
      fetch(`${url}/${i + 1}`)
        .then((res) => res.json())
        .then((movie) => {
          document.getElementById("buy-ticket").textContent = "Buy Ticket";
          showMovieDetails(movie);
        });
    });
  }
}
```

Create a function that once  a film is clicked, there's a display of each film details. Add a button to the details also that upon once a repeated execution of booking is performed, the ticket limit exhausts and displays `sold out`.

```// display film details
function showMovieDetails(childMovie) {
  const preview = document.getElementById("poster");
  preview.src = childMovie.poster;

  const movieTitle = document.querySelector("#title");
  movieTitle.textContent = childMovie.title;
  const movieTime = document.querySelector("#runtime");
  movieTime.textContent = `${childMovie.runtime} minutes`;
  const movieDescription = document.querySelector("#film-info");
  movieDescription.textContent = childMovie.description;
  const showTime = document.querySelector("#showtime");
  showTime.textContent = childMovie.showtime;
  const tickets = document.querySelector("#ticket-num");
  tickets.textContent = childMovie.capacity - childMovie.tickets_sold;
}
const btn = document.getElementById("buy-ticket");
// add btn event listener
btn.addEventListener("click", function (e) {
  let availableTickets = document.querySelector("#ticket-num").textContent;
  e.preventDefault();
  if (availableTickets > 0) {
    document.querySelector("#ticket-num").textContent = availableTickets - 1;
  } else if (parseInt(availableTickets, 10) === 0) {
    btn.textContent = "Sold Out";
  }
});
```

At the terminal run the command `google-chrome index.html` to run the application on the chrome browser. As a priority, make sure that the server is on. Run `json-server --watch db.json` command to set up the backend.
