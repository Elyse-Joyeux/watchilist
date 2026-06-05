import Movie from '../models/Movie.js'
import WatchlistItem from '../models/WatchlistItem.js'
import mongoose from 'mongoose'
import { dbState } from '../config/dbState.js'

export const getWatchlist = async (req, res) => {
    try {
        const userId = req.user.id

        if (dbState.isMock) {
            const items = dbState.watchlistItems.filter(item => item.userId === userId)
            const formattedItems = items.map(item => {
                const movie = dbState.movies.find(m => m.id === item.movieId)
                return {
                    id: item.id,
                    movie: movie ? {
                        id: movie.id,
                        externalId: movie.externalId,
                        title: movie.title,
                        overview: movie.overview,
                        releaseYear: movie.releaseYear,
                        genres: movie.genres,
                        runtime: movie.runtime,
                        posterUrl: movie.posterUrl
                    } : null,
                    status: item.status,
                    rating: item.rating,
                    notes: item.notes,
                    createdAt: item.createdAt
                }
            }).filter(item => item.movie !== null)

            return res.status(200).json(formattedItems)
        }

        const items = await WatchlistItem.find({ userId }).populate('movieId')

        const formattedItems = items
            .filter(item => item.movieId)
            .map(item => ({
                id: item.id,
                movie: {
                    id: item.movieId.id,
                    externalId: item.movieId.externalId,
                    title: item.movieId.title,
                    overview: item.movieId.overview,
                    releaseYear: item.movieId.releaseYear,
                    genres: item.movieId.genres,
                    runtime: item.movieId.runtime,
                    posterUrl: item.movieId.posterUrl
                },
                status: item.status,
                rating: item.rating,
                notes: item.notes,
                createdAt: item.createdAt
            }))

        return res.status(200).json(formattedItems)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

export const addToWatchlist = async (req, res) => {
    try {
        const { movieId, status, rating, notes, movie: movieData } = req.body
        const userId = req.user.id

        if (!movieId) {
            return res.status(400).json({ error: 'movieId is required' })
        }

        if (dbState.isMock) {
            let dbMovie = dbState.movies.find(m => m.id === movieId || m.externalId === movieId)
            if (!dbMovie && movieData) {
                dbMovie = dbState.movies.find(m => 
                    m.title.toLowerCase() === movieData.title.toLowerCase() && 
                    m.releaseYear === movieData.releaseYear
                )
            }

            if (!dbMovie) {
                if (!movieData) {
                    return res.status(400).json({ error: 'Movie details are required for new/TMDB movies' })
                }
                dbMovie = {
                    id: movieId.startsWith('tmdb_') ? movieId : `m_${Date.now()}`,
                    externalId: movieData.id || movieId,
                    title: movieData.title,
                    overview: movieData.overview,
                    releaseYear: movieData.releaseYear,
                    genres: movieData.genres || [],
                    runtime: movieData.runtime || null,
                    posterUrl: movieData.posterUrl || null,
                    createdBy: userId
                }
                dbState.movies.push(dbMovie)
            }

            const existingInWatchlist = dbState.watchlistItems.find(
                item => item.userId === userId && item.movieId === dbMovie.id
            )
            if (existingInWatchlist) {
                return res.status(400).json({ error: 'Movie already exists in the watchlist' })
            }

            const watchlistItem = {
                id: `w_${Date.now()}`,
                userId,
                movieId: dbMovie.id,
                status: status || 'PLANNED',
                rating,
                notes,
                createdAt: new Date().toISOString()
            }
            dbState.watchlistItems.push(watchlistItem)

            return res.status(201).json({
                status: 'Success',
                data: {
                    watchlistItem: {
                        id: watchlistItem.id,
                        movie: {
                            id: dbMovie.id,
                            externalId: dbMovie.externalId,
                            title: dbMovie.title,
                            overview: dbMovie.overview,
                            releaseYear: dbMovie.releaseYear,
                            genres: dbMovie.genres,
                            runtime: dbMovie.runtime,
                            posterUrl: dbMovie.posterUrl
                        },
                        status: watchlistItem.status,
                        rating: watchlistItem.rating,
                        notes: watchlistItem.notes,
                        createdAt: watchlistItem.createdAt
                    }
                }
            })
        }

        let dbMovie = null

        // 1. Try to find the movie locally by ObjectId if it looks like one
        const isObjectId = mongoose.Types.ObjectId.isValid(movieId)
        if (isObjectId) {
            dbMovie = await Movie.findById(movieId)
        }

        // 2. If not found, check if a movie with this title / releaseYear / poster exists
        if (!dbMovie && movieData) {
            dbMovie = await Movie.findOne({
                $or: [
                    { externalId: movieData.id || movieId },
                    { title: movieData.title, releaseYear: movieData.releaseYear },
                    { posterUrl: movieData.posterUrl }
                ].filter(cond => cond.externalId || cond.title || cond.posterUrl)
            })
        }

        // 3. If movie is not in our database yet, create it!
        if (!dbMovie) {
            if (!movieData) {
                return res.status(400).json({ error: 'Movie details are required for new/TMDB movies' })
            }
            dbMovie = await Movie.create({
                title: movieData.title,
                externalId: movieData.id || movieId,
                overview: movieData.overview,
                releaseYear: movieData.releaseYear,
                genres: movieData.genres || [],
                runtime: movieData.runtime || null,
                posterUrl: movieData.posterUrl || null,
                createdBy: userId
            })
        }

        // 4. Check if already in user's watchlist
        const existingInWatchlist = await WatchlistItem.findOne({ userId, movieId: dbMovie._id })
        if (existingInWatchlist) {
            return res.status(400).json({ error: 'Movie already exists in the watchlist' })
        }

        // 5. Add to watchlist
        const watchlistItem = await WatchlistItem.create({
            userId,
            movieId: dbMovie._id,
            status: status || 'PLANNED',
            rating,
            notes,
        })

        // Return populated item format matching the frontend
        return res.status(201).json({
            status: 'Success',
            data: {
                watchlistItem: {
                    id: watchlistItem.id,
                    movie: {
                        id: dbMovie.id,
                        externalId: dbMovie.externalId,
                        title: dbMovie.title,
                        overview: dbMovie.overview,
                        releaseYear: dbMovie.releaseYear,
                        genres: dbMovie.genres,
                        runtime: dbMovie.runtime,
                        posterUrl: dbMovie.posterUrl
                    },
                    status: watchlistItem.status,
                    rating: watchlistItem.rating,
                    notes: watchlistItem.notes,
                    createdAt: watchlistItem.createdAt
                }
            },
        })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

export const updateWatchlistItem = async(req, res) => {
    try {
        const { status, rating, notes } = req.body
        const userId = req.user.id

        if (dbState.isMock) {
            const idx = dbState.watchlistItems.findIndex(i => i.id === req.params.id)
            if (idx === -1) {
                return res.status(404).json({ error: "Watchlist item not found" })
            }

            const item = dbState.watchlistItems[idx]
            if (item.userId !== userId) {
                return res.status(403).json({ error: "You are not allowed to update this watchlist item" })
            }

            if (status !== undefined) item.status = status.toUpperCase()
            if (rating !== undefined) item.rating = rating
            if (notes !== undefined) item.notes = notes

            const movie = dbState.movies.find(m => m.id === item.movieId)
            return res.status(200).json({
                status: "Success",
                data: {
                    watchlistItem: {
                        id: item.id,
                        movie: movie ? {
                        id: movie.id,
                        externalId: movie.externalId,
                        title: movie.title,
                            overview: movie.overview,
                            releaseYear: movie.releaseYear,
                            genres: movie.genres,
                            runtime: movie.runtime,
                            posterUrl: movie.posterUrl
                        } : null,
                        status: item.status,
                        rating: item.rating,
                        notes: item.notes,
                        createdAt: item.createdAt
                    }
                }
            })
        }

        // find watchlist item and verify ownership
        const watchlistItem = await WatchlistItem.findById(req.params.id)
        if (!watchlistItem) {
            return res.status(404).json({ error: "Watchlist item not found" })
        }

        // ensure only owner can update
        if (watchlistItem.userId !== req.user.id.toString()) {
            return res.status(403).json({ error: "You are not allowed to update this watchlist item" })
        }

        // build update data
        const updateData = {}
        if (status !== undefined) updateData.status = status.toUpperCase()
        if (rating !== undefined) updateData.rating = rating
        if (notes !== undefined) updateData.notes = notes

        // update watchlist item and populate movie
        const updatedItem = await WatchlistItem.findByIdAndUpdate(
            req.params.id, 
            updateData, 
            { new: true }
        ).populate('movieId')

        res.status(200).json({ 
            status: "Success", 
            data: { 
                watchlistItem: {
                    id: updatedItem.id,
                    movie: {
                        id: updatedItem.movieId.id,
                        externalId: updatedItem.movieId.externalId,
                        title: updatedItem.movieId.title,
                        overview: updatedItem.movieId.overview,
                        releaseYear: updatedItem.movieId.releaseYear,
                        genres: updatedItem.movieId.genres,
                        runtime: updatedItem.movieId.runtime,
                        posterUrl: updatedItem.movieId.posterUrl
                    },
                    status: updatedItem.status,
                    rating: updatedItem.rating,
                    notes: updatedItem.notes,
                    createdAt: updatedItem.createdAt
                } 
            } 
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const removeFromWatchlist = async(req, res) => {
    try {
        const userId = req.user.id

        if (dbState.isMock) {
            const idx = dbState.watchlistItems.findIndex(i => i.id === req.params.id)
            if (idx === -1) {
                return res.status(404).json({ error: "Watchlist item not found" })
            }

            const item = dbState.watchlistItems[idx]
            if (item.userId !== userId) {
                return res.status(403).json({ error: "You are not allowed to delete this watchlist item" })
            }

            dbState.watchlistItems.splice(idx, 1)
            return res.status(200).json({ status: "Success", message: "Watchlist item deleted" })
        }

        // find watchlist item and verify ownership
        const watchlistItem = await WatchlistItem.findById(req.params.id)
        if (!watchlistItem) {
            return res.status(404).json({ error: "Watchlist item not found" })
        }

        // ensure only owner can delete
        if (watchlistItem.userId !== req.user.id.toString()) {
            return res.status(403).json({ error: "You are not allowed to delete this watchlist item" })
        }

        await WatchlistItem.findByIdAndDelete(req.params.id)

        res.status(200).json({ status: "Success", message: "Watchlist item deleted" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
