//DOM Elements
let moviewrapper = document.querySelector('.movie-wrapper')

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

    title.classList.add('movie-wrapper__movie-card--title') //Add classes to <p>'s
    desc.classList.add('movie-wrapper__movie-card--desc')
    likes.classList.add('movie-wrapper__movie-card--likes')

    title.innerHTML = movie.title //Fill <p>'s with content
    desc.innerHTML = movie.description
    likes.innerHTML = `${movie.likes} x `

    let icon = document.createElement('i') // Like symbol
    icon.classList.add('fa', 'fa-video-camera')
    icon.setAttribute('ariaHidden', 'true')

    //Append everything to each other inside out
    likes.appendChild(icon) //icon to <p>
    right.appendChild(title) // title -> right
    right.appendChild(desc) // desc -> right
    right.appendChild(likes) // likes -> right

    moviecard.appendChild(left) // left, right --> moviecard
    moviecard.appendChild(right)

    return moviecard
}

//Display all Movie Cards

function displayMovieCards() {

    let updated_list = []

    //Fetch up to date list from local Storage
    for (let i = 0; i < localStorage.length; i++) {
        updated_list.push(JSON.parse(localStorage.getItem(i)))
    }
    // For each movie create a Card and append to Movie Wrapper
    updated_list.forEach(movie => {
        moviewrapper.appendChild(createMovieCard(movie))
    })
}

//Save movie.json to localStorage only if no data has been changed
function init() {
    movies.forEach(movie => {
        localStorage.setItem(movie.id.toString(), JSON.stringify(movie))
    })
}

//call init function if nothing in local storage
(localStorage.length === 0) && init()

displayMovieCards();