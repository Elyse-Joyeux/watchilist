import express from 'express'
import {addToWatchlist} from '../controllers/watchlistController.js'
import {authMiddleware} from '../middleware/authMiddleware.js'
import {removeFromWatchlist, updateWatchlistItem} from '../controllers/watchlistController.js'
import {validateRequest} from '../middleware/validateRequest.js'
import {addToWatchlistSchema} from '../validators/watchlistValidators.js'

const router = express.Router()

router.use(authMiddleware)
router.post('/',validateRequest(addToWatchlistSchema), addToWatchlist)
router.put('/:id', updateWatchlistItem)
router.delete('/:id', removeFromWatchlist)

export default router