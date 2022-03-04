import { useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { getAllMovies } from '../features/movies/movieSlice'

function MovieSearch(){

    const dispatch = useDispatch()
    

    const {allMovies} = useSelector((state) => state.movies)

    useEffect(() =>{
        dispatch(getAllMovies())
    },[])
    console.log("allMovies",allMovies)
    return(
        <div>
            {allMovies.map((movie) =>(
                
                movie.Poster !== "N/A" ? (
                    <div>
                        <img src={movie.Poster}></img>
                    </div>
                    
                ):(
                    <div>
                        <h3>no Poster for movie</h3>
                    </div>
                    
                )
                    
                    
                    
                
            ))}
        </div>
    )
}

export default MovieSearch