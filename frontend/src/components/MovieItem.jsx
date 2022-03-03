


function MovieItem({movie}){
    console.log(movie)
    return(
        <div className="goal">
            <div>
                {new Date(movie.createdAt).toLocaleString('en-US')}
            </div>
            <h2>{movie.title}</h2>
            <h2>{movie.poster}</h2>
            <h2>{movie.type}</h2>
        </div>
    )
}

export default MovieItem;