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
        <div><p>hello</p></div>
    )
}

export default MovieSearch