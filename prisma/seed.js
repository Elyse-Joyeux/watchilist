import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import Movie from '../src/models/Movie.js'

const creatorId = '6a197ea6ae02c484c9f38d85'

const movies = [
  {
    title: 'The Matrix',
    overview: 'A computer hacker learns about the true nature of reality.',
    releaseYear: 1999,
    genres: ['Action', 'Sci-Fi'],
    runtime: 136,
    posterUrl: 'https://example.com/matrix.jpg',
    createdBy: creatorId
  },
  {
    title: 'Inception',
    overview: 'A thief who steals corporate secrets through dream-sharing technology.',
    releaseYear: 2010,
    genres: ['Action', 'Sci-Fi', 'Thriller'],
    runtime: 148,
    posterUrl: 'https://example.com/inception.jpg',
    createdBy: creatorId
  },
  {
    title: 'The Dark Knight',
    overview: "Batman faces the Joker in a battle for Gotham's soul.",
    releaseYear: 2008,
    genres: ['Action', 'Crime', 'Drama'],
    runtime: 152,
    posterUrl: 'https://example.com/darkknight.jpg',
    createdBy: creatorId
  },
  {
    title: 'Pulp Fiction',
    overview: 'The lives of two mob hitmen, a boxer, and others intertwine.',
    releaseYear: 1994,
    genres: ['Crime', 'Drama'],
    runtime: 154,
    posterUrl: 'https://example.com/pulpfiction.jpg',
    createdBy: creatorId
  },
  {
    title: 'Interstellar',
    overview: 'A team of explorers travel through a wormhole in space.',
    releaseYear: 2014,
    genres: ['Adventure', 'Drama', 'Sci-Fi'],
    runtime: 169,
    posterUrl: 'https://example.com/interstellar.jpg',
    createdBy: creatorId
  },
  {
    title: 'The Shawshank Redemption',
    overview: 'Two imprisoned men bond over a number of years.',
    releaseYear: 1994,
    genres: ['Drama'],
    runtime: 142,
    posterUrl: 'https://example.com/shawshank.jpg',
    createdBy: creatorId
  },
  {
    title: 'Fight Club',
    overview: 'An insomniac office worker and a devil-may-care soapmaker form an underground fight club.',
    releaseYear: 1999,
    genres: ['Drama'],
    runtime: 139,
    posterUrl: 'https://example.com/fightclub.jpg',
    createdBy: creatorId
  },
  {
    title: 'Forrest Gump',
    overview: 'The presidencies of Kennedy and Johnson unfold through the perspective of an Alabama man.',
    releaseYear: 1994,
    genres: ['Drama', 'Romance'],
    runtime: 142,
    posterUrl: 'https://example.com/forrestgump.jpg',
    createdBy: creatorId
  },
  {
    title: 'The Godfather',
    overview: 'The aging patriarch of an organized crime dynasty transfers control to his son.',
    releaseYear: 1972,
    genres: ['Crime', 'Drama'],
    runtime: 175,
    posterUrl: 'https://example.com/godfather.jpg',
    createdBy: creatorId
  },
  {
    title: 'Goodfellas',
    overview: 'The story of Henry Hill and his life in the mob.',
    releaseYear: 1990,
    genres: ['Biography', 'Crime', 'Drama'],
    runtime: 146,
    posterUrl: 'https://example.com/goodfellas.jpg',
    createdBy: creatorId
  },
]

const main = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Seeding movies...')

    await Movie.deleteMany({})

    for (const movie of movies) {
      await Movie.create({
        ...movie,
        createdBy: creatorId
      })
      console.log(`Created movie: ${movie.title}`)
    }

    console.log('Movie seeding completed successfully.')
  } catch (error) {
    console.error('Seeding failed:', error)
    process.exit(1)
  } finally {
    await mongoose.disconnect()
  }
}

main()
