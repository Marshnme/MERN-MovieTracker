const asyncHandler = require('express-async-handler')
const Movie = require(`../models/movieModel`)
const User = require(`../models/userModel`)

//@desc Get Movies
//@route GET /api/movies
//@access Private
const getMovies = asyncHandler(async(req,res) => {
    const movies = await Movie.find({user:req.user.id})
    res.status(200).json(movies)
})

//@desc Add Movie
//@route POST /api/movies
//@access Private
const addMovie = asyncHandler(async(req,res) => {
    if(!req.body.Poster){
        res.status(400)
        throw new Error('please add a text field')
    }
    const movie = await Movie.create({
        Poster:req.body.Poster,
        Title:req.body.Title,
        Type:req.body.Type,
        Year:req.body.Year,
        imdbID:req.body.imdbID,
        user:req.user.id
    })
    res.status(200).json(movie)
})

//@desc Update Movies
//@route UPDATE /api/movies/:id
//@access Private
const updateMovie = asyncHandler(async(req,res) => {
    const movie = await Movie.findById(req.params.id)
    if(!movie){
        res.status(400)
        throw new Error("Movie not found")
    }

   
    if(!req.user){
        res.status(401)
        throw new Error('user not found')
    }

    if(movie.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body,{new:true})
    res.status(200).json(updatedMovie)
})

//@desc Delete Movies
//@route DELETE /api/movies/:id
//@access Private
const deleteMovie = asyncHandler(async(req,res) => {
    const movie = await Movie.findById(req.params.id)
    if(!movie){
        res.status(400)
        throw new Error("Movie not found")
    }

  
    if(!req.user){
        res.status(401)
        throw new Error('user not found')
    }

    if(movie.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
    // works but not whats in video
    // const deletedMovie = await Movie.findByIdAndDelete(req.params.id)

    await movie.remove()
    res.status(200).json({id:req.params.id})
})

module.exports = {
    getMovies,
    addMovie,
    updateMovie,
    deleteMovie,

}