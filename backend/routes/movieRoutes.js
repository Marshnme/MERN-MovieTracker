const express = require('express');
const router = express.Router();
const {getMovies,addMovie,updateMovie,deleteMovie} = require('../controllers/movieController')

router.route('/').get(getMovies).post(addMovie)

router.route('/:id').put(updateMovie).delete(deleteMovie)


module.exports = router;