import { useDispatch } from 'react-redux';
import {deleteMovie} from '../features/movies/movieSlice'


function MovieItem({movie}){
    console.log(movie)

    const dispatch = useDispatch()
    return(
        <div className="goal">
            <div>
                {new Date(movie.createdAt).toLocaleString('en-US')}
            </div>
            <h4>{movie.Title}</h4>
            <img src={movie.Poster}></img>
            <button onClick = {()=>dispatch(deleteMovie(movie._id))} className="close">X</button>
        </div>
    )
}

export default MovieItem;