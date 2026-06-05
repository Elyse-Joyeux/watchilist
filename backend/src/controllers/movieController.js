import Movie from '../models/Movie.js'
import { dbState } from '../config/dbState.js'

// TMDB Fetch Helper
const tmdbFetch = async (endpoint, params = {}) => {
    const url = new URL(`https://api.themoviedb.org/3${endpoint}`)
    
    // Add standard parameters
    url.searchParams.append('api_key', process.env.TMDB_API_KEY || '216abd3c565e137f13a1cc2ada136113')
    Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null) {
            url.searchParams.append(key, val)
        }
    })

    const headers = {
        'Accept': 'application/json'
    }
    if (process.env.TMDB_READ_TOKEN) {
        headers['Authorization'] = `Bearer ${process.env.TMDB_READ_TOKEN}`
    }

    const res = await fetch(url.toString(), { headers })
    if (!res.ok) {
        throw new Error(`TMDB error: ${res.statusText}`)
    }
    return res.json()
}

// Map TMDB object to local application Movie schema
const mapTmdbMovie = (tmdbMovie) => {
    const genreMap = {
        28: "Action",
        12: "Adventure",
        16: "Animation",
        35: "Comedy",
        80: "Crime",
        99: "Documentary",
        18: "Drama",
        10751: "Family",
        14: "Fantasy",
        36: "History",
        27: "Horror",
        10402: "Music",
        9648: "Mystery",
        10749: "Romance",
        878: "Sci-Fi",
        10770: "TV Movie",
        53: "Thriller",
        10752: "War",
        37: "Western"
    }

    const genres = (tmdbMovie.genre_ids || [])
        .map(id => genreMap[id])
        .filter(Boolean)

    const releaseYear = tmdbMovie.release_date
        ? new Date(tmdbMovie.release_date).getFullYear()
        : 2026

    const posterUrl = tmdbMovie.poster_path
        ? `https://image.tmdb.org/t/p/w500${tmdbMovie.poster_path}`
        : 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&q=80&w=500'

    return {
        id: `tmdb_${tmdbMovie.id}`,
        externalId: `tmdb_${tmdbMovie.id}`,
        title: tmdbMovie.title,
        overview: tmdbMovie.overview,
        releaseYear,
        genres: genres.length > 0 ? genres : ["Drama"],
        runtime: null,
        posterUrl
    }
}

export const getMovies = async (req, res) => {
    try {
        const { search, genre } = req.query
        let movies = []

        if (search) {
            const data = await tmdbFetch('/search/movie', { query: search })
            movies = (data.results || []).map(mapTmdbMovie)
        } else {
            const data = await tmdbFetch('/movie/popular')
            movies = (data.results || []).map(mapTmdbMovie)
        }

        // Fetch local custom movies depending on database mode
        let localMoviesList = []
        if (dbState.isMock) {
            localMoviesList = dbState.movies
        } else {
            localMoviesList = await Movie.find()
        }

        const formattedLocalMovies = localMoviesList.map(m => ({
            id: m.id || m._id?.toString(),
            externalId: m.externalId,
            title: m.title,
            overview: m.overview,
            releaseYear: m.releaseYear,
            genres: m.genres,
            runtime: m.runtime,
            posterUrl: m.posterUrl
        }))

        // Combine local and remote movies
        let combined = [...formattedLocalMovies, ...movies]

        // Ensure unique IDs and unique titles for cleaner experience
        const seen = new Set()
        combined = combined.filter(m => {
            const duplicate = seen.has(m.title.toLowerCase())
            seen.add(m.title.toLowerCase())
            return !duplicate
        })

        // Apply genre filter if queried
        if (genre) {
            combined = combined.filter(m => 
                m.genres.some(g => g.toLowerCase() === genre.toLowerCase())
            )
        }

        res.status(200).json(combined)
    } catch (error) {
        console.error('getMovies TMDB failed, falling back to local database:', error)
        try {
            let localMoviesList = []
            if (dbState.isMock) {
                localMoviesList = dbState.movies
            } else {
                localMoviesList = await Movie.find()
            }

            let combined = localMoviesList.map(m => ({
                id: m.id || m._id?.toString(),
                externalId: m.externalId,
                title: m.title,
                overview: m.overview,
                releaseYear: m.releaseYear,
                genres: m.genres,
                runtime: m.runtime,
                posterUrl: m.posterUrl
            }))
            if (genre) {
                combined = combined.filter(m => 
                    m.genres.some(g => g.toLowerCase() === genre.toLowerCase())
                )
            }
            res.status(200).json(combined)
        } catch (dbError) {
            res.status(500).json({ error: dbError.message })
        }
    }
}

