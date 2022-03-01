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

const movieService = {
    createMovie
}

export default movieService