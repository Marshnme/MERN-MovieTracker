import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import movieService from '../movies/movieService'


const initialState = {
    movies:[],
    allMovie:[],
    isError: false,
    isSuccess : false,
    isLoading: false,
    message:''
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

export const getAllMovies = createAsyncThunk('movies/getAllMovies',async(searchedMovie,pageNum,thunkAPI) =>{
    try {
        return await movieService.getAllMovies(searchedMovie,pageNum)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getUserMovies = createAsyncThunk('movies/getUserMovies',async(_,thunkAPI) =>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await movieService.getMovies(token)
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
        reset:(state) => initialState
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
                state.isError = true
                state.message = action.payload
            })
            .addCase(getUserMovies.pending,(state) =>{
                state.isLoading = true
            })
            .addCase(getUserMovies.fulfilled,(state,action) =>{
                state.isLoading = false
                state.isSuccess = true
                state.movies = action.payload
            })
            .addCase(getUserMovies.rejected,(state,action) =>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteMovie.pending,(state) =>{
                state.isLoading = true
            })
            .addCase(deleteMovie.fulfilled,(state,action) =>{
                state.isLoading = false
                state.isSuccess = true
                state.movies = state.movies.filter(
                    (movie) => movie._isd !== action.payload.id
                )
            })
            .addCase(deleteMovie.rejected,(state,action) =>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = moviesSlice.actions

export default moviesSlice.reducer