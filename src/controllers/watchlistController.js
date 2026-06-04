import Movie from '../models/Movie.js'
import WatchlistItem from '../models/WatchlistItem.js'
import mongoose from 'mongoose'

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
            userId: req.user.id,
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

export const updateWatchlistItem = async(req,res)=>{
    const {status, rating, notes} = req.body
    
    //find watchlist item and verify ownership
    const watchlistItem = await mongoose.WatchlistItem.findOne({id: req.params.id})
    if(!watchlistItem)
        return res.status(404).json({error: "Watchlist item not found"})

    //ensure only owner can update
    if(watchlistItem.userId !== req.user.id){
        return res.status(403).json({error: "You are not allowed to updated this watchlist item"})
    }

    //build update data
    const updateData = {}
    if(status !==undefined) updateData.status = status.toUpperCase()
    if(rating !==undefined) updateData.rating = rating
    if(notes !==undefined) updateData.notes = notes


    //update watchlist item
    const updateItem = await mongoose.WatchlistItem.update({id:req.params.id, data: updateData})

    res.status(200).json({status: "Sucess", data: {watchlistItem: updateItem}})
}


export const removeFromWatchlist = async(req, res)=>{
    //find watchlist item and verify ownership
    const watchlistItem = await mongoose.WatchlistItem.findOne({id: req.params.id})
    if(!watchlistItem)
        return res.status(404).json({error: "Watchlist item not found"})

    //ensure only owner can delete
    if(watchlistItem.userId !== req.user.id){
        return res.status(403).json({error: "You are not allowed to delete this watchlist item"})
    
    }
    await mongoose.watchlistItem.delete({id: req.params.id})

    res.status(200).json({status: "Success", message: "Watchlist item deleted"})
}