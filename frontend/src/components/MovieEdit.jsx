import { useDispatch,useSelector } from 'react-redux';
import{updateMovie} from '../features/movies/movieSlice'
import {useState,useEffect} from 'react';


function MovieEdit(props) {
    console.log(props.movie)
    const dispatch = useDispatch()

    // const {movies} = useSelector((state) => state.movies)

    const [movie,setMovie] = useState({
        Poster:props.movie.Poster,
        Title:props.movie.Title,
        Type:props.movie.Type,
        Year:props.movie.Year,
        imdbID:props.movie.imdbID,
        comment:props.movie.comment
        
    })

    const onChange = (e) => {
        setMovie((prevState) =>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }

    const onSubmit = (e) =>{
        e.preventDefault()
        console.log("onsubmit",movie)
        dispatch(updateMovie(props.id,movie))
        // setMovies({
        // poster:'',
        // title:'',
        // type:'',
        // year:'',
        // imdbID:''})
    }
    return(
        <>
            <form onSubmit={onSubmit}>
                <label htmlFor='text'></label>
                <input type='text' name='comment' id='comment' value={movie.comment} onChange={onChange}></input>
                <button type="submit">Comment</button>
            </form>
        </>
    )
}

export default MovieEdit