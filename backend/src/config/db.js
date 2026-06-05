import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import { dbState } from './dbState.js';

const connectDB = async () => {
  try {
    // Attempt connecting with a 4-second timeout to avoid long hangs
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 4000
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.warn('MongoDB connection failed. Activating in-memory database fallback:', error.message);
    dbState.isMock = true;

    // Seed local movies into the mock memory database
    dbState.movies = [
      {
        id: '6a197ea6ae02c484c9f38d81',
        externalId: 'seed_matrix',
        title: 'The Matrix',
        overview: 'A computer hacker learns about the true nature of reality.',
        releaseYear: 1999,
        genres: ['Action', 'Sci-Fi'],
        runtime: 136,
        posterUrl: 'https://storage.googleapis.com/bit-generated-images/images/image_a_cinematic_movie_poster__abst_0_1780603477388.png',
        createdBy: '6a197ea6ae02c484c9f38d85'
      },
      {
        id: '6a197ea6ae02c484c9f38d82',
        externalId: 'seed_inception',
        title: 'Inception',
        overview: 'A thief who steals corporate secrets through dream-sharing technology.',
        releaseYear: 2010,
        genres: ['Action', 'Sci-Fi', 'Thriller'],
        runtime: 148,
        posterUrl: 'https://storage.googleapis.com/bit-generated-images/images/image_a_cinematic_movie_poster__surr_0_1780603477236.png',
        createdBy: '6a197ea6ae02c484c9f38d85'
      },
      {
        id: '6a197ea6ae02c484c9f38d83',
        externalId: 'seed_dark_knight',
        title: 'The Dark Knight',
        overview: "Batman faces the Joker in a battle for Gotham's soul.",
        releaseYear: 2008,
        genres: ['Action', 'Crime', 'Drama'],
        runtime: 152,
        posterUrl: 'https://storage.googleapis.com/bit-generated-images/images/image_a_cinematic_movie_poster__dark_0_1780603477080.png',
        createdBy: '6a197ea6ae02c484c9f38d85'
      },
      {
        id: '6a197ea6ae02c484c9f38d84',
        externalId: 'seed_interstellar',
        title: 'Interstellar',
        overview: 'A team of explorers travel through a wormhole in space.',
        releaseYear: 2014,
        genres: ['Adventure', 'Drama', 'Sci-Fi'],
        runtime: 169,
        posterUrl: 'https://storage.googleapis.com/bit-generated-images/images/image_a_cinematic_movie_poster__epic_0_1780603477443.png',
        createdBy: '6a197ea6ae02c484c9f38d85'
      }
    ];
  }
};

const disconnectDB = async () => {
  if (!dbState.isMock) {
    await mongoose.disconnect();
  }
};

export { connectDB, disconnectDB };
