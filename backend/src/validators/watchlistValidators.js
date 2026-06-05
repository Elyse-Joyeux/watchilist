import { z } from "zod";

export const addToWatchlistSchema = z.object({
  movieId: z.string().min(1, "Movie ID is required"),
  status: z
    .enum(["PLANNED", "WATCHING", "COMPLETED", "DROPPED"], {
      error: () => ({
        message: "Status must be one of: PLANNED, WATCHING, COMPLETED, DROPPED",
      }),
    })
    .optional(),
  rating: z.coerce
    .number()
    .int("Rating must be an integer")
    .min(1, "Rating must be between 1 and 10")
    .max(10)
    .optional(),
  notes: z.string().optional(),
  movie: z.object({
    id: z.string().optional(),
    title: z.string().min(1, "Movie title is required"),
    overview: z.string().optional(),
    releaseYear: z.coerce.number().int().optional(),
    genres: z.array(z.string()).optional(),
    runtime: z.coerce.number().int().nullable().optional(),
    posterUrl: z.string().nullable().optional()
  }).optional()
});
