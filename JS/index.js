//DOM Elements
let moviewrapper = document.querySelector('.movie-wrapper')
let button_sortAsc = document.querySelector('#asc')
let button_sortDesc = document.querySelector('#desc')
let input_search = document.querySelector('#search')

//Variables
let isAsc = false;

//Event Listener
button_sortAsc.addEventListener('click', () => {
    console.log("clicked asc")
    isAsc = false;
    button_sortDesc.classList.remove('hide') //Show Desc
    button_sortAsc.classList.add('hide') //Hide Asc
    let movielist = getListFromLS()
    displayMovieCards(movielist)
})
button_sortDesc.addEventListener('click', () => {
    console.log("clicked desc")
    isAsc = true;
    button_sortAsc.classList.remove('hide') //show Asc
    button_sortDesc.classList.add('hide') //Hide Desc
    let movielist = getListFromLS()
    displayMovieCards(movielist)
})
input_search.addEventListener('input', handleSearchInput)

//Handler ###
//Adds 1+like to correct array entry
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

    //displayMovieCards()
    //just change button element and textspan
    this.previousElementSibling.innerHTML = ` ${movie.likes} x `
    this.parentNode.classList.toggle('liked')
}

// Filters movie array for searched word, clears screen and shows cards
function handleSearchInput(e) {
    let movielist = getListFromLS()
    let filtered_list = movielist.filter(movie => movie.title.toLowerCase().includes(this.value.toLowerCase()))

    clearMovieCards() //First Clear all cards

    // IF the filtered list is empty(=no searchresults found) display a span in moviewrapper
    if (filtered_list.length === 0) {
        let span = document.createElement('span')
        span.style.zIndex = 1;
        span.innerHTML = "Sorry, nothing found..."
        moviewrapper.appendChild(span)
    } else { //otherwise display the filtered results
        displayMovieCards(filtered_list)
    }
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
    let span = document.createElement('span')
    let icon = document.createElement('i') // Like symbol
    let button = document.createElement('button') // Like Button

    button.addEventListener('click', handleButtonClick) //Add Event Listener to Button

    title.classList.add('movie-wrapper__movie-card--title') //Add classes to <p>'s
    desc.classList.add('movie-wrapper__movie-card--desc')
    likes.classList.add('movie-wrapper__movie-card--likes')
    movie.isLiked ? likes.classList.add('liked') : likes.classList.remove('iliked') //Add liked styling
    icon.classList.add('fa', 'fa-video-camera')

    //fill with content
    title.innerHTML = movie.title //Fill <p>'s with content
    desc.innerHTML = movie.description
    span.innerHTML = `${movie.likes} x `

    icon.setAttribute('ariaHidden', 'true')

    //Append everything to each other inside out
    button.appendChild(icon) //icon to <button>
    likes.appendChild(span)
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
function displayMovieCards(movielist) {

    //Clear Screen
    clearMovieCards()

    //Sort Descending

    movielist.sort((m1, m2) => isAsc ? (m1.likes - m2.likes) : (m2.likes - m1.likes))

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
    isAsc = false
}

//call init function only if local storage is empty (first visit)
(localStorage.length === 0) && init()
let movielist = getListFromLS()
displayMovieCards(movielist);