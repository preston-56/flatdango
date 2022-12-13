// define base url
let url = "http://localhost:3000/films";
const unorderedListElement = document.getElementById("films");
document.addEventListener("DOMContentLoaded", () => {
  document.getElementsByClassName("film item")[0].remove(); //remove `li` hardcoded placeholder element
  fetchMovies(url);
});

//create fetch function
function fetchMovies(url) {
  fetch(url)
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
// add click event to films
function addClickEvent() {
  let children = unorderedListElement.children;

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
// display film details
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
