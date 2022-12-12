async function getFilms() {
 const films = await fetch('http://localhost:3000/films')
 .then((response) => response.json())
 .then((films) => films);

  let list = document.getElementById("film-list");

  for (let film of films) {
   
    const content = `
  <div class="card">
  <div class="card-header" id="heading">
    <h5 class="mb-0">
      <button class="btn btn-link" data-toggle="collapse" data-target="#collapse" aria-expanded="true" aria-controls="collapse">
         Buy Ticket
              </button>
    </h5>
  </div>
  <div id="collapse" class="collapse show" aria-labelled by="heading" data-parent="#accordion">
    <div class="card-body">
      <h5>${film.title}</h5>
      <p>${film.description}</p>
      <p>${film.showtime}</p>
      <img src=${film.poster} alt="" height="100">
    </div>
  </div>
</div>
`

    // append the created film card element to the container
    list.innerHTML += content;
  }
}


getFilms()



