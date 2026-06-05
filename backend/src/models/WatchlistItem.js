import mongoose from 'mongoose'

const WatchlistSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
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

WatchlistSchema.index({ userId: 1, movieId: 1 }, { unique: true });

export default mongoose.model("WatchlistItem", WatchlistSchema)