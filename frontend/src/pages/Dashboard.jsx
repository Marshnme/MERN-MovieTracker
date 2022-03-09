import React from 'react';
import {useEffect} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import MovieSearch from '../components/MovieSearch';
import Spinner from '../components/Spinner';
import {getUserMovies,reset} from '../features/movies/movieSlice';
import MovieItem from '../components/MovieItem';
function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user} = useSelector((state) => state.auth)
    const {movies,isLoading, isError,message} = useSelector((state) => state.movies)
    useEffect(()=> {
        if(isError){
            console.log(message)
        }
        if(!user){
            navigate('/login')
        }

        dispatch(getUserMovies())

        return () => {
            dispatch(reset())
        } 
    },[user,navigate,dispatch,isError,message])

    if(isLoading === true){
        <Spinner/>
    }
    return(
        <>
            <section>
                <h1>Welcome {user && user.name}</h1>
                <p>Movies Dashboard</p>
            </section>

            {/* <MovieSearch/> */}

            <section className="content">

                {movies.length > 0 ? (
                    <>
                        <Link to='/movieSearch'>
                            <button>Add some movies?</button> 
                        </Link>

                    
                    <div className="goals">
                        {movies.map((movie) => (
                            <MovieItem key={movie._id} movie={movie}/>
                        ))}
                    </div>
                    </>

                ) : (
                    <>
                        <p>You havent added any movies</p>
                        <Link to='/movieSearch'>
                            <button>Add some movies?</button> 
                        </Link>
                        
                    </>
                )}
            </section>
        </>
    )
}

export default Dashboard