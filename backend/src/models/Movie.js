import mongoose from 'mongoose'

const movieSchema = new mongoose.Schema({
  externalId: {
    type: String,
    trim: true,
    index: true
  },
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

movieSchema.index({ title: 1, releaseYear: 1 })

export default mongoose.model('Movie', movieSchema)
