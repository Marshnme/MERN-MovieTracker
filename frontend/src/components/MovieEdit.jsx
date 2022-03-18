import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import{updateMovie,reset} from '../features/movies/movieSlice'
import {useState} from 'react';
import Spinner from '../components/Spinner';


function MovieEdit(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isLoading, isError,message} = useSelector((state) => state.movies)
    const {user} = useSelector((state) => state.auth)

    const [movie,setMovie] = useState({
        Poster:props.movie.Poster,
        Title:props.movie.Title,
        Type:props.movie.Type,
        Year:props.movie.Year,
        createdAt:props.movie.createdAt,
        imdbID:props.movie.imdbID,
        updatedAt:props.movie.updatedAt,
        user:props.movie.user,
        __v: props.movie.__v,
        _id: props.movie._id,
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
        
        dispatch(updateMovie(movie))

    }
    // useEffect(()=> {

    //     if(isError){
    //         console.log(message)
    //     }
    //     if(!user){
    //         navigate('/login')
    //     }
    //     dispatch(getUserMovies())
    //     return () => {
    //         dispatch(reset())
    //     } 
    // },[props.movies])
    if(isLoading){
        return <Spinner/>
     }
    return(
        <>
            <form onSubmit={onSubmit}>
                <label htmlFor='text'></label>
                <input type='text' name='comment' id='comment' value={movie.comment ? (movie.comment):('')} onChange={onChange}></input>
                <button type="submit">Comment</button>
            </form>
        </>
    )
}

export default MovieEdit