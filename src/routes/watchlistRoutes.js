import express from 'express'
import {addToWatchlist} from '../controllers/watchlistController.js'
import {authMiddleware} from '../middleware/authMiddleware.js'
import {removeFromWatchlist, updateWatchlistItem} from '../controllers/watchlistController.js'

const router = express.Router()

router.use(authMiddleware)
router.post('/',addToWatchlist)
router.put('/:id', updateWatchlistItem)
router.delete('/:id', removeFromWatchlist)

export default router