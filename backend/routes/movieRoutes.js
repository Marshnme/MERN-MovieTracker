const express = require('express');
const router = express.Router();
const {getMovies,addMovies,updateMovies,deleteMovies} = require('../controllers/movieController')

router.get('/', getMovies)

router.post('/', addMovies)

router.put('/:id', updateMovies)

router.delete('/:id',deleteMovies)

module.exports = router;