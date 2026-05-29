import express from 'express'
import {config} from 'dotenv'
import {connectDB} from './config/db.js'

//import routes
import movieRoutes from './routes/movieRoutes.js'
import authRoutes from './routes/authRoutes.js'
config()
connectDB()

const app = express() 

//body parsing middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//API Routes
app.use("/movies", movieRoutes)
app.use("/auth", authRoutes)

const PORT = 5001;

const server = app.listen(PORT, ()=>{
    console.log(`The server is running on port ${PORT}`)
})


//handle unhandled promise rejections (ex: db connection errors)
process.on("unhandledRejection", (err)=>{
    console.error("Unhandled Rejection:", err)
    server.close(async ()=>{
        await disconnectDB()
        process.exit(1)
    })
})

//handle uncaught exceptions
process.on("uncaughtException", async(err)=>{
    console.error("Uncaught Exception:", err)
    await disconnectDB()
    process.exit(1)
})

//graceful shutdown
process.on("SIGTERM", async ()=>{
    console.log("SIGTERM received, shutting down gracefully")
})