export const getMovieById = async (req, res) => {
    try {
        if (dbState.isMock) {
            const movie = dbState.movies.find(m => m.id === req.params.id)
            if (!movie) return res.status(404).json({ error: 'Movie not found' })
            return res.status(200).json(movie)
        }

        const movie = await Movie.findById(req.params.id)
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' })
        }
        res.status(200).json({
            id: movie.id,
            externalId: movie.externalId,
            title: movie.title,
            overview: movie.overview,
            releaseYear: movie.releaseYear,
            genres: movie.genres,
            runtime: movie.runtime,
            posterUrl: movie.posterUrl
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const createMovie = async (req, res) => {
    try {
        const { title, overview, releaseYear, genres, runtime, posterUrl, externalId } = req.body

        if (dbState.isMock) {
            const movie = {
                id: `m_${Date.now()}`,
                externalId,
                title,
                overview,
                releaseYear,
                genres: genres || [],
                runtime: runtime || null,
                posterUrl,
                createdBy: req.user.id
            }
            dbState.movies.push(movie)
            return res.status(201).json(movie)
        }

        const movie = await Movie.create({
            title,
            externalId,
            overview,
            releaseYear,
            genres,
            runtime,
            posterUrl,
            createdBy: req.user.id
        })
        res.status(201).json({
            id: movie.id,
            externalId: movie.externalId,
            title: movie.title,
            overview: movie.overview,
            releaseYear: movie.releaseYear,
            genres: movie.genres,
            runtime: movie.runtime,
            posterUrl: movie.posterUrl
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const updateMovie = async (req, res) => {
    try {
        if (dbState.isMock) {
            const idx = dbState.movies.findIndex(m => m.id === req.params.id)
            if (idx === -1) return res.status(404).json({ error: 'Movie not found' })
            if (dbState.movies[idx].createdBy !== req.user.id.toString()) {
                return res.status(403).json({ error: 'You are not allowed to update this movie' })
            }
            dbState.movies[idx] = { ...dbState.movies[idx], ...req.body }
            return res.status(200).json(dbState.movies[idx])
        }

        const movie = await Movie.findById(req.params.id)
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' })
        }
        if (movie.createdBy !== req.user.id.toString()) {
            return res.status(403).json({ error: 'You are not allowed to update this movie' })
        }
        const updated = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json({
            id: updated.id,
            externalId: updated.externalId,
            title: updated.title,
            overview: updated.overview,
            releaseYear: updated.releaseYear,
            genres: updated.genres,
            runtime: updated.runtime,
            posterUrl: updated.posterUrl
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const deleteMovie = async (req, res) => {
    try {
        if (dbState.isMock) {
            const idx = dbState.movies.findIndex(m => m.id === req.params.id)
            if (idx === -1) return res.status(404).json({ error: 'Movie not found' })
            if (dbState.movies[idx].createdBy !== req.user.id.toString()) {
                return res.status(403).json({ error: 'You are not allowed to delete this movie' })
            }
            dbState.movies.splice(idx, 1)
            return res.status(200).json({ message: 'Movie deleted successfully' })
        }

        const movie = await Movie.findById(req.params.id)
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' })
        }
        if (movie.createdBy !== req.user.id.toString()) {
            return res.status(403).json({ error: 'You are not allowed to delete this movie' })
        }
        await Movie.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: 'Movie deleted successfully' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
