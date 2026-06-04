import {z} from 'zod'

const addToWatchlistSchema = z.object({
    movieId: z.string().uuid(),
    status: z.enum(['PLANNED', 'WATCHING', 'COMPLETED', 'DROPPED'], {
        error: ()=>{}
    })

})
