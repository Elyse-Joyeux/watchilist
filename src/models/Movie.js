import mongoose from 'mongoose'

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  overview: {
    type: String,
  },
  releaseYear: {
    type: Number,
    required: true
  },
  genres: {
    type: [String],
    default: []
  },
  runtime: {
    type: Number,
  },
  posterUrl: {
    type: String,
  },
  createdBy: {
    type: String,
    required: true
  },
}, { timestamps: true })

export default mongoose.model('Movie', movieSchema)