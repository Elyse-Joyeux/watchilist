import Movie from '../models/Movie.js'
import WatchlistItem from '../models/WatchlistItem.js'

export const addToWatchlist = async (req, res) => {
    try {
        const { movieId, userId, status, rating, notes } = req.body

        if (!movieId || !userId) {
            return res.status(400).json({ error: 'movieId and userId are required' })
        }

        const movie = await Movie.findById(movieId)
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' })
        }

        const existingInWatchlist = await WatchlistItem.findOne({ userId, movieId })
        if (existingInWatchlist) {
            return res.status(400).json({ error: 'Movie already exists in the watchlist' })
        }

        const watchlistItem = await WatchlistItem.create({
            userId,
            movieId,
            status: status || 'PLANNED',
            rating,
            notes,
        })

        return res.status(201).json({
            status: 'Success',
            data: { watchlistItem },
        })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}