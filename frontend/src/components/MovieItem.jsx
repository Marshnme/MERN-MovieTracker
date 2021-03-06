import { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {deleteMovie,updateMovie} from '../features/movies/movieSlice'
import {FaEdit} from 'react-icons/fa'
import MovieEdit from '../components/MovieEdit'
import {Link} from 'react-router-dom'

function MovieItem({movie}){

    const [toggleEdit,setToggleEdit] = useState(null)
    

    const dispatch = useDispatch()

    useEffect(()=>{
        if(toggleEdit){
            setToggleEdit(false)
        }
    },[movie.comment])

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
            <Link to='/movieDetail' state={movie}>
                <h4>{movie.Title}</h4>
                <img src={movie.Poster}></img>
                <p>{movie.comment}</p>
                <button onClick = {()=>dispatch(deleteMovie(movie._id))} className="close">X</button>
            </Link>
        </div>
    )
}

export default MovieItem;
