import {useState, useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { createMovie,getAllMovies,reset } from '../features/movies/movieSlice'
import { useNavigate } from 'react-router-dom'
import {FaList} from 'react-icons/fa'
import Spinner from '../components/Spinner'
import  './styles/movieSearchStyles.scss'
function MovieSearch(){

   

    const [searchQuery, setSearchQuery] = useState({
        Title:'',
        Page:"1",
    })

    const {allMovies,isLoading, isError,message,noMovieReturn} = useSelector((state) => state.movies)
    const {user} = useSelector((state) => state.auth)

     console.log(allMovies)

    const searchForMovie = (e) => {
            e.preventDefault()
            
            dispatch(getAllMovies(searchQuery))
            setSearchQuery({
                Title:searchQuery.Title,
                Page:"1"
            })
        }

    useEffect(() =>{
        // window.scrollTo(0, 0)
        if(isError){
            console.log(message)
        }
        if(!user){
            navigate('/login')
        }
       
        if(searchQuery.Title != ''){
            dispatch(getAllMovies(searchQuery))
        }
        
        return () => {
            dispatch(reset())
        } 
        
    },[searchQuery.Page ])
  
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onChange = (e) => {
        setSearchQuery((prevState) =>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }

    

    const nextPage = (e) => {
        e.preventDefault()
        let newPage = parseInt(searchQuery.Page) + 1
        setSearchQuery({
            Title:searchQuery.Title,
            Page:newPage.toString()
        })
        console.log("pagenum-Next",searchQuery.Page)
        
    }
    const previousPage = (e) => {
        e.preventDefault()
        if(searchQuery.Page === "1"){
            
        }else{
            let newPage = parseInt(searchQuery.Page) - 1
            setSearchQuery({
                Title:searchQuery.Title,
                Page:newPage.toString()
            })
            console.log("pagenum-Prev",searchQuery.Page)
            
        }
    }
    
    
    
    
    if(isLoading){
       <Spinner/>
    }
    if(noMovieReturn){
        return(
            <>
            <h3>Search for a movie</h3>
            <form onSubmit={searchForMovie}>
                <input type='text' placeholder='Search for a movie' name="Title" value={searchQuery.Title} onChange={onChange}></input>
                <button type='submit' > Search </button>
            </form>
            <div>
                <h4>No movie found, check your spelling</h4>
            </div>
            </>
        )
    }
    
    return (allMovies.length === 0  ? (
        <>
            <h3>Search for a movie</h3>
            <form onSubmit={searchForMovie}>
                <input type='text' placeholder='Search for a movie' name="Title" value={searchQuery.Title} onChange={onChange}></input>
                <button type='submit' > Search </button>
            </form>
        </>
        ):(
            <div className="movie-search-parent">
                <div>
                    <h3>Search for a movie</h3>
                    <form className='movie-search-form'onSubmit={searchForMovie}>
                        <input type='text' placeholder='Search for a movie' name="Title" value={searchQuery.Title} onChange={onChange}></input>
                        <button type='submit' > Search </button>
                    </form> 
            </div>
            <div  className='movie-list-wrapper'>
            
                {allMovies.map((movie) =>(
                    movie.Poster !== 'N/A' ? (
                        
                        <div key = {movie.imdbID} className='movie-wrapper'>
                            <img src={movie.Poster}></img>  
                            <p><FaList className='list-icon' onClick={() => {dispatch(createMovie(movie))}} /></p>
                        </div>
                       
                    ):(
                        <div key = {movie.imdbID} className='movie-wrapper'>
                            <h3>no Poster for movie</h3>
                            <h3>{movie.Title}</h3>
                        </div>
                    ) 
                ))}
            </div>
            <button onClick={previousPage}>Previous Page</button>
            <button onClick={nextPage}>Next Page</button>
        </div>
        ))
}

export default MovieSearch