import express from 'express'
import {config} from 'dotenv'

//import routes
import movieRoutes from './routes/movieRoutes.js'

const app = express()

//API Routes
app.use("/movies", movieRoutes)

const PORT = 5001;

const server = app.listen(PORT, ()=>{
    console.log(`The server is running on port ${PORT}`)
})

//Authentication
//Movie - Getting all movies
// User - Profile
//Watchlist -