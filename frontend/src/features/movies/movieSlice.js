import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import movieService from '../movies/movieService'


const initialState = {
    movies:[],
    allMovies:[],
    isError: false,
    isSuccess : false,
    isLoading: false,
    message:'',
    noMovieReturn:false,
}

export const createMovie = createAsyncThunk('movie/create', async(movieData,thunkAPI) =>{
    try{
        const token = thunkAPI.getState().auth.user.token
        return await movieService.createMovie(movieData,token)
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getAllMovies = createAsyncThunk('movies/getAllMovies',async({Title,Page},thunkAPI) =>{
    try {
        return await movieService.getAllMovies(Title,Page)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getUserMovies = createAsyncThunk('movies/getUserMovies',async(_,thunkAPI) =>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await movieService.getUserMovies(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const updateMovie = createAsyncThunk('movie/update', async(movie,thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await movieService.updateMovie(movie,token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteMovie = createAsyncThunk('movie/delete', async(id,thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await movieService.deleteMovie(id,token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const moviesSlice = createSlice({
    name:'movies',
    initialState,
    reducers:{
        reset:(state) => {
            state.allMovies = []
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
            state.noMovieReturn = false
        }
    },
    extraReducers:(builder) => {
        builder
            .addCase(createMovie.pending,(state) =>{
                state.isLoading = true
            })
            .addCase(createMovie.fulfilled,(state,action) =>{
                state.isLoading = false
                state.isSuccess = true
                state.movies.push(action.payload)
            })
            .addCase(createMovie.rejected,(state,action) =>{
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getUserMovies.pending,(state) =>{
                state.isSuccess = false
                state.isLoading = true
                state.isError = false
            })
            .addCase(getUserMovies.fulfilled,(state,action) =>{
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.movies = action.payload
            })
            .addCase(getUserMovies.rejected,(state,action) =>{
                state.isSuccess = false
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getAllMovies.pending,(state) =>{
                state.isLoading = true
                state.isSuccess = false
                state.isError = false
            })
            .addCase(getAllMovies.fulfilled,(state,action) =>{
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                if(!action.payload){
                    state.noMovieReturn = true
                } else{
                    state.noMovieReturn = false
                    let filterGames = action.payload.filter((movie)=>{
                        if(movie.Type === 'movie'){
                            return movie
                        }
                    })  
                        state.allMovies = filterGames
                }
                
            })
            .addCase(getAllMovies.rejected,(state,action) =>{
                state.isSuccess = false
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateMovie.pending,(state) =>{
                state.isLoading = true
                state.isSuccess=false
                state.isError = false
            })
            .addCase(updateMovie.fulfilled,(state,action) =>{
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                let updatedMovieArray = state.movies.map((movie)=>{
                    if(movie._id === action.payload._id){
                        return action.payload
                    }else{
                        return movie
                    }
                })
                state.movies = updatedMovieArray
            })
            .addCase(updateMovie.rejected,(state,action) =>{
                state.isSuccess = false
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteMovie.pending,(state) =>{
                state.isLoading = true
                state.isSuccess = false
                state.isError = false
            })
            .addCase(deleteMovie.fulfilled,(state,action) =>{
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.movies = state.movies.filter(
                    (movie) => movie._id !== action.payload.id
                )
            })
            .addCase(deleteMovie.rejected,(state,action) =>{
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })
    }
})

export const {reset} = moviesSlice.actions

export default moviesSlice.reducer