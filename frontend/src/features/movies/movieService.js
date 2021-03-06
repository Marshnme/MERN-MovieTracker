import axios from 'axios'
const API_URL = '/api/movies/'


const createMovie = async(movieData,token) =>{
    const config = {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL,movieData,config)
    return response.data
}

const getAllMovies = async(Title,Page) =>{
    
    let options = {
        method: 'GET',
        url: 'https://ott-details.p.rapidapi.com/',
        params: {s: `${Title}`, page: `${Page}`, r: 'json'},
        headers: {
            'x-rapidapi-key': '3e6f97ba46mshd0e970af8b190bcp1daa64jsn2a48b3562207',
            'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
        }
    };
    
        // if(searchedMovie === ''){
        //     return null
        // }else{
    const response = await axios.request(options)
    return response.data.Search
           
}

const getUserMovies = async(token) =>{
    const config = {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL,config)
    return response.data
}

const updateMovie = async(movie,token) => {
    const config = {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + movie._id,movie,config)
    console.log(response.data)
    return response.data
}

const deleteMovie = async(movieId,token) => {
    const config = {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + movieId,config)
    return response.data
}

const movieService = {
    createMovie,getUserMovies,updateMovie,deleteMovie,getAllMovies
}

export default movieService