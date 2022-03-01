import {useState,useEffect} from "react"
import {useDispatch} from 'react-redux'
import {createMovie} from '../features/movies/movieSlice'
function MovieSearch() {

    const [movies,setMovies] = useState({
        poster:'',
        title:'',
        type:'',
        year:'',
        imdbID:'',
    })

    const dispatch = useDispatch();

    
    const onSubmit = (e) =>{
        e.preventDefault()
        dispatch(createMovie(movies))
        setMovies({
        poster:'',
        title:'',
        type:'',
        year:'',
        imdbID:''})
    }

    const onChange = (e) => {
        setMovies((prevState) =>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }

    return(
        <section className="form">
            <form onSubmit={onSubmit}>

                <div className="form-group">
                    <label htmlFor="text">Movie Poster</label>
                    <input type="text" name="poster" id="poster" value={movies.poster} onChange={onChange}></input>
                </div>

                <div className="form-group">
                    <label htmlFor="text">Movie Title</label>
                    <input type="text" name="title" id="title" value={movies.title} onChange={onChange}></input>
                </div>

                <div className="form-group">
                    <label htmlFor="text">Movie Type</label>
                    <input type="text" name="type" id="type" value={movies.type} onChange={onChange}></input>
                </div>

                <div className="form-group">
                    <label htmlFor="text">Movie Year</label>
                    <input type="text" name="year" id="year" value={movies.year} onChange={onChange}></input>
                </div>

                <div className="form-group">
                    <label htmlFor="text">Movie imdbID</label>
                    <input type="text" name="imdbID" id="imdbID" value={movies.imdbID} onChange={onChange}></input>
                </div>

                <div className="form-group">
                    <button className="btn btn-block" type="submit">add movie</button>
                </div>
            </form>
        </section>
    )
}

export default MovieSearch