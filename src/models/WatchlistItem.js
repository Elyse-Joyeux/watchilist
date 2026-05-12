import mongoose from 'mongoose'

const WatchlistSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    movieId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum : ["PLANNED", "WATCHING", "COMPLETED", "DROPPED"],
        default: "PLANNED",
        required: true
    },
    rating: {
        type: Number,

    },
    notes: {
        type: String,

    }

}, {timestamps: true})


export default mongoose.model("WatchlistItem", WatchlistSchema)