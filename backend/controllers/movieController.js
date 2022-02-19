const asyncHandler = require('express-async-handler')


//@desc Get Movies
//@route GET /api/movies
//@access Private
const getMovies = asyncHandler(async(req,res) => {
    res.status(200).json({message:`get movies`})
})

//@desc Add Movie
//@route POST /api/movies
//@access Private
const addMovie = asyncHandler(async(req,res) => {
    if(!req.body.test){
        res.status(400)
        throw new Error('please add a text field')
    }
    res.status(200).json({message:`add movie`})
})

//@desc Update Movies
//@route UPDATE /api/movies/:id
//@access Private
const updateMovie = asyncHandler(async(req,res) => {
    res.status(200).json({message:`update movies ${req.params.id}`})
})

//@desc Delete Movies
//@route DELETE /api/movies/:id
//@access Private
const deleteMovie = asyncHandler(async(req,res) => {
    res.status(200).json({message:`delete movies ${req.params.id}`})
})

module.exports = {
    getMovies,
    addMovie,
    updateMovie,
    deleteMovie,

}