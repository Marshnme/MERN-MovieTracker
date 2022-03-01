import {useState,useEffect} from "react"
import {useDispatch} from 'react-redux'
import {createMovie} from '../features/movies/movieSlice'
function MovieSearch() {

    const [text,setText] = useState('')

    const dispatch = useDispatch();

    
    const onSubmit = (e) =>{
        e.preventDefault()

        dispatch(createMovie({text}))
        setText('')
    }

    return(
        <section className="form">
            <form onSubmit={onSubmit}>

                <div className="form-group">
                    <label htmlFor="text">Movie</label>
                    <input type="text" name="text" id="text" value={text} onChange={(e) => setText(e.target.value)}></input>
                </div>

                <div className="form-group">
                    <button className="btn btn-block" type="submit">add movie</button>
                </div>
            </form>
        </section>
    )
}

export default MovieSearch