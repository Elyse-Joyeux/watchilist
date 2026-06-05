import express from 'express'
import { getMovies, getMovieById, createMovie, updateMovie, deleteMovie } from '../controllers/movieController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getMovies)
router.get('/:id', getMovieById)
router.post('/', authMiddleware, createMovie)
router.put('/:id', authMiddleware, updateMovie)
router.delete('/:id', authMiddleware, deleteMovie)

export default router