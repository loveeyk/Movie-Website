let movielist = JSON.parse(movies)

//initialize likes
movielist.forEach(movie => {
    localStorage.setItem(`${movie.id}`, `${movie.likes}`)
})