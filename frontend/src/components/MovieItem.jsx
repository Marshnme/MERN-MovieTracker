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
            <h2>{movie.title}</h2>
            <h2>{movie.poster}</h2>
            <h2>{movie.type}</h2>
            <button onClick = {()=>dispatch(deleteMovie(movie._id))} className="close">X</button>
        </div>
    )
}

export default MovieItem;