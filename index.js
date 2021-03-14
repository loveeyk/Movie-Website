//DOM Elements
let moviewrapper = document.querySelector('.movie-wrapper')

//Handler
function handleButtonClick(e) {
    let id = this.parentNode.parentNode.parentNode.id //Get the id of the affected card
    console.log(`Button in Card with ID:${id} clicked`)

    let movie = JSON.parse(localStorage.getItem(id))
    console.log(`Carddata fetched with ID: ${movie.id}`)

    if (!movie.isLiked) {
        movie.isLiked = true
        movie.likes += 1
    } else {
        movie.isLiked = false
        movie.likes -= 1
    }
    localStorage.setItem(id, JSON.stringify(movie))

    displayMovieCards()
}
// ### Helper Functions ###
//Create a Movie Card
function createMovieCard(movie) {

    //Movie Card DIV
    let moviecard = document.createElement('div') // Create
    moviecard.classList.add('movie-wrapper__movie-card') // Add class
    moviecard.setAttribute('id', movie.id)

    //Left Inside DIV
    let left = document.createElement('div') //Create
    left.style.background = `url(${movie.image})` //Add Background
    left.classList.add('movie-wrapper__movie-card--left') //Add Class

    //Right Inside DIV
    let right = document.createElement('div') //Create 
    right.classList.add('movie-wrapper__movie-card--right')
    let title = document.createElement('p') // Create 3 inside <p>'s
    let desc = document.createElement('p')
    let likes = document.createElement('p')
    let icon = document.createElement('i') // Like symbol
    let button = document.createElement('button') // Like Button
    icon.addEventListener('click', void 0)
    button.addEventListener('click', handleButtonClick) //Add Event Listener to Button

    title.classList.add('movie-wrapper__movie-card--title') //Add classes to <p>'s
    desc.classList.add('movie-wrapper__movie-card--desc')
    likes.classList.add('movie-wrapper__movie-card--likes')
    movie.isLiked ? likes.classList.add('liked') : likes.classList.remove('iliked') //Add liked styling
    icon.classList.add('fa', 'fa-video-camera')

    //fill with content
    title.innerHTML = movie.title //Fill <p>'s with content
    desc.innerHTML = movie.description
    likes.innerHTML = `${movie.likes} x `

    icon.setAttribute('ariaHidden', 'true')

    //Append everything to each other inside out
    button.appendChild(icon) //icon to <button>
    likes.appendChild(button) //button to likes
    right.appendChild(title) // title -> right
    right.appendChild(desc) // desc -> right
    right.appendChild(likes) // likes -> right

    moviecard.appendChild(left) // left, right --> moviecard
    moviecard.appendChild(right)

    return moviecard
}

//Get List from Local Storage
function getListFromLS() {
    let updated_list = []

    //Fetch up to date list from local Storage
    for (let i = 0; i < localStorage.length; i++) {
        updated_list.push(JSON.parse(localStorage.getItem(i)))
    }
    return updated_list;
}

//Clear all Movie Cards
function clearMovieCards() {
    while (moviewrapper.lastElementChild) {
        moviewrapper.removeChild(moviewrapper.lastElementChild);
    }
}
//Display all Movie Cards
function displayMovieCards() {

    let movielist = getListFromLS()
        //Clear Screen
    clearMovieCards()
        // For each movie create a Card and append to Movie Wrapper
    movielist.forEach(movie => {
        moviewrapper.appendChild(createMovieCard(movie))
    })
}

// Initialization - Save movie.json to localStorage 
function init() {
    movies.forEach(movie => {
        localStorage.setItem(movie.id.toString(), JSON.stringify(movie))
    })
}

//call init function only if local storage is empty (first visit)
(localStorage.length === 0) && init()

displayMovieCards();