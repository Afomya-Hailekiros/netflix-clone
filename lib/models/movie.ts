// lib/models/movie.ts
import mongoose, { Schema, models, model } from "mongoose"

const movieSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    genre: [String],
    thumbnailUrl: { type: String, required: true },
    videoUrl: { type: String, required: true },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export const Movie = models.Movie || model("Movie", movieSchema)
