//DOM Elements
let moviewrapper = document.querySelector('.movie-wrapper')

let movielist = [...movies]

//Render Cards
function renderCards() {
    JSON.parse(localStorage.getItem('movielist')).forEach(movie => {
        console.log("render Cards with " + movie)
        moviewrapper.appendChild(createMovieCard(movie))
    })
}

function replaceCard(id, card) {
    moviewrapper.replaceChild(card, document.getElementById(id))
}

let init = () => {

    if (localStorage.getItem('liked') === null) {
        console.log("liked is  null")
        localStorage.setItem('liked', '')
        localStorage.setItem('movielist', JSON.stringify(movielist))
    }

    renderCards()
}



// ### Helper Functions ###

//Create a Movie Card
function createMovieCard(movie) {
    console.log("create MovieCard with " + movie)
        //Movie Card DIV
    let moviecard = document.createElement('div') // Create
    moviecard.classList.add('movie-wrapper__movie-card') // Add class
    moviecard.setAttribute('id', movie.id)

    //Left Inside DIV
    let left = document.createElement('div') //Create
    left.style.background = `url(${movie.image})` //Add Background
    left.classList.add('movie-wrapper__movie-card--left')

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
    likes.innerHTML = `${movie.likes} Likes `

    let icon = document.createElement('i') // Like symbol
    icon.classList.add('fa', 'fa-video-camera')
    icon.setAttribute('ariaHidden', 'true')


    if (localStorage.getItem('liked').includes(movie.id)) {
        console.log(movie.title + " matches id..adding like class")
        likes.classList.add('liked')
    } else {
        likes.classList.remove('liked')
        console.log(movie.title + " does not match id .. removing like class")
    }


    //Append everything to each other inside out
    likes.appendChild(icon) //icon to <p>
    right.appendChild(title) // title -> right
    right.appendChild(desc) // desc -> right
    right.appendChild(likes) // likes -> right

    moviecard.appendChild(left) // left, right --> moviecard
    moviecard.appendChild(right)

    likes.addEventListener('click', handleLikeClick)

    return moviecard
}

function handleLikeClick(e) {
    let card = e.target.parentElement.parentElement.parentElement
    let like_array = localStorage.getItem('liked').split(',')
    if (!(like_array.includes(card.id))) {
        movielist[card.id].likes = movielist[card.id].likes + 1

        like_array.push(card.id)

        localStorage.setItem('liked', like_array.toString())

    } else {
        movielist[card.id].likes = movielist[card.id].likes - 1
        let filtered = like_array.filter(like => like !== card.id)
        localStorage.setItem('liked', filtered.toString())
    }
    localStorage.setItem('movielist', JSON.stringify(movielist)) //Save to local storage
    replaceCard(card.id, createMovieCard(JSON.parse(localStorage.getItem('movielist'))[card.id]))

}
init()