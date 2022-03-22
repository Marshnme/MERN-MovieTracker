import {useSelector} from 'react-redux'
import {useLocation} from 'react-router-dom'
import './styles/movieDetailStyles.scss'



function MovieItemDetail(){
    
    let location = useLocation();
    const {Poster,comment,imdbID} = location.state;
    console.log(location.state)
    let movieLink = `https://www.imdb.com/title/${imdbID}`; 
    return(
        <div className="movieDetail-parent">
            <div>
                <img src={Poster}></img>
                <span> <a href = {movieLink}>IMDB</a></span>
            </div>
            <div>
                <p>Personal Comments</p>
                <hr></hr>
                <p>{comment}</p>
            </div>
            
        </div>
    )
}

export default MovieItemDetail