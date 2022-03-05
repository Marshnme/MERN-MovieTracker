import {useState, useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { getAllMovies } from '../features/movies/movieSlice'
import  './styles/movieSearchStyles.scss'
function MovieSearch(){

    const [searchQuery, setSearchQuery] = useState({
        Title:'batman',
        Page:"1",
    })

    const {allMovies} = useSelector((state) => state.movies)
    const dispatch = useDispatch()
    
    const onChange = (e) => {
        setSearchQuery((prevState) =>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }


    const searchForMovie = (e) => {
        e.preventDefault()
        
        dispatch(getAllMovies(searchQuery))

    }
    
    useEffect(() =>{
        dispatch(getAllMovies(searchQuery))
    },[])
    
    

    return(
        <div>
            <div>
                <form onSubmit={searchForMovie}>
                    <input type='text' placeholder='Search for a movie' name="Title" value={searchQuery.Title} onChange={onChange}></input>
                    <button type='submit' > Search </button>
                </form>
                
            </div>
            <div  className='movie-wrapper'>
                
                {allMovies.map((movie) =>(
                    
                    movie.Poster !== 'N/A' ? (
                        <div key = {movie.imdbID}>
                            <img src={movie.Poster}></img>
                            <p>{movie.Title}</p>
                            <span>{movie.Year}</span>
                        </div>
                        
                    ):(
                        <div key = {movie.imdbID}>
                            <h3>no Poster for movie</h3>
                            <h3>{movie.Title}</h3>
                        </div>
                        
                    )
                        
                ))}
            </div>
        </div>
    )
}

export default MovieSearch