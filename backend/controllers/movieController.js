const asyncHandler = require('express-async-handler')
const Movie = require(`../models/movieModel`)

//@desc Get Movies
//@route GET /api/movies
//@access Private
const getMovies = asyncHandler(async(req,res) => {
    const movies = await Movie.find()
    res.status(200).json(movies)
})

//@desc Add Movie
//@route POST /api/movies
//@access Private
const addMovie = asyncHandler(async(req,res) => {
    if(!req.body.poster){
        res.status(400)
        throw new Error('please add a text field')
    }
    const movie = await Movie.create({
        poster:req.body.poster,
        title:req.body.title,
        type:req.body.type,
        year:req.body.year,
        imdbID:req.body.imdbID,
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
    const updatedGoal = await Movie.findByIdAndUpdate(req.params.id, req.body,{new:true})
    res.status(200).json(updatedGoal)
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