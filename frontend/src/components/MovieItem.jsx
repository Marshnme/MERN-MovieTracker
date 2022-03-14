import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {deleteMovie,updateMovie} from '../features/movies/movieSlice'
import {FaEdit} from 'react-icons/fa'
import MovieEdit from '../components/MovieEdit'

function MovieItem({movie}){

    const [toggleEdit,setToggleEdit] = useState(null)
    console.log(movie)

    const dispatch = useDispatch()

    return(
        <div className="goal">
            <FaEdit onClick={() =>{setToggleEdit(true)}}/>
            {toggleEdit ?
             (<MovieEdit movie={movie}/>)
            :
             (null)}
            <div>
                {new Date(movie.createdAt).toLocaleString('en-US')}
            </div>
            <h4>{movie.Title}</h4>
            <img src={movie.Poster}></img>
            <p>{movie.comment}</p>
            <button onClick = {()=>dispatch(deleteMovie(movie._id))} className="close">X</button>
        </div>
    )
}

export default MovieItem;