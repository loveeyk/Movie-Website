let movielist = JSON.parse(movies)

//DOM Elements
let moviewrapper = document.querySelector('.movie-wrapper')


//initialize likes
movielist.forEach(movie => {
    localStorage.setItem(`
        $ { movie.id }
        `, `
        $ { movie.likes }
        `)
    moviewrapper.appendChild(createMovieCard(movie))
})

// ### Helper Functions ###

//Create a Movie Card
function createMovieCard(movie) {

    //Movie Card DIV
    let moviecard = document.createElement('div') // Create
    moviecard.classList.add('movie-wrapper__movie-card') // Add class

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

    //Append everything to each other inside out
    likes.appendChild(icon) //icon to <p>
    right.appendChild(title) // title -> right
    right.appendChild(desc) // desc -> right
    right.appendChild(likes) // likes -> right

    moviecard.appendChild(left) // left, right --> moviecard
    moviecard.appendChild(right)

    return moviecard
}