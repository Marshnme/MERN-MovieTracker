import {useState, useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { getAllMovies,reset } from '../features/movies/movieSlice'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import  './styles/movieSearchStyles.scss'
function MovieSearch(){

    const [searchQuery, setSearchQuery] = useState({
        Title:'',
        Page:"1",
    })

    const {allMovies,isLoading, isError,message} = useSelector((state) => state.movies)
    const {user} = useSelector((state) => state.auth)
  
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onChange = (e) => {
        setSearchQuery((prevState) =>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }


    const searchForMovie = (e) => {
        e.preventDefault()
        
        dispatch(getAllMovies(searchQuery))
        setSearchQuery({
            Title:'',
            Page:searchQuery.Page,
        })
    }
    
    useEffect(() =>{
        
        if(isError){
            console.log(message)
        }
        if(!user){
            navigate('/login')
        }

        dispatch(getAllMovies(searchQuery))

        return () => {
            dispatch(reset)
        } 
    },[])
    
    
    if(isLoading){
        <Spinner/>
    }

    if(allMovies === undefined){
        return (
            <>
                <h3>Search for a movie</h3>
                <form onSubmit={searchForMovie}>
                    <input type='text' placeholder='Search for a movie' name="Title" value={searchQuery.Title} onChange={onChange}></input>
                    <button type='submit' > Search </button>
                </form>
            </>
        
        )
    }
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