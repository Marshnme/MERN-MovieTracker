//@desc Get Movies
//@route GET /api/movies
//@access Private
const getMovies = (req,res) => {
    res.status(200).json({message:`get movies`})
}

//@desc Add Movies
//@route POST /api/movies
//@access Private
const addMovies = (req,res) => {
    res.status(200).json({message:`add movies`})
}

//@desc Update Movies
//@route UPDATE /api/movies/:id
//@access Private
const updateMovies = (req,res) => {
    res.status(200).json({message:`update movies ${req.params.id}`})
}

//@desc Delete Movies
//@route DELETE /api/movies/:id
//@access Private
const deleteMovies = (req,res) => {
    res.status(200).json({message:`delete movies ${req.params.id}`})
}

module.exports = {
    getMovies,
    addMovies,
    updateMovies,
    deleteMovies,

}